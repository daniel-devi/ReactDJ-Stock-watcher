import { useEffect, useState } from "react";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState<string>("");

  const checkIfLoggedIn = () => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      setUserName(localStorage.getItem("UserName") || "");
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  });

  return (
    <header className="bg-indigo-50">
      <nav className="bg-indigo-50 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" className="flex items-center">
            <span className="text-indigo-600 self-center text-xl font-semibold whitespace-nowrap">
              Stocker
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {!isLogin ? (
              <a
                href="/login"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                Log in
              </a>
            ) : (
              <div className="flex items-center rg:order-2 mr-2">
                <a href="/profile" className="text-gray-800 hover:bg-gray-50">
                 Hello {userName}
                </a>
              </div>
            )}

            <a
              href="/dashboard"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
            >
              Get started
            </a>
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 pr-4 pl-3 hover:text-blue-800 text-black rounded lg:bg-transparent lg:p-0"
                  aria-current="page"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 hover:text-blue-800 text-black rounded lg:bg-transparent lg:p-0"
                  aria-current="page"
                >
                  Portfolio Sharing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 hover:text-blue-800 text-black rounded lg:bg-transparent lg:p-0"
                  aria-current="page"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
