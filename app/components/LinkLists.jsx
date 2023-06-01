import { Link } from "@remix-run/react";

const LinkLists = ({ links, isCurrentUser }) => {
  return (
    <>
      <div className="px-3 mb-2 flex justify-between space-x-3">
        <p className="font-medium text-neutral-600">Links</p>

        {isCurrentUser ? (
          <>
            <Link
              to="/add"
              className="px-3 text-sm py-1.5 bg-purple-500 shadow-[0px_2px_4px_rgba(127,88,210,0.4),0px_0px_0px_1px_#6b21a8,inset_0px_1px_0px_#C084FC] hover:bg-purple-600 text-white rounded-md font-medium"
            >
              Add Link
            </Link>
          </>
        ) : null}
      </div>
      {links.length > 0 ? (
        <div className="px-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="border border-neutral-200 shadow-sm p-2 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="w-max bg-purple-50 text-purple-700 px-2 py-0.5 text-sm font-medium rounded-md">
                  {link.linkGroup.name}
                </div>
                <div className="capitalize w-max bg-neutral-100 text-neutral-600 px-2 py-0.5 text-sm font-medium rounded-md">
                  {link.type}
                </div>
              </div>
              <div data-simpletip="Go to url" className="simpletip st-b">
                <a
                  href={link.url}
                  target="_blank"
                  rel=" noopener noreferrer"
                  className="truncate hover:bg-neutral-100 block text-sm text-neutral-700 font-medium px-2 py-1 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_0_1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.1)] mt-2 rounded-md outline outline-2 outline-transparent focus:outline-purple-500"
                >
                  {link.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-6xl font-extrabold text-neutral-700">0</h1>
          <p className="text-neutral-600 mb-4">Shared links</p>
        </div>
      )}
    </>
  );
};

export default LinkLists;
