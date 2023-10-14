import { ModeToggle } from 'ui/src/components/mode-toggle';
import { Link } from '@tanstack/react-router';
import Logo from '@/assets/logo5.png';

const Header = () => {
  return (
    <header className=" border-b-gray-500 border-b-[1px]">
      <div className="container py-1 flex flex-row justify-between">
        <div className="flex dark:text-white gap-8 items-center">
          <Link to="/">Home</Link>
          <Link to="/">Spacecraft</Link>
        </div>

        <Link to="/" className="dark:text-white items-center flex">
          <img src={Logo} className="h-12 w-auto"></img>
        </Link>

        <div className="flex  gap-8 items-center dark:text-white">
          <Link to="/about">Liked</Link>
          <Link to="/about">About</Link>
          <Link to="/">Login</Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
