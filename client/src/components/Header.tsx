import { BsBag } from 'react-icons/bs';
import {
  APP_SELECTOR,
  toggleSideBar,
  useAppDispatch,
  useAppSelector,
} from '../app/store';
import { Link } from 'react-router-dom';
import { PATH } from '../constants';
import Logo from '../assets/img/logo.svg';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const Header = () => {
  const appStr = useAppSelector(APP_SELECTOR);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useAppDispatch();
  const openSideBarHandler = () => dispatch(toggleSideBar());

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={clsx(
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6',
        'w-full fixed z-10 transition-all'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to={PATH.ROOT}>
          <img src={Logo} alt="Logo" className="w-[40px]" />
        </Link>
        <div
          className="cursor-pointer flex relative max-w-[50px]"
          onClick={openSideBarHandler}
        >
          <BsBag className="text-2xl" />
          <div
            className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px]
        text-white rounded-full flex justify-center items-center"
          >
            {appStr.cart.length}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
