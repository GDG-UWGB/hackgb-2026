import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, PlusCircle, X } from 'lucide-react';
import rawSchools from '../../data/schools.json';

const PINNED_SCHOOLS = [
  'University of Wisconsin-Green Bay',
  'University of Wisconsin-Madison',
  'University of Wisconsin-Milwaukee',
  'Northeast Wisconsin Technical College',
  'St. Norbert College',
  'Marquette University',
  'Fox Valley Technical College',
  'University of Wisconsin-Oshkosh',
  'University of Wisconsin-Platteville',
  'University of Wisconsin-Whitewater',
];

interface SchoolComboboxProps {
  value: string;
  isCustom: boolean;
  onChange: (school: string, isCustom: boolean) => void;
  error?: string;
}

export const SchoolCombobox = ({ value, isCustom, onChange, error }: SchoolComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(isCustom ? '' : value);
  const [customInput, setCustomInput] = useState(isCustom ? value : '');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCustom) {
      setQuery(value);
    } else {
      setCustomInput(value);
    }
  }, [value, isCustom]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSchools = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return PINNED_SCHOOLS;
    }
    const matches: string[] = [];
    const all = rawSchools as string[];
    for (let i = 0; i < all.length; i++) {
      if (all[i].toLowerCase().includes(trimmed)) {
        matches.push(all[i]);
        if (matches.length >= 40) break;
      }
    }
    return matches;
  }, [query]);

  const handleSelectSchool = (school: string) => {
    onChange(school, false);
    setQuery(school);
    setIsOpen(false);
  };

  const handleSwitchToCustom = () => {
    onChange(customInput || '', true);
    setIsOpen(false);
  };

  const handleSwitchToDropdown = () => {
    onChange('', false);
    setQuery('');
    setCustomInput('');
    setIsOpen(true);
  };

  if (isCustom) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-slate-700 text-sm font-google font-bold">
            University / School Name *
          </label>
          <button
            type="button"
            onClick={handleSwitchToDropdown}
            className="text-xs text-[#61A644] hover:underline font-google font-medium flex items-center gap-1 cursor-pointer"
          >
            ← Back to verified schools list
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            value={customInput}
            onChange={(e) => {
              setCustomInput(e.target.value);
              onChange(e.target.value, true);
            }}
            placeholder="Type your university or school name..."
            className={`w-full px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
              error ? 'border-red-500 focus:border-red-500' : 'border-black/10'
            }`}
          />
        </div>
        <span className="text-slate-400 text-[10px]">
          School not in the MLH database? Enter it here and it will be recorded.
        </span>
        {error && <span className="text-red-500 text-xs mt-0.5">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label className="text-slate-700 text-sm font-google font-bold">
        University / School Name *
      </label>
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              if (value && e.target.value !== value) {
                onChange('', false);
              }
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search verified schools (e.g. UW-Green Bay, Purdue...)"
            className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
              error ? 'border-red-500 focus:border-red-500' : 'border-black/10'
            }`}
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                onChange('', false);
              }}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
          )}
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto rounded-xl bg-white border border-black/10 shadow-2xl py-1 text-sm font-google-text">
            {!query.trim() && (
              <div className="px-3 py-1.5 text-[11px] font-google-mono text-slate-400 uppercase tracking-wider font-semibold border-b border-black/5 bg-slate-50/70">
                Popular & Regional Schools
              </div>
            )}

            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <button
                  key={school}
                  type="button"
                  onClick={() => handleSelectSchool(school)}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-[#61A644]/10 hover:text-[#0C3C34] flex items-center justify-between transition-colors text-slate-700 cursor-pointer"
                >
                  <span className="truncate pr-2">{school}</span>
                  {value === school && <Check className="w-4 h-4 text-[#61A644] shrink-0" />}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-slate-500 text-xs">
                No matching verified schools found for "{query}".
              </div>
            )}

            {/* Option to manually enter school */}
            <div className="border-t border-black/5 p-1.5 bg-slate-50/70 sticky bottom-0">
              <button
                type="button"
                onClick={handleSwitchToCustom}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-[#61A644] hover:bg-[#61A644]/15 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 shrink-0" />
                <span>Can't find your school? Enter it manually</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-xs mt-0.5">{error}</span>}
    </div>
  );
};
