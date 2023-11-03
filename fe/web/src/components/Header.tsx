import { ModeToggle } from '@movieTone/ui';
import { Link } from '@tanstack/react-router';

import Logo from '../assets/iconfinder6.png';
import { useCallback } from 'react';
import useLoginModalState from '../hooks/useLoginModalState';

const Header = () => {
  const loginModal = useLoginModalState();
  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <header className=" border-b-gray-500 border-b-[1px]">
      <div className="container py-1 flex flex-row justify-between">
        <div className="flex dark:text-white gap-8 items-center">
          <Link to="/">Home</Link>
          <Link to="/latest">Latest</Link>
        </div>

        <Link to="/" className="dark:text-white items-center flex">
          <img src={Logo} className="h-12 w-auto"></img>
        </Link>

        <div className="flex  gap-8 items-center dark:text-white">
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/about">About</Link>
          <span
            className="cursor-pointer hover:underline"
            onClick={openLoginModal}
          >
            Sign in
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
