import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {/* <ul
            tabIndex={0}
            className="menu menu-xl dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link href="/demo">Demo</Link>
            </li>
          </ul> */}
        </div>
        <Link href="/">
          <button className="btn btn-ghost text-xl ml-2">Robustsumm</button>
        </Link>
      </div>
      <div className="navbar-end flex items-center">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <Link href="https://github.com/Rog11/RobustSumm">
          <button className="btn btn-ghost btn-circle">
            <FaGithub className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
