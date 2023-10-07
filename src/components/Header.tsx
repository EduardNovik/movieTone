import { ModeToggle } from './mode-toggle';
import { Link } from '@tanstack/react-router';

const Header = () => {
  return (
    <header className="flex flex-row w-full justify-between p-4">
      <div className="flex text-white gap-8">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <Link to="/" className="text-white">
        Logo
      </Link>

      <div className="flex text-white gap-8">
        <p>tab3</p>
        <p>tab4</p>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
