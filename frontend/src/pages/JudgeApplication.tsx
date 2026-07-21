import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faCheck,
  faCompass,
  faBriefcase,
  faFileSignature,
  faUpload,
  faFilePdf,
  faTimes,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import titletownImg from '../assets/images/background/titletown-district.png';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  organization: string;
  role: string;
  linkedin: string;
  professionalStatus: string;
  yearsExperience: string;
  bio: string;
  judgedBefore: string;
  judgedHackathons: string;
  mentoredBefore: string;
  comfortableArea: string;
  judgingCriteria: string;
  travelingFrom: string;
  travelStipend: string;
  overnightHousing: string;
  resumeUrl: string;
  tShirtSize: string;
  interestedAs: string[];
  conductWaivers: string[];
  mlhWaivers: string[];
}

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  cityState: '',
  organization: '',
  role: '',
  linkedin: '',
  professionalStatus: '',
  yearsExperience: '',
  bio: '',
  judgedBefore: '',
  judgedHackathons: '',
  mentoredBefore: '',
  comfortableArea: '',
  judgingCriteria: '',
  travelingFrom: '',
  travelStipend: '',
  overnightHousing: '',
  resumeUrl: '',
  tShirtSize: '',
  interestedAs: [],
  conductWaivers: [],
  mlhWaivers: [],
};

interface FormErrors {
  [key: string]: string;
}

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScsvvMSYtEBS7JFxA3PJIYa01ltd8bOdL1XoN68yfudf-1bbw/formResponse';

