import { ModeToggle } from '@movieTone/ui';
import { Link } from '@tanstack/react-router';
import Logo from '../assets/iconfinder6.png';
import { useCallback } from 'react';
import useLoginModalState from '../hooks/useLoginModalState';
import HeaderMenu from './HeaderMenu';
import SearchBar from './SearchBar';
import { userSessionState } from '../store/userSession';

const Header = () => {
  const loginModal = useLoginModalState();
  const { user } = userSessionState();

  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <header className="bg-transparent backdrop-blur-3xl shadow-md w-full z-50 fixed">
      <div className="container xl:max-w-screen-2xl py-1 flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="dark:text-white items-center flex">
            <img src={Logo} className="h-12 w-auto"></img>
          </Link>
          <HeaderMenu />
        </div>
        <div className="flex gap-2 items-center w-[40%] justify-end">
          {user?.name ? (
            <span className="min-w-[50px] hover:none">{user.name}</span>
          ) : (
            <span
              className="cursor-pointer min-w-[50px] text-black dark:text-myGray dark:hover:text-myViolet"
              onClick={openLoginModal}
            >
              Log in
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
