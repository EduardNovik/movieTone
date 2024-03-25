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

const HeaderMenu = () => {
  const logoutAndCleanState = useLogout();
  const { user } = userSessionState();

  const logoutHandler = () => {
    logoutAndCleanState();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border dark:border-gray-700 dark:hover:border-myViolet transition-all duration-500 ease-in-out dark:hover:text-myViolet"
        >
          <Menu className="pr-1" size={20} /> Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              Home
              <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="/latest">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              Latest
              <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="/">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              Anime
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="/watchlist">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              Watchlist
              <DropdownMenuShortcut>⇧⌘W</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="/about">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              About
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="/signup">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              Register
              <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
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
  );
};

export default HeaderMenu;
