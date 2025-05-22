import { Link } from "react-router-dom"; 
import error from '../../assets/images/error/404.jpg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-6 py-12">
      <div className="text-center max-w-md animate-fade-in">
        <img
          src={error}
          alt="404"
          className="w-72 mx-auto mb-8 dark:hidden"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          404
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Oops! We can't find that page.
        </p>

        <Link
          to="/home"
          className="inline-block px-6 py-3  mb-4 text-white font-medium rounded-lg bg-yellow-500 hover:bg-yellow-600 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>

      <footer className="absolute bottom-6 text-gray-500 text-sm dark:text-gray-400">
        &copy; {new Date().getFullYear()} — VM2Soft.com
      </footer>
    </div>
  );
}

