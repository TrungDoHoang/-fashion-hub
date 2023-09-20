import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { PATH } from '../constants';
import { Home, Login, NotFound, ProductDetail, Register } from '../views';

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <Layout />,
    children: [
      {
        path: PATH.ROOT,
        element: <Home />,
      },
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.REGISTER,
        element: <Register />,
      },
      {
        path: PATH.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: PATH.ANY,
    element: <NotFound />,
  },
]);

export default router;
