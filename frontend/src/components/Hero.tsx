import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import logo from '../assets/images/logos/logo.gif';
import foxRiverImg from '../assets/images/background/fox-river.png';
import { ArrowRight } from 'lucide-react';

/* Premium spring easing — Apple-style curve */
const spring = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let pulses: Pulse[] = [];
        const particleCount = 85;
        const maxDistance = 110;
        let time = 0;

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            alpha: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = -(Math.random() * 0.4 + 0.1);
                this.radius = Math.random() * 2.5 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(97, 166, 68, 0.45)' : 'rgba(227, 113, 0, 0.45)';
                this.alpha = Math.random() * 0.5 + 0.5;
            }

            update(w: number, h: number, mouse: { x: number; y: number; active: boolean }) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.y < 0) {
                    this.y = h;
                    this.x = Math.random() * w;
                }
                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;

                // Mouse interaction (Fluid repulsion)
                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 125) {
                        const force = (125 - dist) / 125;
                        const angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 3.5;
                        this.y += Math.sin(angle) * force * 3.5;
                    }
                }
            }

            draw(c: CanvasRenderingContext2D) {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                c.fillStyle = this.color;
                c.fill();
            }
        }

        class Pulse {
            x: number;
            y: number;
            radius: number;
            maxRadius: number;
            color: string;
            progress: number;
            speed: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.radius = 2;
                this.maxRadius = Math.random() * 50 + 35;
                this.color = Math.random() > 0.5 ? 'rgba(97, 166, 68, 0.65)' : 'rgba(227, 113, 0, 0.65)';
                this.progress = 0;
                this.speed = Math.random() * 0.012 + 0.008;
            }

            update() {
                this.progress += this.speed;
                this.radius = this.maxRadius * this.progress;
            }

            draw(c: CanvasRenderingContext2D) {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                const alpha = (1 - this.progress) * 0.5;
                c.strokeStyle = this.color.replace('0.65', alpha.toString());
                c.lineWidth = 1;
                c.stroke();
            }
        }

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(window.innerWidth, window.innerHeight));
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;

            if (Math.random() < 0.08) {
                pulses.push(new Pulse(e.clientX, e.clientY));
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        resizeCanvas();

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            time += 0.001;

            ctx.clearRect(0, 0, w, h);

            const mouse = mouseRef.current;

            // Draw organic energy field
            const segmentWidth = 10;
            ctx.lineWidth = 1;
            for (let i = 0; i < 2; i++) {
                ctx.beginPath();
                ctx.strokeStyle = i === 0 ? 'rgba(97, 166, 68, 0.05)' : 'rgba(227, 113, 0, 0.04)';
                for (let x = 0; x < w; x += segmentWidth) {
                    const dx = x - mouse.x;
                    const waveDeformation = Math.sin(x * 0.0055 + time * 15 + i * Math.PI) * 35;
                    let mouseDeformation = 0;
                    if (mouse.active) {
                        const dy = (h * 0.5) - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            mouseDeformation = (150 - dist) * 0.2;
                        }
                    }

                    const targetY = h * 0.5 + waveDeformation - mouseDeformation;
                    if (x === 0) ctx.moveTo(x, targetY);
                    else ctx.lineTo(x, targetY);
                }
                ctx.stroke();
            }

            // Draw fluid ribbons representing energy flow / Fox River waves
            ctx.lineWidth = 1.2;
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                ctx.strokeStyle = j === 0
                    ? 'rgba(97, 166, 68, 0.04)'
                    : j === 1
                        ? 'rgba(227, 113, 0, 0.03)'
                        : 'rgba(12, 60, 52, 0.04)';

                for (let x = 0; x < w; x += 5) {
                    const waveOffset = Math.sin(x * 0.003 + time * 8 + j * 200) * 45;
                    const cosOffset = Math.cos(x * 0.002 - time * 5 + j * 100) * 20;
                    ctx.lineTo(x, h * 0.5 + waveOffset + cosOffset);
                }
                ctx.stroke();
            }

            // Update and draw particles
            particles.forEach((p) => {
                p.update(w, h, mouse);
                p.draw(ctx);
            });

            // Handle constellation connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(97, 166, 68, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Update and draw pulse packets
            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].update();
                pulses[i].draw(ctx);
                if (pulses[i].progress >= 1) {
                    pulses.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 overflow-hidden bg-transparent">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0">
                <img src={foxRiverImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Canvas Animated Constellation Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{ opacity: 0.9 }}
            />

            {/* Light Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(12,60,52,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(12,60,52,0.012)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

            <div className="max-w-5xl mx-auto z-10 flex flex-col items-center">
                {/* Phoenix Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: spring }}
                    className="mb-10"
                >
                    <img
                        src={logo}
                        alt="HackGB Phoenix Logo"
                        className="h-32 sm:h-40 md:h-56 lg:h-64 w-auto drop-shadow-[0_8px_32px_rgba(12,60,52,0.12)]"
                    />
                </motion.div>

                {/* Event badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.4, ease: spring }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-card text-[#0C3C34] font-google font-bold text-sm uppercase tracking-widest border border-black/5 bg-white">
                        <span className="w-2 h-2 bg-[#61A644] rounded-full animate-ambient-glow" />
                        Oct 17-18, 2026 • UWGB
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.5, ease: spring }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-google font-bold mb-6 tracking-tight text-[#0C3C34]"
                >
                    HackGB <span className="text-gradient-phoenix">2026</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.7, ease: spring }}
                    className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto mb-12 font-google-text"
                >
                    UWGB's premier 24-hour collegiate hackathon. Join 200+ students at the STEM Innovation Center to build, learn, and innovate.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 1.0, ease: spring }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <RouterLink
                        to="/apply"
                        className="btn-primary w-full sm:w-auto px-10 py-4 rounded-full font-google font-bold text-lg cursor-pointer group flex items-center justify-center gap-2"
                    >
                        Apply Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </RouterLink>
                    <Link
                        to="about"
                        smooth={true}
                        duration={500}
                        href="#about"
                        className="w-full sm:w-auto text-slate-800 hover:text-[#0C3C34] border border-slate-350 hover:border-slate-400 bg-white/60 hover:bg-white px-8 py-4 rounded-full font-google-text font-medium transition-all text-center cursor-pointer backdrop-blur-sm shadow-sm"
                    >
                        Explore the Tour
                    </Link>
                </motion.div>
            </div>



            {/* MLH Badge — fixed for desktop, hidden on mobile (moved to navbar) */}
            <div className="hidden md:block fixed top-0 right-4 z-60 p-4">
                <a id="mlh-trust-badge" style={{ display: 'block', maxWidth: '80px', minWidth: '50px', width: '10vw' }} href="https://mlh.io/seasons/2026/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank">
                    <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" alt="Major League Hacking 2026 Hackathon Season" style={{ width: '100%' }} />
                </a>
            </div>
        </section>
    );
};

export default Hero;
