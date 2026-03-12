import { FaShoppingCart } from "react-icons/fa";
export default function Nav() {

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              KIT
            </div>
            <span className="text-xl font-bold text-gray-800">
              KITCH ME
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
             <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
               <FaShoppingCart className="text-xl" />
              </button>
            <button className="text-gray-600 hover:text-blue-600 font-medium pl-10.5">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
}
