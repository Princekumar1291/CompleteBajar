import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('#navbar-default') && !event.target.closest('#menu-button')) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bajar</span>
        </Link>
        <button 
          id="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${menuOpen ? 'absolute top-16 left-0 right-0 bg-white shadow-lg z-50' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === '/' ? 'text-blue-700 bg-blue-100' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
              >
                Home
              </Link>
            </li>
            {isLoggedIn && userType === 'seller' && (
              <li>
                <Link
                  to="/addproduct"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === '/addproduct' ? 'text-blue-700 bg-blue-100' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                >
                  Add Product
                </Link>
              </li>
            )}
            {isLoggedIn && userType === 'customer' && (
              <li>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === '/cart' ? 'text-blue-700 bg-blue-100' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                >
                  Cart
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === '/login' ? 'text-blue-700 bg-blue-100' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                >
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === '/signup' ? 'text-blue-700 bg-blue-100' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                >
                  Signup
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button
                  className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0 text-gray-900 dark:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;