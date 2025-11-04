"use client";
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import SoundToggle from '../SoundToggle';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

interface SiteHeaderProps {
  name?: string;
  tagline?: string;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ name = "John Developer", tagline = "Full-Stack Developer & UI/UX Enthusiast" }) => {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const navItems = [
    { name: 'Projects', link: '#projects' },
    { name: 'Tech Stack', link: '#tech-stack' },
    { name: 'Experience', link: '#experience' },
    { name: 'Contact', link: '#contact' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo name={name} />
          <NavItems 
            items={navItems} 
            onLinkClick={() => playSound('/yes1.mp3', 0.5)}
          />
          <div className="flex items-center gap-4 relative z-30">
            {/* Sound Toggle */}
            <SoundToggle />
            
            {/* Enhanced Pixelated Theme Toggle */}
            <button
              onClick={() => {
                playSound('/minecraft-cave-sound-332982.mp3', 0.5);
                toggleTheme();
              }}
              className="relative w-16 h-8 border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:border-gray-400 dark:hover:border-gray-500"
              style={{ borderRadius: '6px' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {/* Toggle Background */}
              <div className={`absolute inset-0 ${isDark ? 'bg-slate-700' : 'bg-green-500'}`} 
                   style={{ borderRadius: '2px' }}>
              </div>
              
              {/* Active State Indicator - Nested White Squares */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-all duration-300 ${isDark ? 'left-1' : 'right-1'}`}>
                {/* Outer White Square */}
                <div className="absolute inset-0 bg-white border-2 border-gray-800 dark:border-black"
                     style={{ borderRadius: '2px' }}>
                  {/* Inner White Square */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-gray-800 dark:border-black"
                       style={{ borderRadius: '1px' }}>
                  </div>
                </div>
              </div>
              
              {/* Visual Feedback Overlay */}
              <div className={`absolute inset-0 transition-opacity duration-200 ${isDark ? 'bg-blue-900/20' : 'bg-green-900/20'} opacity-0 hover:opacity-100`}
                   style={{ borderRadius: '2px' }}>
              </div>
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo name={name} />
            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <SoundToggle />
              
              {/* Enhanced Pixelated Theme Toggle */}
              <button
                onClick={() => {
                  playSound('/minecraft-cave-sound-332982.mp3', 0.5);
                  toggleTheme();
                }}
                className="relative w-16 h-8 border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:border-gray-400 dark:hover:border-gray-500"
                style={{ borderRadius: '6px' }}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {/* Toggle Background */}
                <div className={`absolute inset-0 ${isDark ? 'bg-slate-700' : 'bg-green-500'}`} 
                     style={{ borderRadius: '2px' }}>
                </div>
                
                {/* Active State Indicator - Nested White Squares */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-all duration-300 ${isDark ? 'left-1' : 'right-1'}`}>
                  {/* Outer White Square */}
                  <div className="absolute inset-0 bg-white border-2 border-black"
                       style={{ borderRadius: '2px' }}>
                    {/* Inner White Square */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-black"
                         style={{ borderRadius: '1px' }}>
                    </div>
                  </div>
                </div>
                
                {/* Visual Feedback Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-200 ${isDark ? 'bg-blue-900/20' : 'bg-green-900/20'} opacity-0 hover:opacity-100`}
                     style={{ borderRadius: '2px' }}>
                </div>
              </button>
              
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => {
                  playSound('/minecraft-click.mp3', 0.5);
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => {
                  playSound('/yes1.mp3', 0.5);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-700/50 px-4 py-3 rounded-lg"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
  );
};

export { SiteHeader };
