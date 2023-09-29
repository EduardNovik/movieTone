import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-[30px] max-w-6xl">
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
