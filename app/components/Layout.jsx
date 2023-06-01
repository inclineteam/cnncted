import { Link } from "@remix-run/react";

const Layout = ({ user, extendNav, children }) => {
  return (
    <div className="h-auto bg-gradient-to-b from-purple-500 to-violet-950 space-x-4 min-h-screen flex items-center justify-center md:p-4">
      <div className="flex flex-col h-screen md:h-[80vh] md:rounded-3xl max-w-2xl w-full bg-white shadow-sm p-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <Link
            to="/"
            className="flex items-end font-bold text-purple-500 text-xl tracking-tight"
          >
            <svg
              className="[&>g>path]:stroke-[2] mr-1 w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path d="M14 12a6 6 0 11-6-6"></path>
                <path d="M10 12a6 6 0 116 6" opacity="0.5"></path>
              </g>
            </svg>
            <span>cnncted</span>
          </Link>

          {extendNav}
        </div>
        <div className="flex flex-col md:flex-row items-center mb-6 md:items-end pt-6">
          <div className="p-1 rounded-full w-max mr-4 border border-black/10">
            <img src={user.avatar} className="w-24 h-24 rounded-full" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl text-neutral-700 font-bold">
              @{user.username}
            </p>
            <p className="text-neutral-600">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-neutral-600">{user.links.length} links</p>
          </div>
        </div>
        <div className="flex-1 relative overflow-y-scroll border border-neutral-100 rounded-xl shadow-sm px-2 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
