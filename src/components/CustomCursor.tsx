import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 260, mass: 0.4 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 260, mass: 0.4 });

  useEffect(() => {
    // Only show custom cursor on real pointer devices (not touch)
    const canUsePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canUsePointer) {
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
      setIsHovering(!!t.closest('button, a, input, select, textarea, [role="button"], [tabindex]'));
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
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 7,
          height: 7,
          x: cursorX,
          y: cursorY,
          marginLeft: -3.5,
          marginTop: -3.5,
          backgroundColor: isHovering ? '#10b981' : '#111114',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 1.4 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 28,
          height: 28,
          x: ringX,
          y: ringY,
          marginLeft: -14,
          marginTop: -14,
          border: isHovering ? '1.5px solid rgba(16,185,129,0.7)' : '1.5px solid rgba(17,17,20,0.25)',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />
    </>
  );
}
