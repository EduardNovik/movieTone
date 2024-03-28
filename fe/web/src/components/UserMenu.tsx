import { Button } from '@movieTone/ui';
import { Link } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from '@movieTone/ui';
import { Menu } from 'lucide-react';
import { useLogout } from '../utils/useLogout';
import { userSessionState } from '../store/userSession';
import { useCallback } from 'react';
import useLoginModalState from '../hooks/useLoginModalState';

const UserMenu = () => {
  const logoutAndCleanState = useLogout();
  const { user } = userSessionState();
  const loginModal = useLoginModalState();

  const logoutHandler = () => {
    logoutAndCleanState();
  };

  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return user?.name ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border dark:border-gray-700 dark:hover:border-myViolet transition-all duration-500 ease-in-out dark:hover:text-myViolet"
        >
          <Menu className="pr-1" size={20} />
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hey {user.name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/user">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              Account
              <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            disabled={!user?.name}
            className="cursor-pointer hover:bg-gray-200"
            onClick={logoutHandler}
          >
            Log out
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      className="cursor-pointer min-w-[50px] text-black dark:text-myGray dark:hover:text-myViolet"
      variant="outline"
      onClick={openLoginModal}
    >
      Log in
    </Button>
  );
};

export default UserMenu;
