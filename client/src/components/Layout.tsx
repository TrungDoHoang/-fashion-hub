import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '.';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default Layout;
