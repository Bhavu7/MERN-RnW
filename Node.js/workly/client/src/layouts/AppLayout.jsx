import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AppLayout = () => {
  return (
    <div className="page-shell transition-colors duration-300">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
