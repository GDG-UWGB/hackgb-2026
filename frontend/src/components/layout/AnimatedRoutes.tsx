// Adds animated transitions between routes using Framer Motion.

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { useScrollToTop } from '../../hooks/useScrollToTop';

// Import Page components (The different pages of the app)
import Home from '../../pages/Home';
import Faqs from '../../pages/Faqs';


// Define the transition properties for page animations
const pageTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.35
};


const AnimatedRoutes = () => {

    const location = useLocation();

    useScrollToTop(); // Custom hook to scroll to top on route change

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


    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname} >

                <Route path="/" element={<PageWrapper> <Home /> </PageWrapper>} />
                <Route path="/faqs" element={<PageWrapper> <Faqs /> </PageWrapper>} />

            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes