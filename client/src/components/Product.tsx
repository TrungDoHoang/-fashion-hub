import { Link } from 'react-router-dom';
import { TProductProps } from '../types/components';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { addToCart, useAppDispatch } from '../app/store';

const Product = (props: TProductProps) => {
  const { product } = props;
  const dispatch = useAppDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex justify-center items-center w-[200px] ">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={product.images[0] ?? ''}
              alt=""
            />
          </div>
        </div>
        <div
          className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center 
          justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        >
          <button
            className="flex justify-center items-center text-white w-12 h-12 bg-red-500/80 
          hover:bg-red-500"
            onClick={addToCartHandler}
          >
            <BsPlus className="text-3xl" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex justify-center items-center bg-white w-12 h-12 text-primary drop-shadow-xl 
            hover:bg-slate-100"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <h2 className="text-sm capitalize text-gray-500">
        {product.category.title}
      </h2>
      <Link to={`/product`}>
        <h2 className="font-semibold mb-1">{product.title}</h2>
      </Link>
      <p className="font-semibold">$ {product.price.toLocaleString()}</p>
    </div>
  );
};

export default Product;
