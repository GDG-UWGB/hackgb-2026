// Adds animated transitions between routes using Framer Motion.

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { useScrollToTop } from '../../hooks/useScrollToTop';

// Import Page components (The different pages of the app)
import Home from '../../pages/Home';
import Faqs from '../../pages/Faqs';
import ApplyOptions from '../../pages/ApplyOptions';
import Application from '../../pages/Application';
import JudgeApplication from '../../pages/JudgeApplication';
import MentorApplication from '../../pages/MentorApplication';
import CodeOfConduct from '../../pages/CodeOfConduct';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import OpeningSoon from '../../pages/OpeningSoon';
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
            {children}
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

            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes