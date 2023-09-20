import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, useAppDispatch } from '../app/store';
import { TCartItemProps } from '../types/components';

const CartItem = (props: TCartItemProps) => {
  const { item } = props;
  const { product, amount } = item;
  const dispatch = useAppDispatch();

  const addHandler = () => {
    dispatch(addToCart(product));
  };

  const removeHandler = () => {
    dispatch(removeFromCart(product.id));
  };
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt="" className="max-w-[80px]" />
        </Link>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${product.id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {product.title}
            </Link>

            <div className="cursor-pointer text-xl" onClick={removeHandler}>
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm ">
            <div
              className="flex flex-1 mw-[100px] items-center h-full border 
            text-primary font-medium"
            >
              <IoMdRemove className="flex-1 flex justify-center items-center cursor-pointer select-none" />
              <p className="h-full flex justify-center items-center px-2">
                {amount}
              </p>
              <IoMdAdd
                className="flex-1 flex justify-center items-center cursor-pointer select-none"
                onClick={addHandler}
              />
            </div>
            <div className="flex items-center justify-around flex-1 text-primary font-medium">
              $ {product.price}
            </div>
            <div className="flex items-center justify-around flex-1 text-primary font-medium">{`$ ${(
              product.price * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
