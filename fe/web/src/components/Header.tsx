import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { ModeToggle } from "ui";
import Image from "next/image";
import useLoginModalState from "../hooks/useLoginModalState";
import Logo from "../assets/logo5.png";

const Header = () => {
  const loginModal = useLoginModalState();
  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <header className=" border-b-gray-500 border-b-[1px]">
      <div className="container py-1 flex flex-row justify-between">
        <div className="flex dark:text-white gap-8 items-center">
          {/* <Link to="/">Home</Link>
          <Link to="/">Spacecraft</Link> */}
        </div>
{/* 
        <Link to="/" className="dark:text-white items-center flex">
          <Image src={Logo} className="h-12 w-auto" alt="logo pic"></Image>
        </Link> */}

        <div className="flex  gap-8 items-center dark:text-white">
          {/* <Link to="/about">Liked</Link>
          <Link to="/about">About</Link> */}
          <span
            className="cursor-pointer hover:underline"
            onClick={openLoginModal}
          >
            Login
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
