import { useEffect } from 'react';

export default function ParticleCursor() {
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-cursor-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 30;
        const colors = ['#8b5cf6', '#a78bfa', '#c084fc'];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const addParticle = (x, y) => {
            particles.push({ x, y, size: Math.random() * 4 + 2, life: 60, hue: Math.floor(Math.random() * colors.length) });
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = colors[p.hue];
                ctx.fill();
                p.life--;
                p.y += 0.5; // slight drift downwards
                p.x += (Math.random() - 0.5) * 0.5; // slight horizontal jitter
            });
            requestAnimationFrame(update);
        };
        update();

        const mouseMove = (e) => {
            for (let i = 0; i < 2; i++) {
                addParticle(e.clientX + (Math.random() - 0.5) * 10, e.clientY + (Math.random() - 0.5) * 10);
            }
            if (particles.length > maxParticles) particles.splice(0, particles.length - maxParticles);
        };
        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('resize', resize);
            canvas.remove();
        };
    }, []);

    return null;
}
