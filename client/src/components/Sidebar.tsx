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
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const appStr = useAppSelector(APP_SELECTOR);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const { openSidebar, cart } = appStr;

  const handleClose = () => dispatch(toggleSideBar());
  const clearCartHandle = () => dispatch(clearCart());

  useEffect(() => {
    const newTotal = cart.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
  }, [cart]);

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

      <div
        className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden
      border-b"
      >
        {cart.map((item, idx) => (
          <CartItem key={idx} item={item} />
        ))}
      </div>

      <div className="flex gap-y-3 py-4 mt-4 w-full justify-between items-center">
        <div className="uppercase font-semibold">
          <span className="mr-2">Total: </span>$ {total}
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
