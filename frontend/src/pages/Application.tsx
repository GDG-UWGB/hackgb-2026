import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCheck, faCompass, faBuildingColumns, faBriefcase, faMapPin, faFileSignature, faUpload, faFilePdf, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';
import { Terminal } from 'lucide-react';
import { checkDuplicateEmail } from '../utils/checkDuplicateEmail';
import { SchoolCombobox } from '../components/common/SchoolCombobox';
import { COUNTRIES } from '../data/countries';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  race: string;
  tShirtSize: string;
  attendedHackathon: string;
  hackathonAttendanceType: string;
  university: string;
  isCustomUniversity: boolean;
  customUniversity: string;
  status: string;
  country: string;
  major: string;
  graduationDate: string;
  linkedIn: string;
  experienceAreas: string[];
  projectExperience: string;
  resumeLink: string;
  travelState: string;
  stipend: string;
  housing: string;
  mlhConduct: boolean;
  mlhPrivacy: boolean;
  mlhEmailMarketing: boolean;
  hackgbWaiver: boolean;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  race: '',
  tShirtSize: '',
  attendedHackathon: '',
  hackathonAttendanceType: '',
  university: '',
  isCustomUniversity: false,
  customUniversity: '',
  status: '',
  country: 'United States',
  major: '',
  graduationDate: '',
  linkedIn: '',
  experienceAreas: [],
  projectExperience: '',
  resumeLink: '',
  travelState: '',
  stipend: '',
  housing: '',
  mlhConduct: false,
  mlhPrivacy: false,
  mlhEmailMarketing: false,
  hackgbWaiver: false,
};

interface FormErrors {
  [key: string]: string;
}

const HACKER_APPLICATION_DEADLINE = new Date('2026-10-08T04:59:59Z'); // Oct 7, 2026 11:59 PM CST
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf6WdbARvaFg3BJmFi5QmVggW6zr9M_9-sNODzz-RYDmbJLvA/formResponse';

