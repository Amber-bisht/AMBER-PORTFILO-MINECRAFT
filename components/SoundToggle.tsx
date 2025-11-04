import React, { useEffect, useState } from 'react';
import { useSound } from '../contexts/SoundContext';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffect } from '../hooks/useSoundEffect';

const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Play sound before toggling if sound is currently enabled
    // This way the sound plays while enabled, then we toggle it off
    const currentSoundState = soundEnabled;
    
    if (currentSoundState) {
      // Play sound first (while sound is still enabled)
      playSound('/minecraft-click.mp3', 0.5);
    }
    
    // Toggle immediately (no delay needed)
    toggleSound();
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 rounded-lg transition-colors duration-200 bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-pointer relative z-30"
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
};

export default SoundToggle;

