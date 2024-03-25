import { Button } from '@movieTone/ui';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';

const UpDown = () => {
  const location = useRouterState({ select: s => s.location });

  function goUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  function goDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setIsVisible(contentHeight > viewportHeight);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check on component mount
    handleScroll();

    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [location]);

  return (
    isVisible && (
      <div className="flex flex-col gap-6 fixed bottom-24 right-8 z-50">
        <Button
          onClick={goUp}
          className="rounded-lg w-10 h-10 btn_light dark:btn_dark p-1"
        >
          <ChevronUp className="text-black dark:text-white" size={14} />
        </Button>
        <Button
          onClick={goDown}
          className="rounded-lg w-10 h-10 btn_light dark:btn_dark p-1"
        >
          <ChevronDown className="text-black dark:text-white" size={14} />
        </Button>
      </div>
    )
  );
};

export default UpDown;