const JudgeApplication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Resume Upload States
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 1, name: 'personal_info.json', icon: faCompass },
    { id: 2, name: 'experience.json', icon: faBriefcase },
    { id: 3, name: 'logistics_rules.json', icon: faFileSignature },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.interestedAs.includes(option);
      const newOptions = alreadySelected
        ? prev.interestedAs.filter((o) => o !== option)
        : [...prev.interestedAs, option];
      return { ...prev, interestedAs: newOptions };
    });
  };

  const handleConductWaiverChange = (option: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.conductWaivers.includes(option);
      const newOptions = alreadySelected
        ? prev.conductWaivers.filter((o) => o !== option)
        : [...prev.conductWaivers, option];
      return { ...prev, conductWaivers: newOptions };
    });
    if (errors.conductWaivers) {
      setErrors((prev) => ({ ...prev, conductWaivers: '' }));
    }
  };

  const handleMlhWaiverChange = (option: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.mlhWaivers.includes(option);
      const newOptions = alreadySelected
        ? prev.mlhWaivers.filter((o) => o !== option)
        : [...prev.mlhWaivers, option];
      return { ...prev, mlhWaivers: newOptions };
    });
    if (errors.mlhWaivers) {
      setErrors((prev) => ({ ...prev, mlhWaivers: '' }));
    }
  };

  // Resume File Upload Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadError(null);

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(fileExtension)) {
      setUploadError('Only PDF or Word document (.doc, .docx) formats are supported.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      const data = new FormData();
      data.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = 'Server upload failed. Make sure your local Wrangler pages dev server is running.';
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error || errMsg;
        } catch {
          if (errText) {
            errMsg = errText.substring(0, 100);
          } else if (response.status === 404) {
            errMsg = 'Upload endpoint not found (404). Run the app with wrangler pages dev to test serverless functions locally.';
          }
        }
        throw new Error(errMsg);
      }

      const result = await response.json();
      setFormData((prev) => ({ ...prev, resumeUrl: result.url || '' }));
      if (errors.resumeUrl) {
        setErrors((prev) => ({ ...prev, resumeUrl: '' }));
      }
    } catch (err) {
      console.error('File upload error:', err);
      const errMsg = err instanceof Error ? err.message : 'An error occurred during upload. Please try again.';
      setUploadError(errMsg);
      setFileName('');
    } finally {
      setUploading(false);
    }
  };

  const removeUploadedFile = () => {
    setFormData((prev) => ({ ...prev, resumeUrl: '' }));
    setFileName('');
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Email Address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
      if (!formData.cityState.trim()) newErrors.cityState = 'City & State is required.';
      if (!formData.organization.trim()) newErrors.organization = 'Organization/Company name is required.';
      if (!formData.role.trim()) newErrors.role = 'Your job title is required.';
      if (formData.linkedin.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.linkedin.trim())) {
        newErrors.linkedin = 'Please enter a valid LinkedIn URL.';
      }
      if (!formData.professionalStatus) newErrors.professionalStatus = 'Professional status is required.';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required.';
    }

    if (currentStep === 2) {
      if (!formData.comfortableArea) newErrors.comfortableArea = 'Please select a preferred judging area.';
      if (!formData.judgingCriteria) newErrors.judgingCriteria = 'Please select a preferred evaluation criteria.';
      if (!formData.judgedBefore) newErrors.judgedBefore = 'This field is required.';
    }

    if (currentStep === 3) {
      if (!formData.travelingFrom.trim()) newErrors.travelingFrom = 'Please specify where you are traveling from.';
      if (!formData.travelStipend) newErrors.travelStipend = 'Please specify if you require a stipend.';
      if (!formData.overnightHousing) newErrors.overnightHousing = 'Please specify if you require housing.';
      if (!formData.resumeUrl) newErrors.resumeUrl = 'Please upload your resume.';
      if (!formData.tShirtSize) newErrors.tShirtSize = 'T-shirt size is required.';

      if (formData.conductWaivers.length < 5) {
        newErrors.conductWaivers = 'You must accept all points of the Code of Conduct.';
      }
      if (formData.mlhWaivers.length < 3) {
        newErrors.mlhWaivers = 'You must accept all policies and the HackGB waiver.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const data = new URLSearchParams();

      // Mapping values exactly to Google Form fields
      data.append('entry.42047240', formData.fullName);
      data.append('entry.1275623371', formData.email);
      data.append('entry.599449600', formData.phone);
      data.append('entry.1623033544', formData.organization);
      data.append('entry.927250422', formData.role);
      data.append('entry.979331292', formData.linkedin);
      data.append('entry.1519460581', formData.cityState);
      data.append('entry.217234878', formData.professionalStatus);
      data.append('entry.1822819348', formData.yearsExperience);
      data.append('entry.810774861', formData.bio);
      data.append('entry.686031745', formData.judgedBefore);
      data.append('entry.783278815', formData.judgedBefore === 'Yes' ? formData.judgedHackathons : '');
      data.append('entry.2105096868', formData.mentoredBefore || 'No');
      data.append('entry.1438611421', formData.comfortableArea);
      data.append('entry.1056917324', formData.judgingCriteria);
      data.append('entry.1432059688', formData.travelingFrom);
      data.append('entry.491550631', formData.travelStipend);
      data.append('entry.354211514', formData.overnightHousing);
      data.append('entry.164788545', formData.tShirtSize);

      // Submitting the public resume URL directly to the upload link (which is now short-answer)
      data.append('entry.1639769262', formData.resumeUrl);

      // Checkboxes submission
      if (formData.interestedAs.length > 0) {
        formData.interestedAs.forEach((item) => {
          data.append('entry.1515193919', item);
        });
      } else {
        data.append('entry.1515193919', '');
      }

      formData.conductWaivers.forEach((item) => {
        data.append('entry.721488148', item);
      });

      formData.mlhWaivers.forEach((item) => {
        data.append('entry.318526633', item);
      });

      data.append('fvv', '1');
      data.append('pageHistory', '0,1,2,3,4,5,6');

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });

      // Send confirmation email (fire-and-forget, don't block success)
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          name: formData.fullName,
          type: 'judge',
        }),
      }).catch((emailErr) => console.warn('Confirmation email failed:', emailErr));

      setIsSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    'Software Engineer',
    'Product Manager',
    'Founder/ Enterperneur',
    'Engineer Manager',
    'Reacearcher',
    'Faculty/ Professor',
    'Graduate Student',
    'Undergraduate Student',
    'Other',
  ];

  const experienceOptions = [
    'Less then 1 year',
    '1-3 year',
    '3-5 year',
    '5-10 year',
    '10+ year',
  ];

  const areaOptions = [
    'AI/ML',
    'Web Development',
    'Backend Development',
    'Frontend Development',
    'Mobile application',
    'Cybersecurity',
    'Cloud Computing',
    'Data Science',
    'UI/UX',
    'Hardware /IOT',
    'Robotics',
    'Game development',
    'Other',
  ];

  const criteriaOptions = [
    'Technical Complexity',
    'Innovation',
    'Creativity',
    'User Experience',
    'Business Potential',
    'Social Impact',
    'Presentation and Pitch',
    'Design',
  ];

  const helpingOptions = [
    'Mentor',
    'Workshop Speaker',
    'Panel Discussion',
    'Networking Session',
    'Future HackGB Events',
  ];

  const conductWaiverItems = [
    'I will evaluate all project fairly and imparially.',
    'I will disclose any conflict of interest.',
    'I will maintain professionalism throughout the event.',
    'I will treat all perticipants respectfully.',
    'I agree to follow HackGB policies and organizer instruction.',
  ];

  const mlhWaiverItems = [
    'I have read and agree to the MLH Code of Conduct.',
    'I agree to the terms and conditions of the MLH Contest Terms and Conditions and the MLH Privacy Policy.',
    'I agree to the HackGB Liability and Media Waiver.',
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-transparent flex flex-col items-center justify-center">
      {/* Background Landmark Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={titletownImg} alt="" className="w-full h-full object-cover opacity-[0.25] parallax-bg" />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      <div className="w-full max-w-4xl z-10">
        {/* Integrated IDE Application Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: spring }}
          className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-2xl overflow-hidden flex flex-col min-h-[520px] relative text-left"
        >
          {/* IDE Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-[10px] font-google-mono text-slate-500 ml-3">Judge Application Wizard</span>
            </div>
            <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-[#E37100] font-bold bg-[#E37100]/10 px-2 py-0.5 rounded border border-[#E37100]/25">
              <Terminal className="w-3.5 h-3.5" />
              <span>judge_signup.json</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col relative overflow-hidden min-h-[500px]">
            {isSuccess ? (
            /* Success Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#61A644]/10 flex items-center justify-center text-[#61A644] text-2xl mb-6">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <h2 className="text-2xl font-google font-bold text-[#0C3C34]">
                Application Submitted!
              </h2>
              <p className="text-slate-500 font-google-text text-sm mt-3 max-w-md">
                Thank you for volunteering to judge at HackGB! Your application has been logged. We will review your background and reach out to you via email soon.
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-8 px-6 py-3 rounded-xl bg-[#0C3C34] hover:bg-[#0C3C34]/95 text-white font-google font-bold text-sm transition-all hover:scale-[1.02]"
              >
                Go to Home
              </button>
            </div>
          ) : (
            <>
              {/* Progress Steps Header — Styled as file explorer tabs */}
              <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none select-none">
                {steps.map((s) => {
                  const isActive = step === s.id;
                  const isCompleted = step > s.id;
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-[11px] font-medium transition-all flex-1 justify-center whitespace-nowrap ${
                        isActive
                          ? 'bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644]'
                          : isCompleted
                          ? 'text-[#61A644] hover:bg-white/30 font-semibold'
                          : 'text-slate-400 hover:bg-white/30'
                      }`}
                    >
                      <FontAwesomeIcon 
                        icon={s.icon} 
                        className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#E37100]' : isCompleted ? 'text-[#61A644]' : 'text-slate-400'}`} 
                      />
                      <span>{s.name}</span>
                      {isCompleted && <span className="text-[10px] text-[#61A644] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8 flex-1 overflow-hidden relative flex flex-col justify-between">
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  <div className="relative flex-1">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: spring }}
                        className="w-full flex flex-col gap-6"
                      >
                        {step === 1 && (
                          /* STEP 1: Personal & Professional */
                          <div className="flex flex-col gap-5 overflow-y-auto max-h-[420px] pr-2">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Personal & Professional Info
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Full Name *</label>
                                <input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  placeholder="Dr. Jane Doe"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.fullName && <span className="text-red-500 text-xs mt-0.5">{errors.fullName}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Email Address *</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="jane.doe@company.com"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-0.5">{errors.email}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Phone Number *</label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="(123) 456-7890"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.phone && <span className="text-red-500 text-xs mt-0.5">{errors.phone}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">City & State *</label>
                                <input
                                  type="text"
                                  name="cityState"
                                  value={formData.cityState}
                                  onChange={handleInputChange}
                                  placeholder="Green Bay, WI"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.cityState ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.cityState && <span className="text-red-500 text-xs mt-0.5">{errors.cityState}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Organization / Company *</label>
                                <input
                                  type="text"
                                  name="organization"
                                  value={formData.organization}
                                  onChange={handleInputChange}
                                  placeholder="Google / UW-Green Bay"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.organization ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.organization && <span className="text-red-500 text-xs mt-0.5">{errors.organization}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Job Title *</label>
                                <input
                                  type="text"
                                  name="role"
                                  value={formData.role}
                                  onChange={handleInputChange}
                                  placeholder="Senior Software Engineer / Professor"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.role ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.role && <span className="text-red-500 text-xs mt-0.5">{errors.role}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-slate-700 text-sm font-google font-bold">LinkedIn Profile URL</label>
                              <input
                                type="text"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleInputChange}
                                placeholder="https://linkedin.com/in/janedoe"
                                className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all border-black/10`}
                              />
                              {errors.linkedin && <span className="text-red-500 text-xs mt-0.5">{errors.linkedin}</span>}
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Current Professional Status *</label>
                                <select
                                  name="professionalStatus"
                                  value={formData.professionalStatus}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.professionalStatus ? 'border-red-500 focus:border-red-500' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select status</option>
                                  {statusOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                                {errors.professionalStatus && <span className="text-red-500 text-xs mt-0.5">{errors.professionalStatus}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Years of Professional Experience *</label>
                                <select
                                  name="yearsExperience"
                                  value={formData.yearsExperience}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.yearsExperience ? 'border-red-500 focus:border-red-500' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select experience range</option>
                                  {experienceOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                                {errors.yearsExperience && <span className="text-red-500 text-xs mt-0.5">{errors.yearsExperience}</span>}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          /* STEP 2: Experience & Details */
                          <div className="flex flex-col gap-5 overflow-y-auto max-h-[420px] pr-2">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Experience & Judging Preferences
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Which area are you comfortable judging? *</label>
                                <select
                                  name="comfortableArea"
                                  value={formData.comfortableArea}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.comfortableArea ? 'border-red-500 focus:border-red-500' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select primary area</option>
                                  {areaOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                                {errors.comfortableArea && <span className="text-red-500 text-xs mt-0.5">{errors.comfortableArea}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Confident Evaluation Criteria *</label>
                                <select
                                  name="judgingCriteria"
                                  value={formData.judgingCriteria}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.judgingCriteria ? 'border-red-500 focus:border-red-500' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select criteria</option>
                                  {criteriaOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                                {errors.judgingCriteria && <span className="text-red-500 text-xs mt-0.5">{errors.judgingCriteria}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Have you judged a hackathon before? *
                                </label>
                                <div className="flex gap-6 mt-2.5">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="judgedBefore"
                                      value="Yes"
                                      checked={formData.judgedBefore === 'Yes'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Yes
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="judgedBefore"
                                      value="No"
                                      checked={formData.judgedBefore === 'No'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    No
                                  </label>
                                </div>
                                {errors.judgedBefore && (
                                  <span className="text-red-500 text-xs mt-1">{errors.judgedBefore}</span>
                                )}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Have you mentored at a hackathon before?
                                </label>
                                <div className="flex gap-6 mt-2.5">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="mentoredBefore"
                                      value="Yes"
                                      checked={formData.mentoredBefore === 'Yes'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Yes
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="mentoredBefore"
                                      value="No"
                                      checked={formData.mentoredBefore === 'No'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>

                            {formData.judgedBefore === 'Yes' && (
                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Which hackathons have you judged?</label>
                                <input
                                  type="text"
                                  name="judgedHackathons"
                                  value={formData.judgedHackathons}
                                  onChange={handleInputChange}
                                  placeholder="e.g. MHacks, HackWisconsin"
                                  className="px-4 py-3 rounded-xl border border-black/10 bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all"
                                />
                              </div>
                            )}

                            <div className="flex flex-col gap-2">
                              <label className="text-slate-700 text-sm font-google font-bold">
                                Would you also be interested in helping as?
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                                {helpingOptions.map((opt) => {
                                  const isChecked = formData.interestedAs.includes(opt);
                                  return (
                                    <label
                                      key={opt}
                                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all cursor-pointer ${isChecked
                                        ? 'bg-[#61A644]/10 border-[#61A644] text-[#0C3C34] font-bold'
                                        : 'bg-white/50 border-black/5 text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleInterestCheckboxChange(opt)}
                                        className="w-4 h-4 accent-[#61A644] cursor-pointer"
                                      />
                                      {opt}
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-slate-700 text-sm font-google font-bold">
                                Brief Professional Bio (Optional)
                              </label>
                              <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Briefly share your background or specialization."
                                className="px-4 py-3 rounded-xl border border-black/10 bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all resize-none"
                              />
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          /* STEP 3: Logistics & Agreements */
                          <div className="flex flex-col gap-5 overflow-y-auto max-h-[420px] pr-2">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Logistics, Resume & Waivers
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Which State are you traveling from? *</label>
                                <input
                                  type="text"
                                  name="travelingFrom"
                                  value={formData.travelingFrom}
                                  onChange={handleInputChange}
                                  placeholder="Wisconsin / Illinois"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.travelingFrom ? 'border-red-500 focus:border-red-500' : 'border-black/10'
                                    }`}
                                />
                                {errors.travelingFrom && <span className="text-red-500 text-xs mt-0.5">{errors.travelingFrom}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">T-Shirt Size *</label>
                                <select
                                  name="tShirtSize"
                                  value={formData.tShirtSize}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.tShirtSize ? 'border-red-500 focus:border-red-500' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select size</option>
                                  <option value="XS">XS</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="XXL">XXL</option>
                                </select>
                                {errors.tShirtSize && <span className="text-red-500 text-xs mt-0.5">{errors.tShirtSize}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Will you require a travel stipend? *</label>
                                <div className="flex gap-6 mt-2.5">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="travelStipend"
                                      value="Yes"
                                      checked={formData.travelStipend === 'Yes'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Yes
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="travelStipend"
                                      value="No"
                                      checked={formData.travelStipend === 'No'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    No
                                  </label>
                                </div>
                                {errors.travelStipend && <span className="text-red-500 text-xs mt-1">{errors.travelStipend}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Do you require overnight housing? *</label>
                                <div className="flex gap-6 mt-2.5">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="overnightHousing"
                                      value="Yes"
                                      checked={formData.overnightHousing === 'Yes'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Yes
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="overnightHousing"
                                      value="No"
                                      checked={formData.overnightHousing === 'No'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    No
                                  </label>
                                </div>
                                {errors.overnightHousing && <span className="text-red-500 text-xs mt-1">{errors.overnightHousing}</span>}
                              </div>
                            </div>

                            {/* Resume Upload widget */}
                            <div className="flex flex-col gap-1.5 mt-2">
                              <label className="text-slate-700 text-sm font-google font-bold">Resume Upload *</label>

                              {formData.resumeUrl ? (
                                /* File Upload Success State */
                                <div className="flex items-center justify-between p-4 rounded-xl border border-[#61A644]/30 bg-[#61A644]/5 transition-all">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#61A644]/15 flex items-center justify-center text-[#61A644]">
                                      <FontAwesomeIcon icon={faFilePdf} className="text-lg" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-google font-bold text-[#0C3C34] truncate max-w-[200px] sm:max-w-xs">
                                        {fileName || 'resume.pdf'}
                                      </span>
                                      <span className="text-[10px] text-slate-500">
                                        Upload complete
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={removeUploadedFile}
                                    className="p-1.5 rounded-lg hover:bg-black/5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </button>
                                </div>
                              ) : uploading ? (
                                /* File Uploading State */
                                <div className="flex flex-col items-center justify-center py-6 rounded-xl border border-[#61A644]/30 bg-[#61A644]/5 gap-2.5">
                                  <FontAwesomeIcon icon={faSpinner} className="text-2xl text-[#61A644] animate-spin" />
                                  <span className="text-xs text-slate-600 font-google font-medium">
                                    Uploading your resume...
                                  </span>
                                </div>
                              ) : (
                                /* File Uploader Input Zone */
                                <div
                                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                  onDragLeave={() => setIsDragging(false)}
                                  onDrop={handleFileDrop}
                                  className={`relative flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-dashed text-center cursor-pointer transition-all ${isDragging
                                    ? 'bg-[#61A644]/10 border-[#61A644] scale-[1.01]'
                                    : errors.resumeUrl
                                      ? 'bg-red-50/30 border-red-300 hover:bg-red-50/50'
                                      : 'bg-white/50 border-black/15 hover:bg-slate-50'
                                    }`}
                                >
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                  />
                                  <FontAwesomeIcon icon={faUpload} className={`text-xl mb-2 ${errors.resumeUrl ? 'text-red-400' : 'text-slate-400'}`} />
                                  <span className="text-xs font-google font-bold text-slate-700">
                                    Drag & drop your resume, or <span className="text-[#61A644] underline">browse</span>
                                  </span>
                                  <span className="text-[10px] text-slate-400 mt-1">
                                    Supports PDF, DOC, DOCX up to 5MB
                                  </span>
                                </div>
                              )}

                              {uploadError && (
                                <span className="text-red-500 text-[11px] font-medium mt-0.5">{uploadError}</span>
                              )}
                              {errors.resumeUrl && !uploadError && (
                                <span className="text-red-500 text-xs mt-0.5">{errors.resumeUrl}</span>
                              )}
                            </div>

                            {/* Code of Conduct Checklist */}
                            <div className="flex flex-col gap-2 mt-4">
                              <label className="text-slate-700 text-sm font-google font-bold">
                                Judge Code of Conduct * (Must accept all points)
                              </label>
                              <div className="flex flex-col gap-2.5 mt-1">
                                {conductWaiverItems.map((item) => {
                                  const isChecked = formData.conductWaivers.includes(item);
                                  return (
                                    <label key={item} className="flex items-start gap-3 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleConductWaiverChange(item)}
                                        className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer"
                                      />
                                      <span className="text-xs text-slate-600 font-google-text leading-normal">
                                        {item}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                              {errors.conductWaivers && <span className="text-red-500 text-xs mt-1">{errors.conductWaivers}</span>}
                            </div>

                            {/* MLH Waivers Checklist */}
                            <div className="flex flex-col gap-2 mt-4">
                              <label className="text-slate-700 text-sm font-google font-bold">
                                General Policies & Waivers * (Must accept all points)
                              </label>
                              <div className="flex flex-col gap-2.5 mt-1">
                                {mlhWaiverItems.map((item) => {
                                  const isChecked = formData.mlhWaivers.includes(item);
                                  return (
                                    <label key={item} className="flex items-start gap-3 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleMlhWaiverChange(item)}
                                        className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer"
                                      />
                                      <span className="text-xs text-slate-600 font-google-text leading-normal">
                                        {item === 'I have read and agree to the MLH Code of Conduct.' ? (
                                          <span>
                                            I have read and agree to the{' '}
                                            <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">
                                              MLH Code of Conduct
                                            </a>
                                            .
                                          </span>
                                        ) : item === 'I agree to the terms and conditions of the MLH Contest Terms and Conditions and the MLH Privacy Policy.' ? (
                                          <span>
                                            I agree to the terms and conditions of the{' '}
                                            <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">
                                              MLH Contest Terms & Conditions
                                            </a>{' '}
                                            and the{' '}
                                            <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">
                                              MLH Privacy Policy
                                            </a>
                                            .
                                          </span>
                                        ) : item === 'I agree to the HackGB Liability and Media Waiver.' ? (
                                          <span>
                                            I agree to the HackGB Liability and Media Waiver, and have read and agree to the{' '}
                                            <a href="/code-of-conduct" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">
                                              HackGB Code of Conduct
                                            </a>{' '}
                                            and{' '}
                                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">
                                              HackGB Privacy Policy
                                            </a>
                                            .
                                          </span>
                                        ) : (
                                          item
                                        )}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                              {errors.mlhWaivers && <span className="text-red-500 text-xs mt-1">{errors.mlhWaivers}</span>}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex justify-between items-center border-t border-black/5 pt-6 mt-8">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 1 || isSubmitting}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-google font-bold text-sm transition-all hover:scale-[1.01] ${step === 1
                        ? 'opacity-0 pointer-events-none'
                        : 'border border-black/10 hover:bg-slate-50 text-slate-600'
                        }`}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Back
                    </button>

                    {step < steps.length ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C3C34] hover:bg-[#0C3C34]/95 text-white font-google font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-[#0C3C34]/10"
                      >
                        Next
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#61A644] hover:bg-[#61A644]/95 text-white font-google font-bold text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-[#61A644]/10"
                      >
                        {isSubmitting ? 'Registering...' : 'Register as Judge'}
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
          </div>

          {/* IDE Bottom Status Bar */}
          <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
            <div className="flex items-center gap-3">
              <span className="font-bold">APPLY: step {step}</span>
              <span className="opacity-80">Writing data...</span>
            </div>
            <div className="flex items-center gap-3">
              <span>JSON</span>
              <span>UTF-8</span>
              <span>Ln {step * 25}, Col 12</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default JudgeApplication;