const Application = () => {
  const navigate = useNavigate();
  const isDeadlinePassed = new Date() > HACKER_APPLICATION_DEADLINE;
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

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

      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to upload file.');
      }

      setFormData((prev) => ({ ...prev, resumeLink: result.url || '' }));
      if (errors.resumeLink) {
        setErrors((prev) => ({ ...prev, resumeLink: '' }));
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

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (uploading) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploading) return;
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeUploadedFile = () => {
    setFormData((prev) => ({ ...prev, resumeLink: '' }));
    setFileName('');
    setUploadError(null);
  };

  const steps = [
    { id: 1, name: 'basic_info.json', icon: faCompass },
    { id: 2, name: 'education.json', icon: faBuildingColumns },
    { id: 3, name: 'experience.json', icon: faBriefcase },
    { id: 4, name: 'travel_rules.json', icon: faMapPin },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextState = { ...prev, [name]: value };
      if (name === 'attendedHackathon' && value !== 'Yes') {
        nextState.hackathonAttendanceType = '';
      }
      return nextState;
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.experienceAreas.includes(area);
      const newAreas = alreadySelected
        ? prev.experienceAreas.filter((a) => a !== area)
        : [...prev.experienceAreas, area];
      return { ...prev, experienceAreas: newAreas };
    });
  };

  const handleAgreementChange = (name: 'mlhConduct' | 'mlhPrivacy' | 'mlhEmailMarketing' | 'hackgbWaiver') => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Email Address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
      if (!formData.age.trim()) {
        newErrors.age = 'Age is required.';
      } else if (isNaN(Number(formData.age)) || Number(formData.age) < 18) {
        newErrors.age = 'You must be at least 18 years old to participate.';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required.';
      if (!formData.race) newErrors.race = 'Race selection is required.';
      if (!formData.tShirtSize) newErrors.tShirtSize = 'T-Shirt Size is required.';
      if (!formData.attendedHackathon) {
        newErrors.attendedHackathon = 'Please answer this question.';
      } else if (formData.attendedHackathon === 'Yes' && !formData.hackathonAttendanceType) {
        newErrors.hackathonAttendanceType = 'Please select if you attended in-person or online.';
      }
    }

    if (currentStep === 2) {
      const selectedSchool = formData.isCustomUniversity ? formData.customUniversity.trim() : formData.university.trim();
      if (!selectedSchool) newErrors.university = 'University / School Name is required.';
      if (!formData.status) newErrors.status = 'Please select your current status.';
      if (!formData.country) newErrors.country = 'Please select your country of residence.';
      if (!formData.major.trim()) newErrors.major = 'Major / Field of Study is required.';
      if (!formData.graduationDate.trim()) newErrors.graduationDate = 'Expected Graduation Date is required.';
    }

    if (currentStep === 3) {
      if (!formData.projectExperience.trim()) {
        newErrors.projectExperience = 'Please describe your project experience.';
      } else if (formData.projectExperience.length > 1000) {
        newErrors.projectExperience = 'Your response is too long. Please keep it under 1000 characters.';
      }
      if (!formData.resumeLink.trim()) {
        newErrors.resumeLink = 'Please upload your resume.';
      }
    }

    if (currentStep === 4) {
      if (!formData.travelState.trim()) newErrors.travelState = 'Please enter your starting State or Province.';
      if (!formData.stipend) newErrors.stipend = 'Please select if you require a travel stipend.';
      if (!formData.housing) newErrors.housing = 'Please select if you require accommodations.';
      if (!formData.mlhConduct) newErrors.mlhConduct = 'You must agree to the MLH Code of Conduct.';
      if (!formData.mlhPrivacy) newErrors.mlhPrivacy = 'You must authorize sharing your info with MLH and agree to terms.';
      if (!formData.hackgbWaiver) newErrors.hackgbWaiver = 'You must agree to the HackGB Waiver.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const CHECK_API_URL = import.meta.env.VITE_CHECK_HACKER_EMAIL_API_URL || import.meta.env.VITE_CHECK_EMAIL_API_URL;

  const handleNext = async () => {
    if (validateStep(step)) {
      if (step === 1) {
        const isDuplicate = await checkDuplicateEmail(formData.email, CHECK_API_URL);
        if (isDuplicate) {
          setErrors((prev) => ({
            ...prev,
            email: 'An application with this email address has already been submitted.',
          }));
          return;
        }
      }
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
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const isDuplicate = await checkDuplicateEmail(formData.email, CHECK_API_URL);
      if (isDuplicate) {
        setErrors((prev) => ({
          ...prev,
          email: 'An application with this email address has already been submitted.',
        }));
        setIsSubmitting(false);
        setStep(1);
        return;
      }
      const data = new URLSearchParams();
      data.append('entry.42047240', formData.firstName);
      data.append('entry.591893566', formData.lastName);
      data.append('entry.1275623371', formData.email);
      data.append('entry.599449600', formData.phone);
      data.append('entry.417968283', formData.age);

      data.append('entry.1126864347', formData.gender);
      data.append('entry.422755813', formData.race);
      data.append('entry.192630081', formData.tShirtSize);

      const submittedSchool = formData.isCustomUniversity ? formData.customUniversity : formData.university;
      data.append('entry.217234878', submittedSchool);
      data.append('entry.1822819348', formData.status);
      data.append('entry.63165399', formData.country);
      data.append('entry.810774861', formData.major);

      // Expected Graduation Date
      const [gradYear, gradMonth, gradDay] = formData.graduationDate.split('-');
      data.append('entry.505391914_year', gradYear);
      data.append('entry.505391914_month', gradMonth);
      data.append('entry.505391914_day', gradDay);

      data.append('entry.781413928', formData.linkedIn || '');

      data.append('entry.1768303647', formData.attendedHackathon);
      if (formData.attendedHackathon === 'Yes') {
        data.append('entry.1932841199', formData.hackathonAttendanceType);
      }
      data.append('entry.486006868', formData.projectExperience);
      data.append('entry.1413584166', formData.resumeLink);

      // Checkbox multi-select (multiple appends of same key)
      if (formData.experienceAreas.length > 0) {
        formData.experienceAreas.forEach((area) => {
          data.append('entry.1311902184', area);
        });
      } else {
        data.append('entry.1311902184', '');
      }

      data.append('entry.1450426055', formData.travelState);
      data.append('entry.208089290', formData.stipend);
      data.append('entry.937598727', formData.housing);

      // MLH Policies & Agreements checkboxes (entry.318526633)
      if (formData.mlhConduct) {
        data.append('entry.318526633', 'I have read and agree to the MLH Code of Conduct.');
      }
      if (formData.mlhPrivacy) {
        data.append('entry.318526633', 'I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and administration (including the creation of linked accounts on MLH and DEV (dev.to)) in line with the MLH Privacy Policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy');
      }
      if (formData.mlhEmailMarketing) {
        data.append('entry.318526633', 'I authorize MLH + DEV to send me occasional emails about relevant events, career opportunities, and community announcements.');
      }
      if (formData.hackgbWaiver) {
        data.append('entry.318526633', 'I agree to the HackGB Liability and Media Waiver.');
      }

      // Add Google Form validation parameter
      data.append('fvv', '1');
      data.append('pageHistory', '0');

      // Perform background no-cors POST submission to Google Form.
      // NOTE: Do NOT set Content-Type header in no-cors mode — it causes
      // browsers to corrupt the header, making Google Forms unable to parse
      // the body. Omitting it lets the browser send a correct simple request.
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data.toString(),
      });

      // Send confirmation email (fire-and-forget, don't block success)
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          type: 'hacker',
        }),
      }).catch((emailErr) => console.warn('Confirmation email failed:', emailErr));

      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting form', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Motion variants for sliding steps
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
    }),
  };

  const experiences = [
    'Frontend Web',
    'Backend / APIs',
    'AI / Machine Learning',
    'Data Engineering',
    'Mobile App Development',
    'Hardware / IoT',
    'UI/UX Design',
  ];

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-transparent flex flex-col items-center justify-center">
      {/* Background Landmark Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={stemImg} alt="" className="w-full h-full object-cover opacity-[0.25] parallax-bg" />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      <div className="w-full max-w-3xl z-10">
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
              <span className="text-[10px] font-google-mono text-slate-500 ml-3">Hacker Application Wizard</span>
            </div>
            <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-[#61A644] font-bold bg-[#61A644]/10 px-2 py-0.5 rounded border border-[#61A644]/25">
              <Terminal className="w-3.5 h-3.5" />
              <span>hacker_signup.json</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col relative overflow-hidden min-h-[500px]">
            {isDeadlinePassed ? (
              /* Branded Deadline Passed State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: spring }}
                className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#ff5f56]/10 flex items-center justify-center text-[#ff5f56] text-2xl mb-6 animate-gentle-float">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <h2 className="text-2xl font-google font-bold text-[#0C3C34] mb-3">
                  Applications are Closed
                </h2>
                <p className="text-slate-650 font-google-text text-sm max-w-md mb-8">
                  Hacker applications for HackGB 2026 closed on October 7, 2026 at 11:59 PM CST. We are no longer accepting new submissions.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-[#0C3C34] hover:bg-[#0c3c34]/90 text-white font-google font-bold px-8 py-3 rounded-full transition-all cursor-pointer hover:shadow-lg active:scale-95"
                >
                  Back to Home
                </button>
              </motion.div>
            ) : isSuccess ? (
            /* Branded Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: spring }}
              className="flex-1 flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-20 h-20 bg-[#61A644]/10 text-[#61A644] rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(97,166,68,0.15)] animate-gentle-float">
                <FontAwesomeIcon icon={faCheck} className="text-3xl" />
              </div>
              <h2 className="text-3xl font-google font-bold text-[#0C3C34] mb-3">
                Application Submitted!
              </h2>
              <p className="text-slate-600 font-google-text max-w-md mb-8">
                Thank you for applying to HackGB! Your application has been successfully logged. We will review your qualifications and reach out to you via email soon.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="bg-[#0C3C34] hover:bg-[#0c3c34]/90 text-white font-google font-bold px-8 py-3 rounded-full transition-all cursor-pointer hover:shadow-lg active:scale-95"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
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
                        className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#61A644]' : isCompleted ? 'text-[#61A644]' : 'text-slate-400'}`} 
                      />
                      <span>{s.name}</span>
                      {isCompleted && <span className="text-[10px] text-[#61A644] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>

              {/* Form Content Steps */}
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
                          /* STEP 1: Basic Info */
                          <div className="flex flex-col gap-5 overflow-y-auto max-h-[420px] pr-2">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Basic Information
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">First Name *</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  placeholder="John"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.firstName && <span className="text-red-500 text-xs mt-0.5">{errors.firstName}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Last Name *</label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  placeholder="Doe"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.lastName && <span className="text-red-500 text-xs mt-0.5">{errors.lastName}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Email Address *</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="john.doe@edu.com"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                <span className="text-slate-400 text-[10px]">Use your .edu email if you are a student.</span>
                                {errors.email && <span className="text-red-500 text-xs mt-0.5">{errors.email}</span>}
                              </div>

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
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">What's your age? *</label>
                                <select
                                  name="age"
                                  value={formData.age}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select your age</option>
                                  {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                  ))}
                                  <option value="36+">36+</option>
                                </select>
                                <span className="text-slate-400 text-[10px]">Must be at least 18 years old to participate.</span>
                                {errors.age && <span className="text-red-500 text-xs mt-0.5">{errors.age}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Gender *</label>
                                <select
                                  name="gender"
                                  value={formData.gender}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.gender ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select your gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Genderqueer/Non-Binary">Genderqueer/Non-Binary</option>
                                  <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                                {errors.gender && <span className="text-red-500 text-xs mt-0.5">{errors.gender}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Race *</label>
                                <select
                                  name="race"
                                  value={formData.race}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.race ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select your race/ethnicity</option>
                                  <option value="Asian">Asian</option>
                                  <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                                  <option value="Black or African American">Black or African American</option>
                                  <option value="Hispanic or Latino">Hispanic or Latino</option>
                                  <option value="White">White</option>
                                  <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                                {errors.race && <span className="text-red-500 text-xs mt-0.5">{errors.race}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">T-Shirt Size *</label>
                                <select
                                  name="tShirtSize"
                                  value={formData.tShirtSize}
                                  onChange={handleInputChange}
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.tShirtSize ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                >
                                  <option value="" disabled>Select your size</option>
                                  <option value="XS">XS</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="XXL">XXL</option>
                                </select>
                                {errors.tShirtSize && <span className="text-red-500 text-xs mt-0.5">{errors.tShirtSize}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Have you ever attended a hackathon? *
                                </label>
                                <div className="flex gap-4 mt-2">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="attendedHackathon"
                                      value="Yes"
                                      checked={formData.attendedHackathon === 'Yes'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Yes
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="attendedHackathon"
                                      value="No, this will be my first!"
                                      checked={formData.attendedHackathon === 'No, this will be my first!'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    No, this will be my first!
                                  </label>
                                </div>
                                {errors.attendedHackathon && (
                                  <span className="text-red-500 text-xs mt-1">{errors.attendedHackathon}</span>
                                )}
                              </div>
                            </div>

                            {formData.attendedHackathon === 'Yes' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-col gap-1.5 mt-2"
                              >
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  If yes, did you attend it in-person or online? *
                                </label>
                                <div className="flex gap-4 mt-1">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="hackathonAttendanceType"
                                      value="In-person"
                                      checked={formData.hackathonAttendanceType === 'In-person'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    In-person
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="hackathonAttendanceType"
                                      value="Online"
                                      checked={formData.hackathonAttendanceType === 'Online'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Online
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="hackathonAttendanceType"
                                      value="Both"
                                      checked={formData.hackathonAttendanceType === 'Both'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Both
                                  </label>
                                </div>
                                {errors.hackathonAttendanceType && (
                                  <span className="text-red-500 text-xs mt-1">{errors.hackathonAttendanceType}</span>
                                )}
                              </motion.div>
                            )}
                          </div>
                        )}

                        {step === 2 && (
                          /* STEP 2: Education */
                          <div className="flex flex-col gap-5 overflow-y-auto max-h-[420px] pr-2">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Education & Background
                            </h2>

                            <div className="flex flex-col gap-4">
                              <SchoolCombobox
                                value={formData.isCustomUniversity ? formData.customUniversity : formData.university}
                                isCustom={formData.isCustomUniversity}
                                onChange={(school, isCustom) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    university: isCustom ? '' : school,
                                    isCustomUniversity: isCustom,
                                    customUniversity: isCustom ? school : '',
                                  }));
                                  if (errors.university) {
                                    setErrors((prev) => ({ ...prev, university: '' }));
                                  }
                                }}
                                error={errors.university}
                              />

                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 flex flex-col gap-1.5">
                                  <label className="text-slate-700 text-sm font-google font-bold">Current Level of Study *</label>
                                  <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.status ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                      }`}
                                  >
                                    <option value="" disabled>Select your level of study</option>
                                    <option value="Less than Secondary / High School">Less than Secondary / High School</option>
                                    <option value="Secondary / High School">Secondary / High School</option>
                                    <option value="Undergraduate University (2 year - community college or similar)">Undergraduate University (2 year - community college or similar)</option>
                                    <option value="Undergraduate University (3+ year)">Undergraduate University (3+ year)</option>
                                    <option value="Graduate University (Masters, Professional, Doctoral, etc)">Graduate University (Masters, Professional, Doctoral, etc)</option>
                                    <option value="Code School / Bootcamp">Code School / Bootcamp</option>
                                    <option value="Other Vocational / Trade Program or Apprenticeship">Other Vocational / Trade Program or Apprenticeship</option>
                                    <option value="Post Doctorate">Post Doctorate</option>
                                    <option value="I’m not currently a student">I’m not currently a student</option>
                                    <option value="Prefer not to answer">Prefer not to answer</option>
                                  </select>
                                  {errors.status && <span className="text-red-500 text-xs mt-0.5">{errors.status}</span>}
                                </div>

                                <div className="flex-1 flex flex-col gap-1.5">
                                  <label className="text-slate-700 text-sm font-google font-bold">Country of Residence *</label>
                                  <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                      }`}
                                  >
                                    <option value="" disabled>Select your country</option>
                                    <option value="United States">United States</option>
                                    <option value="Canada">Canada</option>
                                    <option disabled>──────────</option>
                                    {COUNTRIES.filter(c => c !== 'United States' && c !== 'Canada').map((country) => (
                                      <option key={country} value={country}>{country}</option>
                                    ))}
                                  </select>
                                  {errors.country && <span className="text-red-500 text-xs mt-0.5">{errors.country}</span>}
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 flex flex-col gap-1.5">
                                  <label className="text-slate-700 text-sm font-google font-bold">
                                    Major / Field of Study *
                                  </label>
                                  <input
                                    type="text"
                                    name="major"
                                    value={formData.major}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Computer Science"
                                    className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.major ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                      }`}
                                  />
                                  {errors.major && <span className="text-red-500 text-xs mt-0.5">{errors.major}</span>}
                                </div>

                                <div className="flex-1 flex flex-col gap-1.5">
                                  <label className="text-slate-700 text-sm font-google font-bold">
                                    Expected Graduation Date *
                                  </label>
                                  <input
                                    type="date"
                                    name="graduationDate"
                                    value={formData.graduationDate}
                                    onChange={handleInputChange}
                                    className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.graduationDate ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                      }`}
                                  />
                                  {errors.graduationDate && <span className="text-red-500 text-xs mt-0.5">{errors.graduationDate}</span>}
                                </div>
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Your LinkedIn URL <span className="text-slate-400 font-normal text-xs">(Optional)</span>
                                </label>
                                <input
                                  type="url"
                                  name="linkedIn"
                                  value={formData.linkedIn}
                                  onChange={handleInputChange}
                                  placeholder="https://linkedin.com/in/yourprofile"
                                  className="px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all border-black/10"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          /* STEP 3: Experience */
                          <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Experience & Qualifications
                            </h2>

                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Which of the following areas do you have experience in? (Select all that apply)
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                                  {experiences.map((exp) => {
                                    const isChecked = formData.experienceAreas.includes(exp);
                                    return (
                                      <label
                                        key={exp}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all cursor-pointer ${isChecked
                                            ? 'bg-[#61A644]/10 border-[#61A644] text-[#0C3C34] font-bold'
                                            : 'bg-white/50 border-black/5 text-slate-700 hover:bg-slate-50'
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => handleCheckboxChange(exp)}
                                          className="w-4 h-4 accent-[#61A644] cursor-pointer"
                                        />
                                        {exp}
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                  <label className="text-slate-700 text-sm font-google font-bold">
                                    Project Experience *
                                  </label>
                                  <span className={`text-[10px] ${formData.projectExperience.length > 1000 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                    {formData.projectExperience.length} / 1000 chars
                                  </span>
                                </div>
                                <textarea
                                  name="projectExperience"
                                  value={formData.projectExperience}
                                  onChange={handleInputChange}
                                  rows={4}
                                  placeholder="Briefly describe a project you have worked on. This helps us understand your technical background. (Max 1000 characters)"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all resize-none ${errors.projectExperience ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.projectExperience && (
                                  <span className="text-red-500 text-xs mt-0.5">{errors.projectExperience}</span>
                                )}
                              </div>

                              <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Resume Upload *
                                </label>

                                {formData.resumeLink ? (
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
                                      className="p-1.5 rounded-lg hover:bg-black/5 text-slate-400 hover:text-red-500 transition-colors"
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
                                        : errors.resumeLink
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
                                    <FontAwesomeIcon icon={faUpload} className={`text-xl mb-2 ${errors.resumeLink ? 'text-red-400' : 'text-slate-400'}`} />
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
                                {errors.resumeLink && !uploadError && (
                                  <span className="text-red-500 text-xs mt-0.5">{errors.resumeLink}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 4 && (
                          /* STEP 4: Travel & Agreements */
                          <div className="flex flex-col gap-4 overflow-y-auto max-h-[420px] pr-2">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Travel & Agreements
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Traveling from (State or Province) *
                                </label>
                                <input
                                  type="text"
                                  name="travelState"
                                  value={formData.travelState}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Wisconsin, Illinois"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${errors.travelState ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                />
                                {errors.travelState && <span className="text-red-500 text-xs mt-0.5">{errors.travelState}</span>}
                              </div>

                              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  Will you require a travel stipend? *
                                </label>
                                <div className="flex gap-4 mt-2">
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="stipend"
                                      value="Yes"
                                      checked={formData.stipend === 'Yes'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    Yes
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="stipend"
                                      value="No"
                                      checked={formData.stipend === 'No'}
                                      onChange={handleInputChange}
                                      className="w-4 h-4 accent-[#61A644]"
                                    />
                                    No
                                  </label>
                                </div>
                                <span className="text-slate-400 text-[10px] leading-tight mt-1">
                                  Travel stipends are limited. Please note: To be eligible to receive a travel stipend, you MUST submit an eligible project before the hackathon deadline.
                                </span>
                                {errors.stipend && <span className="text-red-500 text-xs mt-1">{errors.stipend}</span>}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mb-2">
                              <label className="text-slate-700 text-sm font-google font-bold">
                                Do you require overnight housing/accommodations on campus? *
                              </label>
                              <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="housing"
                                    value="Yes"
                                    checked={formData.housing === 'Yes'}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 accent-[#61A644]"
                                  />
                                  Yes
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="housing"
                                    value="No"
                                    checked={formData.housing === 'No'}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 accent-[#61A644]"
                                  />
                                  No
                                </label>
                              </div>
                              <span className="text-slate-400 text-[10px] leading-tight mt-1">
                                All attendees will have access to a designated space on campus to set up sleeping bags and stay overnight. Limited special accommodations may be available for participants with specific needs.
                              </span>
                              {errors.housing && <span className="text-red-500 text-xs mt-1">{errors.housing}</span>}
                            </div>

                            {/* Agreements Section */}
                            <div className="flex flex-col gap-3 mt-4 border-t border-black/5 pt-4">
                              <h3 className="text-md font-google font-bold text-[#0C3C34]">
                                <FontAwesomeIcon icon={faFileSignature} className="mr-2 text-[#61A644]" />
                                Code of Conduct, Policies & Waivers
                              </h3>

                              {/* MLH Disclaimer */}
                              <div className="bg-[#eff6eb] border border-[#61A644]/30 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed font-google-text">
                                <p className="font-semibold text-[#0C3C34] mb-1">MLH Partnership Notice</p>
                                We are currently in the process of partnering with Major League Hacking (MLH). The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared.
                              </div>

                              <div className="flex flex-col gap-3.5">
                                {/* MLH Conduct */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.mlhConduct}
                                      onChange={() => handleAgreementChange('mlhConduct')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer shrink-0"
                                    />
                                    <span>
                                      I have read and agree to the{' '}
                                      <a
                                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#61A644] hover:underline font-bold"
                                      >
                                        MLH Code of Conduct
                                      </a>
                                      . *
                                    </span>
                                  </label>
                                  {errors.mlhConduct && <span className="text-red-500 text-[10px] pl-7">{errors.mlhConduct}</span>}
                                </div>

                                {/* MLH Sharing & Terms */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.mlhPrivacy}
                                      onChange={() => handleAgreementChange('mlhPrivacy')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer shrink-0"
                                    />
                                    <span>
                                      I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and administration (including the creation of linked accounts on MLH and DEV (<a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">dev.to</a>)) in line with the <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">MLH Privacy Policy</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" className="text-[#61A644] hover:underline font-bold">MLH Privacy Policy</a>. *
                                    </span>
                                  </label>
                                  {errors.mlhPrivacy && <span className="text-red-500 text-[10px] pl-7">{errors.mlhPrivacy}</span>}
                                </div>

                                {/* MLH + DEV Occasional Emails (Optional) */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.mlhEmailMarketing}
                                      onChange={() => handleAgreementChange('mlhEmailMarketing')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer shrink-0"
                                    />
                                    <span>
                                      I authorize MLH + DEV to send me occasional emails about relevant events, career opportunities, and community announcements. <span className="text-slate-400 font-normal">(Optional)</span>
                                    </span>
                                  </label>
                                </div>

                                {/* HackGB Waiver */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.hackgbWaiver}
                                      onChange={() => handleAgreementChange('hackgbWaiver')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer shrink-0"
                                    />
                                    <span>
                                      I agree to the HackGB Liability and Media Waiver, and have read and agree to the{' '}
                                      <a
                                        href="/code-of-conduct"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#61A644] hover:underline font-bold"
                                      >
                                        HackGB Code of Conduct
                                      </a>{' '}
                                      and{' '}
                                      <a
                                        href="/privacy-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#61A644] hover:underline font-bold"
                                      >
                                        HackGB Privacy Policy
                                      </a>
                                      . *
                                    </span>
                                  </label>
                                  {errors.hackgbWaiver && <span className="text-red-500 text-[10px] pl-7">{errors.hackgbWaiver}</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Buttons Navigation */}
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-black/5">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 1 || isSubmitting}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-google font-bold text-sm transition-all ${step === 1
                          ? 'opacity-0 pointer-events-none'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                        }`}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Back
                    </button>

                    {step < steps.length ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-[#0C3C34] hover:bg-[#0c3c34]/95 text-white font-google font-bold px-7 py-3 rounded-full transition-all cursor-pointer hover:shadow-lg active:scale-95"
                      >
                        Next
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-[#61A644] hover:bg-[#61A644]/90 text-white font-google font-bold px-8 py-3 rounded-full transition-all cursor-pointer hover:shadow-lg active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
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

export default Application;
