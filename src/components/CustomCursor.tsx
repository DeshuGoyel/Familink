import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const { pathname } = useLocation();
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 260, mass: 0.4 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 260, mass: 0.4 });
  const isLandingCursorPage = pathname === '/' || pathname === '/waitlist';

  useEffect(() => {
    if (!isLandingCursorPage) return;

    const canUsePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canUsePointer) {
      setIsMobile(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isLandingCursorPage]);

  if (!isLandingCursorPage || isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: isHovering ? '#4F5CFF' : '#F9FAFB',
          x: cursorX,
          y: cursorY,
          marginLeft: -4,
          marginTop: -4,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary/50 pointer-events-none z-[10000]"
        style={{
          x: ringX,
          y: ringY,
          marginLeft: -12,
          marginTop: -12,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(79, 92, 255, 0.8)' : 'rgba(79, 92, 255, 0.3)',
        }}
      />
    </>
  );
}
