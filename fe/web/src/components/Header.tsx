import { ModeToggle } from '@movieTone/ui';
import { Link } from '@tanstack/react-router';
import Logo from '../assets/iconfinder6.png';
import { useCallback } from 'react';
import useLoginModalState from '../hooks/useLoginModalState';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const loginModal = useLoginModalState();
  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const isActive = (path: string) => {
    const pathname = window.location.pathname;
    return pathname === path;
  };

  return (
    <header className="bg-transparent backdrop-blur-xl border-b-gray-200 dark:border-b-gray-800 border-b-[1px] shadow-md w-full z-50 fixed">
      <div className="container xl:max-w-screen-2xl py-1 flex flex-row justify-between items-center">
        <HeaderMenu/>
        <Link to="/" className="dark:text-white items-center flex">
          <img src={Logo} className="h-12 w-auto"></img>
        </Link>
        <div className="flex gap-8 items-center ">
          <span
            className="cursor-pointer hover:underline text-gray-500"
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
