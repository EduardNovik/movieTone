import { ModeToggle } from '@movieTone/ui';
import { Link } from '@tanstack/react-router';
import Logo from '../assets/iconfinder6.png';
import { useCallback, useEffect, useState } from 'react';
import useLoginModalState from '../hooks/useLoginModalState';
import HeaderMenu from './HeaderMenu';
import SearchBar from './SearchBar';
import {
  useManageUserSession,
  userSessionState,
} from '../store/userSessionStore';

const Header = () => {
  const loginModal = useLoginModalState();
  const userSession = userSessionState();
  useManageUserSession();

  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <header className="bg-transparent backdrop-blur-3xl border-b-gray-200 dark:border-b-gray-800 border-b-[1px] shadow-md w-full z-50 fixed">
      <div className="container xl:max-w-screen-2xl py-1 flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="dark:text-white items-center flex">
            <img src={Logo} className="h-12 w-auto"></img>
          </Link>
          <HeaderMenu />
        </div>
        <div className="flex gap-2 items-center w-[40%] justify-end">
          {userSession.user?.name ? (
            <span className="cursor-pointer min-w-[50px] hover:underline text-gray-500">
              {userSession.user.name}
            </span>
          ) : (
            <span
              className="cursor-pointer min-w-[50px] hover:underline text-gray-500"
              onClick={openLoginModal}
            >
              Sign in
            </span>
          )}
          <SearchBar />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

// const isActive = (path: string) => {
//   const pathname = window.location.pathname;
//   return pathname === path;
// };

// const fetchSession = () => {
//   fetch(`${window.origin}/api/session`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Handle the response from the server
//       console.log(data);
//       // Now, you can access the context in data.context
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   axios.post(`${window.origin}/api/test`);
// };
// <Button onClick={fetchSession}>get</Button>;
