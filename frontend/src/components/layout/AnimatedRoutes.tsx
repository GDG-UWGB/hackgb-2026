// Adds animated transitions between routes using Framer Motion.

import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { useScrollToTop } from '../../hooks/useScrollToTop';

// Eager load Home for instant first paint
import Home from '../../pages/Home';

// Lazy load secondary routes to keep initial bundle size minimal
const Faqs = lazy(() => import('../../pages/Faqs'));
const ApplyOptions = lazy(() => import('../../pages/ApplyOptions'));
const Application = lazy(() => import('../../pages/Application'));
const JudgeApplication = lazy(() => import('../../pages/JudgeApplication'));
const MentorApplication = lazy(() => import('../../pages/MentorApplication'));
const CodeOfConduct = lazy(() => import('../../pages/CodeOfConduct'));
const PrivacyPolicy = lazy(() => import('../../pages/PrivacyPolicy'));
const OpeningSoon = lazy(() => import('../../pages/OpeningSoon'));
const SchedulePage = lazy(() => import('../../pages/SchedulePage'));
import { checkApplicationsOpen } from '../../data/constants';


// Define the transition properties for page animations
const pageTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.35
};


const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={pageTransition}
            className="w-full h-full"
        >
            <Suspense fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#61A644] border-t-transparent animate-spin" />
                </div>
            }>
                {children}
            </Suspense>
        </motion.div>
    );
};


const AnimatedRoutes = () => {

    const location = useLocation();

    useScrollToTop(); // Custom hook to scroll to top on route change

    const [isOpen, setIsOpen] = React.useState(checkApplicationsOpen());


    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname} >

                <Route path="/" element={<PageWrapper> <Home /> </PageWrapper>} />
                <Route path="/faqs" element={<PageWrapper> <Faqs /> </PageWrapper>} />
                <Route path="/apply" element={<PageWrapper> {isOpen ? <ApplyOptions /> : <OpeningSoon onUnlock={() => setIsOpen(true)} />} </PageWrapper>} />
                <Route path="/apply/hacker" element={<PageWrapper> {isOpen ? <Application /> : <OpeningSoon onUnlock={() => setIsOpen(true)} />} </PageWrapper>} />
                <Route path="/apply/judge" element={<PageWrapper> {isOpen ? <JudgeApplication /> : <OpeningSoon onUnlock={() => setIsOpen(true)} />} </PageWrapper>} />
                <Route path="/apply/mentor" element={<PageWrapper> {isOpen ? <MentorApplication /> : <OpeningSoon onUnlock={() => setIsOpen(true)} />} </PageWrapper>} />
                <Route path="/code-of-conduct" element={<PageWrapper> <CodeOfConduct /> </PageWrapper>} />
                <Route path="/privacy-policy" element={<PageWrapper> <PrivacyPolicy /> </PageWrapper>} />
                <Route path="/schedule" element={<PageWrapper> <SchedulePage /> </PageWrapper>} />

            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes