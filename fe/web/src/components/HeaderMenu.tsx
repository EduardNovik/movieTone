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
import { signOut } from '../utils/signOut';
import { userSessionState } from '../store/userSessionStore';

const HeaderMenu = () => {
  const { updateUserSession } = userSessionState();
  const userSignOut = () => {
    signOut();
    updateUserSession(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
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
          <DropdownMenuItem
            // disabled={!userSessionStateData.user.name}
            className="cursor-pointer hover:bg-gray-200"
            onClick={userSignOut}
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
