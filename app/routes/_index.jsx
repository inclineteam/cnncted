import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";

export const meta = () => {
  return [
    { title: "Cnncted" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }) => {
  const authUser = await auth.isAuthenticated(request);
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
    <div className="h-auto bg-neutral-100 space-x-4 min-h-screen flex items-center justify-center p-4">
      <div className="rounded-lg bg-white shadow-sm p-4">
        <img
          src={user.avatar}
          className="w-32 h-32 rounded-full border border-black/10"
        />
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-sm p-4">Your links</div>
    </div>
  );
}
