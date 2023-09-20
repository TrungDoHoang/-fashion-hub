import { BsBag } from 'react-icons/bs';
import { toggleSideBar, useAppDispatch } from '../app/store';

const Header = () => {
  const dispatch = useAppDispatch();
  const openSideBarHandler = () => dispatch(toggleSideBar());
  return (
    <header className="h-16 bg-pink-200">
      <div>header</div>
      <div className="" onClick={openSideBarHandler}>
        <BsBag />
      </div>
    </header>
  );
};

export default Header;
