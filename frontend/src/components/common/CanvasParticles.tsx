import { useEffect, useRef } from 'react';

interface CanvasParticlesProps {
  color1?: string;
  color2?: string;
  lineColor?: string;
  particleCount?: number;
  maxDistance?: number;
  className?: string;
  speedFactor?: number;
  direction?: 'up' | 'down' | 'random';
}

const CanvasParticles = ({
  color1 = 'rgba(97, 166, 68, 0.3)',
  color2 = 'rgba(227, 113, 0, 0.3)',
  lineColor = 'rgba(97, 166, 68, 0.1)',
  particleCount = 45,
  maxDistance = 100,
  className = '',
  speedFactor = 1,
  direction = 'up',
}: CanvasParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        
        // Speed and direction controls
        const baseSpeedX = (Math.random() - 0.5) * 0.3 * speedFactor;
        let baseSpeedY = 0;
        
        if (direction === 'up') {
          baseSpeedY = -(Math.random() * 0.4 + 0.1) * speedFactor;
        } else if (direction === 'down') {
          baseSpeedY = (Math.random() * 0.4 + 0.1) * speedFactor;
        } else {
          baseSpeedY = (Math.random() - 0.5) * 0.3 * speedFactor;
        }

        this.vx = baseSpeedX;
        this.vy = baseSpeedY;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? color1 : color2;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap boundaries
        if (direction === 'up' && this.y < 0) {
          this.y = h;
          this.x = Math.random() * w;
        } else if (direction === 'down' && this.y > h) {
          this.y = 0;
          this.x = Math.random() * w;
        } else {
          if (this.y < 0 || this.y > h) this.vy = -this.vy;
        }

        if (this.x < 0 || this.x > w) this.vx = -this.vx;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      // Re-initialize particles to fit screen dimensions
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, w, h);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            // If the lineColor is already rgba, adjust format
            if (lineColor.startsWith('rgba')) {
              // Extract original base and override alpha
              const base = lineColor.substring(0, lineColor.lastIndexOf(','));
              ctx.strokeStyle = `${base}, ${alpha})`;
            }
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.update(w, h);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color1, color2, lineColor, particleCount, maxDistance, speedFactor, direction]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default CanvasParticles;
