import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Update dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      
      // Update ring with a slight delay for smooth trailing effect
      // We do this via requestAnimationFrame for better performance
      if (ringRef.current) {
        // Using transform for better performance, but here we update left/top since transform is used for translate(-50%,-50%) in CSS
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }
    };

    const onMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = isHovering 
          ? 'translate(-50%, -50%) scale(1.8)' 
          : 'translate(-50%, -50%) scale(1)';
      }
    };

    // Attach hover effects to clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Add custom cursor class to body
    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible, isHovering]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return null; // Don't render on touch devices
  }

  return (
    <>
      <div 
        ref={dotRef}
        className={cn(
          "blueprint-cursor-dot",
          !isVisible && "opacity-0"
        )}
      />
      <div 
        ref={ringRef}
        className={cn(
          "blueprint-cursor-ring",
          !isVisible && "opacity-0",
          isHovering && "hover"
        )}
      />
    </>
  );
}
