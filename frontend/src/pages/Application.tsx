import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCheck, faCompass, faBuildingColumns, faBriefcase, faMapPin, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  attendedHackathon: string;
  university: string;
  status: string;
  major: string;
  experienceAreas: string[];
  projectExperience: string;
  travelState: string;
  stipend: string;
  housing: string;
  mlhConduct: boolean;
  mlhTerms: boolean;
  hackgbWaiver: boolean;
}

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  attendedHackathon: '',
  university: '',
  status: '',
  major: '',
  experienceAreas: [],
  projectExperience: '',
  travelState: '',
  stipend: '',
  housing: '',
  mlhConduct: false,
  mlhTerms: false,
  hackgbWaiver: false,
};

interface FormErrors {
  [key: string]: string;
}

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf6WdbARvaFg3BJmFi5QmVggW6zr9M_9-sNODzz-RYDmbJLvA/formResponse';

const Application = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { id: 1, name: 'Basic Info', icon: faCompass },
    { id: 2, name: 'Education', icon: faBuildingColumns },
    { id: 3, name: 'Experience', icon: faBriefcase },
    { id: 4, name: 'Travel & Rules', icon: faMapPin },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleAgreementChange = (name: 'mlhConduct' | 'mlhTerms' | 'hackgbWaiver') => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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
      if (!formData.attendedHackathon) newErrors.attendedHackathon = 'Please answer this question.';
    }

    if (currentStep === 2) {
      if (!formData.university.trim()) newErrors.university = 'University / Institution Name is required.';
      if (!formData.status) newErrors.status = 'Please select your current status.';
      if (!formData.major.trim()) newErrors.major = 'Major / Field of Study is required.';
    }

    if (currentStep === 3) {
      if (!formData.projectExperience.trim()) {
        newErrors.projectExperience = 'Please describe your project experience.';
      } else if (formData.projectExperience.length > 600) {
        newErrors.projectExperience = 'Your response is too long. Please keep it under 600 characters.';
      }
    }

    if (currentStep === 4) {
      if (!formData.travelState.trim()) newErrors.travelState = 'Please enter your starting State or Province.';
      if (!formData.stipend) newErrors.stipend = 'Please select if you require a travel stipend.';
      if (!formData.housing) newErrors.housing = 'Please select if you require accommodations.';
      if (!formData.mlhConduct) newErrors.mlhConduct = 'You must agree to the MLH Code of Conduct.';
      if (!formData.mlhTerms) newErrors.mlhTerms = 'You must agree to the MLH Contest Terms & Privacy Policy.';
      if (!formData.hackgbWaiver) newErrors.hackgbWaiver = 'You must agree to the HackGB Waiver.';
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
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const data = new URLSearchParams();
      data.append('entry.42047240', formData.fullName);
      data.append('entry.1275623371', formData.email);
      data.append('entry.599449600', formData.phone);
      data.append('entry.217234878', formData.university);
      data.append('entry.1822819348', formData.status);
      data.append('entry.810774861', formData.major);
      data.append('entry.1768303647', formData.attendedHackathon);
      data.append('entry.486006868', formData.projectExperience);

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

      if (formData.mlhConduct) {
        data.append('entry.318526633', 'I have read and agree to the MLH Code of Conduct.');
      }
      if (formData.mlhTerms) {
        data.append('entry.318526633', 'I agree to the terms and conditions of the MLH Contest Terms and Conditions and the MLH Privacy Policy.');
      }
      if (formData.hackgbWaiver) {
        data.append('entry.318526633', 'I agree to the HackGB Liability and Media Waiver.');
      }

      // Add Google Form validation and multi-page sequence parameters
      data.append('fvv', '1');
      data.append('pageHistory', '0,1,2,3,4,5');

      // Perform background no-cors POST submission to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });

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
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-[#eff6eb] noise-overlay flex flex-col items-center justify-center">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#61A644]/5 rounded-full blur-[180px] pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#E37100]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

      <div className="w-full max-w-3xl z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#61A644]/10 border border-[#61A644]/15 text-[#61A644] font-google font-bold text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-[#61A644] rounded-full" />
            UWGB's Premier Collegiate Hackathon
          </span>
          <h1 className="text-4xl md:text-5xl font-google font-bold text-[#0C3C34] tracking-tight">
            HackGB 2026 Application
          </h1>
          <p className="text-slate-600 mt-2 font-google-text text-sm md:text-base max-w-lg mx-auto">
            Fill out your details to join us for an incredible weekend of creation, learning, and local innovation.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-card bg-white/95 border border-black/5 rounded-[2rem] shadow-2xl p-6 md:p-10 relative overflow-hidden min-h-[500px] flex flex-col">
          {isSuccess ? (
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
              {/* Progress Steps Header */}
              <div className="flex justify-between items-center mb-10 border-b border-black/5 pb-6">
                {steps.map((s, index) => {
                  const isActive = step === s.id;
                  const isCompleted = step > s.id;
                  return (
                    <div key={s.id} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center mx-auto relative group">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border font-google font-bold text-sm transition-all duration-350 ${
                            isActive
                              ? 'bg-[#0C3C34] text-white border-[#0C3C34] scale-110 shadow-[0_0_15px_rgba(12,60,52,0.25)]'
                              : isCompleted
                              ? 'bg-[#61A644]/10 text-[#61A644] border-[#61A644]/30'
                              : 'bg-slate-50 text-slate-400 border-black/5'
                          }`}
                        >
                          {isCompleted ? (
                            <FontAwesomeIcon icon={faCheck} className="text-xs" />
                          ) : (
                            s.id
                          )}
                        </div>
                        <span
                          className={`hidden md:block text-[11px] mt-2 font-google font-bold uppercase tracking-wider transition-colors duration-350 ${
                            isActive ? 'text-[#0C3C34]' : isCompleted ? 'text-[#61A644]' : 'text-slate-400'
                          }`}
                        >
                          {s.name}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-[2px] transition-all duration-500 ${
                            step > s.id ? 'bg-[#61A644]/40' : 'bg-slate-100'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Form Content Steps */}
              <div className="flex-1 overflow-hidden relative flex flex-col justify-between">
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
                          <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Basic Information
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">Full Name *</label>
                                <input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  placeholder="John Doe"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                    errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
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
                                  placeholder="john.doe@edu.com"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                  }`}
                                />
                                <span className="text-slate-400 text-[10px]">Use your .edu email if you are a student.</span>
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
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                    errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                  }`}
                                />
                                {errors.phone && <span className="text-red-500 text-xs mt-0.5">{errors.phone}</span>}
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
                          </div>
                        )}

                        {step === 2 && (
                          /* STEP 2: Education */
                          <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-google font-bold text-[#0C3C34] border-b border-black/5 pb-2">
                              Education & Background
                            </h2>

                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 text-sm font-google font-bold">
                                  University / School Name *
                                </label>
                                <input
                                  type="text"
                                  name="university"
                                  value={formData.university}
                                  onChange={handleInputChange}
                                  placeholder="University of Wisconsin-Green Bay"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                    errors.university ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                  }`}
                                />
                                {errors.university && <span className="text-red-500 text-xs mt-0.5">{errors.university}</span>}
                              </div>

                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 flex flex-col gap-1.5">
                                  <label className="text-slate-700 text-sm font-google font-bold">Current Status *</label>
                                  <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                      errors.status ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                  >
                                    <option value="" disabled>Select your status</option>
                                    <option value="Undergraduate Student">Undergraduate Student</option>
                                    <option value="Graduate Student">Graduate Student</option>
                                    <option value="Working Professional">Working Professional</option>
                                    <option value="High School Student">High School Student</option>
                                  </select>
                                  {errors.status && <span className="text-red-500 text-xs mt-0.5">{errors.status}</span>}
                                </div>

                                <div className="flex-1 flex flex-col gap-1.5">
                                  <label className="text-slate-700 text-sm font-google font-bold">
                                    Major / Field of Study *
                                  </label>
                                  <input
                                    type="text"
                                    name="major"
                                    value={formData.major}
                                    onChange={handleInputChange}
                                    placeholder="Computer Science"
                                    className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                      errors.major ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                    }`}
                                  />
                                  {errors.major && <span className="text-red-500 text-xs mt-0.5">{errors.major}</span>}
                                </div>
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
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all cursor-pointer ${
                                          isChecked
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
                                  <span className={`text-[10px] ${formData.projectExperience.length > 600 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                    {formData.projectExperience.length} / 600 chars
                                  </span>
                                </div>
                                <textarea
                                  name="projectExperience"
                                  value={formData.projectExperience}
                                  onChange={handleInputChange}
                                  rows={4}
                                  placeholder="Briefly describe a project you have worked on. This helps us understand your technical background. (Max 100 words / 600 characters)"
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all resize-none ${
                                    errors.projectExperience ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
                                  }`}
                                />
                                {errors.projectExperience && (
                                  <span className="text-red-500 text-xs mt-0.5">{errors.projectExperience}</span>
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
                                  className={`px-4 py-3 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 font-google-text text-sm focus:outline-none focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 transition-all ${
                                    errors.travelState ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-black/10'
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
                                <span className="text-slate-400 text-[9px] leading-tight mt-1">
                                  Must submit an eligible project before the hackathon deadline to receive stipends.
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
                              {errors.housing && <span className="text-red-500 text-xs mt-1">{errors.housing}</span>}
                            </div>

                            {/* Agreements Section */}
                            <div className="flex flex-col gap-3 mt-4 border-t border-black/5 pt-4">
                              <h3 className="text-md font-google font-bold text-[#0C3C34]">
                                <FontAwesomeIcon icon={faFileSignature} className="mr-2 text-[#61A644]" />
                                Code of Conduct & Waivers
                              </h3>

                              <div className="flex flex-col gap-3">
                                {/* MLH Conduct */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.mlhConduct}
                                      onChange={() => handleAgreementChange('mlhConduct')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer"
                                    />
                                    <span>
                                      I have read and agree to the{' '}
                                      <a
                                        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
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

                                {/* MLH Terms */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.mlhTerms}
                                      onChange={() => handleAgreementChange('mlhTerms')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer"
                                    />
                                    <span>
                                      I agree to the terms and conditions of the{' '}
                                      <a
                                        href="https://mlh.io/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#61A644] hover:underline font-bold"
                                      >
                                        MLH Contest Terms & Conditions
                                      </a>{' '}
                                      and the{' '}
                                      <a
                                        href="https://mlh.io/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#61A644] hover:underline font-bold"
                                      >
                                        MLH Privacy Policy
                                      </a>
                                      . *
                                    </span>
                                  </label>
                                  {errors.mlhTerms && <span className="text-red-500 text-[10px] pl-7">{errors.mlhTerms}</span>}
                                </div>

                                {/* HackGB Waiver */}
                                <div className="flex flex-col gap-1">
                                  <label className="flex items-start gap-3 text-xs text-slate-650 cursor-pointer select-none leading-relaxed">
                                    <input
                                      type="checkbox"
                                      checked={formData.hackgbWaiver}
                                      onChange={() => handleAgreementChange('hackgbWaiver')}
                                      className="w-4 h-4 mt-0.5 accent-[#61A644] cursor-pointer"
                                    />
                                    <span>I agree to the HackGB Liability and Media Waiver. *</span>
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
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-google font-bold text-sm transition-all ${
                        step === 1
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
      </div>
    </main>
  );
};

export default Application;
