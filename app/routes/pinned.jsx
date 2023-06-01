import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";
import Layout from "../components/Layout";
import Tab from "../components/Tab";
import TabItem from "../components/TabItem";

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
    include: {
      links: {
        where: {
          pinned: true,
        },
      },
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

export default function PinnedLinks() {
  const { user } = useLoaderData();

  return (
    <Layout user={user}>
      <Tab>
        <TabItem link="/" name="Links" />
        <TabItem link="/groups" name="Groups" />
        <TabItem link="/discover" name="Discover" />
        <TabItem link="/pinned" name="Pinned" />
      </Tab>
      <div className="pt-4">
        <div className="px-3 flex items-center space-x-3">
          <p className="font-medium text-neutral-600">Your pinned links</p>
        </div>

        {user.links.length > 0 ? (
          <div>Has links</div>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-6xl font-extrabold text-neutral-700">0</h1>
            <p className="text-neutral-600 mb-4">Pinned links</p>
            <Link
              to="/add"
              className="px-3 py-1.5 bg-purple-500 shadow-lg shadow-purple-200 text-white rounded-full font-medium"
            >
              Add One
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
