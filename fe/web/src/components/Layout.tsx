import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="container h-full xl:max-w-screen-2xl">
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
