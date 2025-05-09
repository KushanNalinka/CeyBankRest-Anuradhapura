
// import { Link } from "react-router";


// export default function NotFound() {
//   return (
//     <>
   
//         <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
//           <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
//             ERROR
//           </h1>

//           <img src="/images/error/404.svg" alt="404" className="dark:hidden" />
//           <img
//             src="/images/error/404-dark.svg"
//             alt="404"
//             className="hidden dark:block"
//           />

//           <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
//             We can’t seem to find the page you are looking for!
//           </p>

//           <Link
//             to="/"
//             className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
//           >
//             Back to Home Page
//           </Link>
//         </div>
//         {/* <!-- Footer --> */}
//         <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
//           &copy; {new Date().getFullYear()} - TailAdmin
//         </p>
    
//     </>
//   );
// }

import { Link } from "react-router-dom"; // Fix: Use react-router-dom

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-6 py-12">
      <div className="text-center max-w-md animate-fade-in">
        {/* <img
          src="/images/error/404.svg"
          alt="404"
          className="w-72 mx-auto mb-8 dark:hidden"
        />
        <img
          src="/images/error/404-dark.svg"
          alt="404 Dark"
          className="w-72 mx-auto mb-8 hidden dark:block"
        /> */}

        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          404
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Oops! We can't find that page.
        </p>

        <Link
          to="/home"
          className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300"
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

