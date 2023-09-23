import { useEffect } from 'react';
import {
  PRODUCTS_SELECTOR,
  getProducts,
  useAppDispatch,
  useAppSelector,
} from '../app/store';
import { Hero, Product } from '../components';
import { STATUS_FETCH } from '../constants';

const Home = () => {
  const productStr = useAppSelector(PRODUCTS_SELECTOR);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (productStr.state === STATUS_FETCH.IDLE) {
      dispatch(getProducts());
    }
  }, [productStr.state]);

  return (
    <>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {productStr.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
