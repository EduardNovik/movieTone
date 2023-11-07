import { Button } from '@movieTone/ui';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const UpDown = () => {
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
  return (
    <div className="flex flex-col gap-6 fixed bottom-10 right-8 z-50">
      <Button
        onClick={goUp}
        className="rounded-lg w-10 h-10 bg-transparent backdrop-blur-xl hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 border-[1px] p-1"
      >
        <ChevronUp className="text-black dark:text-white" size={14} />
      </Button>
      <Button
        onClick={goDown}
        className="rounded-lg w-10 h-10 bg-transparent backdrop-blur-xl hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 border-[1px] p-1"
      >
        <ChevronDown className="text-black dark:text-white" size={14} />
      </Button>
    </div>
  );
};

export default UpDown;
