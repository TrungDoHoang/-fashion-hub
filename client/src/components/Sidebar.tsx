import { FiTrash2 } from 'react-icons/fi';
import { IoMdArrowForward } from 'react-icons/io';
import {
  APP_SELECTOR,
  clearCart,
  toggleSideBar,
  useAppDispatch,
  useAppSelector,
} from '../app/store';
import { CartItem } from '.';

const Sidebar = () => {
  const appStr = useAppSelector(APP_SELECTOR);
  const dispatch = useAppDispatch();
  const { openSidebar, cart } = appStr;
  const handleClose = () => dispatch(toggleSideBar());
  const clearCartHandle = () => dispatch(clearCart());

  return (
    <aside
      className={`${
        openSidebar ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:mw-[30vw] 
      transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="text-sm uppercase font-semibold">
          Shopping bag({cart.length})
        </div>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClose}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      {cart.map((item, idx) => (
        <CartItem key={idx} item={item} />
      ))}

      <div className="flex w-full justify-between items-center">
        <div>
          <span>Total: </span>$ 1000
        </div>
        <button
          className="py-4 bg-red-500 text-white w-12 h-1/2 flex justify-center items-center
        text-xl"
          onClick={clearCartHandle}
        >
          <FiTrash2 />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
