import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-row w-full justify-between">
      <div className="flex text-white gap-8">
        <p>tab1</p>
        <p>tab2</p>
      </div>
      <p className="text-white">Logo</p>
      <div className="flex text-white gap-8">
        <p>tab3</p>
        <p>tab4</p>
        <p>color mode</p>
      </div>
    </header>
  );
};

export default Header;
