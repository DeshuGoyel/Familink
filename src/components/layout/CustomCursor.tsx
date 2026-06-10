import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring animations for trailing ring
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 220, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    // Only disable custom cursor on mobile viewports
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) {
      setIsMobile(true);
      return;
    }

    setIsMobile(false);
    document.body.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(!!t.closest('button, a, input, select, textarea, [role="button"], [tabindex], .cursor-pointer'));
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
        style={{
          width: 8,
          height: 8,
          x: cursorX,
          y: cursorY,
          marginLeft: -4,
          marginTop: -4,
          backgroundColor: isHovering ? '#F59E0B' : '#F97316',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering 
            ? '0 0 10px #F59E0B, 0 0 20px rgba(245,158,11,0.5)' 
            : '0 0 8px #F97316, 0 0 16px rgba(249,115,22,0.4)',
        }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 32,
          height: 32,
          x: ringX,
          y: ringY,
          marginLeft: -16,
          marginTop: -16,
          border: isHovering 
            ? '1.5px solid rgba(245,158,11,0.8)' 
            : '1.5px solid rgba(249,115,22,0.3)',
          backgroundColor: isHovering ? 'rgba(245,158,11,0.06)' : 'rgba(249,115,22,0.01)',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      />
    </>
  );
}
