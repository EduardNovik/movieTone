import { ModeToggle } from './mode-toggle';

const Header = () => {
  return (
    <header className="flex flex-row w-full justify-between p-4">
      <div className="flex text-white gap-8">
        <p>tab1</p>
        <p>tab2</p>
      </div>
      <p className="text-white">Logo</p>
      <div className="flex text-white gap-8">
        <p>tab3</p>
        <p>tab4</p>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
