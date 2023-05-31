import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";

export const meta = () => {
  return [
    { title: "Cnncted" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }) => {
  const authUser = await auth.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (user.isNew) return redirect("/new");

  return json({ user });
};

export const action = async ({ request }) => {
  return await auth.logout(request, {
    redirectTo: "/signin",
  });
};

export default function Index() {
  const { user } = useLoaderData();

  return (
    <div className="h-auto bg-gradient-to-b from-purple-500 to-violet-950 space-x-4 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col h-[80vh] rounded-3xl max-w-2xl w-full bg-white shadow-sm p-6">
        <div className="border-b border-slate-100 pb-2">
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
        </div>
        <div className="flex items-end pt-6">
          <div className="p-1 rounded-full mr-4 border border-black/10">
            <img src={user.avatar} className="w-24 h-24 rounded-full" />
          </div>
          <div>
            <p className="text-2xl text-neutral-700 font-bold">
              @{user.username}
            </p>
            <p className="fon">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-white shadow-sm p-4">
          Your links
        </div>
      </div>
    </div>
  );
}
