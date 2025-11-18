import React, { useEffect, useRef } from 'react';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    // Configuration
    const config = {
      particleCount: Math.floor((width * height) / 15000),
      connectionDistance: Math.min(width, height) / 6,
      baseSpeed: 0.3,
      colors: {
        gold: { r: 234, g: 179, b: 8 },   // Gold-500
        slate: { r: 148, g: 163, b: 184 }, // Slate-400
      }
    };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number, g: number, b: number };
      depth: number; // 0.1 to 1.0 (1.0 is closest)
      phase: number;
    }

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      config.particleCount = Math.floor((width * height) / 15000); // Responsive density

      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        const depth = Math.random() * 0.8 + 0.2; // Random depth
        const isGold = Math.random() > 0.85;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.baseSpeed * depth,
          vy: (Math.random() - 0.5) * config.baseSpeed * depth,
          radius: (isGold ? 2.5 : 1.5) * depth,
          color: isGold ? config.colors.gold : config.colors.slate,
          depth: depth,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const draw = (time: number) => {
      // Use transparent fill for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.3)'; // Slate-950 with opacity
      ctx.fillRect(0, 0, width, height);

      // Update particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle sine wave movement on top of linear velocity
        p.x += Math.sin(time * 0.001 + p.phase) * 0.2 * p.depth;
        p.y += Math.cos(time * 0.001 + p.phase) * 0.2 * p.depth;

        // Mouse Interaction (Repulsion/Disturbance)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactDist = 250;

        if (dist < interactDist) {
          const force = (interactDist - dist) / interactDist;
          const angle = Math.atan2(dy, dx);
          // Push away
          p.x -= Math.cos(angle) * force * 2 * p.depth;
          p.y -= Math.sin(angle) * force * 2 * p.depth;
        }

        // Wrap around screen
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDistance) {
            const opacity = (1 - dist / config.connectionDistance) * 0.5 * p.depth * p2.depth;
            
            if (opacity > 0.05) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity})`;
              ctx.lineWidth = 1 * p.depth;
              ctx.stroke();

              // Data Packets (Pulses)
              // Only show occasionally based on time and pair index
              const pulseFrequency = 0.002; 
              const pulsePhase = (time * pulseFrequency + i * 13.45 + j * 73.21) % 3;
              
              if (pulsePhase >= 0 && pulsePhase <= 1) {
                 const px = p.x + (p2.x - p.x) * pulsePhase;
                 const py = p.y + (p2.y - p.y) * pulsePhase;
                 
                 const pulseOpacity = opacity * 2; // Brighter than the line
                 const size = 2 * p.depth;

                 ctx.beginPath();
                 ctx.arc(px, py, size, 0, Math.PI * 2);
                 ctx.fillStyle = `rgba(251, 191, 36, ${pulseOpacity})`; // Gold-400 pulse
                 ctx.shadowBlur = 8;
                 ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
                 ctx.fill();
                 ctx.shadowBlur = 0;
              }
            }
          }
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.8 * p.depth})`;
        
        if (p.color.r === config.colors.gold.r) {
            ctx.shadowBlur = 15 * p.depth;
            ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
        init();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    draw(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }} // Helps with the glow effect on dark background
    />
  );
};