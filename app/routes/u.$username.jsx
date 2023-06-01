import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";
import Layout from "~/components/Layout";
import Tab from "~/components/Tab";
import TabItem from "~/components/TabItem";
import { useParams } from "@remix-run/react";
import { useState } from "react";
import LinkLists from "~/components/LinkLists";
import LinkGroups from "~/components/LinkGroups";
import PinnedLinks from "~/components/PinnedLinks";
import { useSearchParams } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Cnncted" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }) => {
  const authUser = await auth.isAuthenticated(request);
  const username = params.username.toString().replace("@", "");
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      links: {
        select: {
          linkGroup: true,
          url: true,
          id: true,
          type: true,
        },
      },
      linkGroups: true,
    },
  });

  if (!authUser) return json({ user, authUser: null });

  return json({ user, authUser });
};

export const action = async ({ request }) => {
  return await auth.logout(request, {
    redirectTo: "/signin",
  });
};

export default function UserProfile() {
  const { user, authUser } = useLoaderData();
  const [activeTab, setActiveTab] = useState("links");

  return user ? (
    <Layout
      user={user}
      extendNav={
        <div>
          {authUser ? (
            <Link to="/">Your profile</Link>
          ) : (
            <Link
              to="/signin"
              className="px-3 text-sm py-1.5 bg-purple-500 shadow-[0px_2px_4px_rgba(127,88,210,0.4),0px_0px_0px_1px_#6b21a8,inset_0px_1px_0px_#C084FC] text-white rounded-md font-medium"
            >
              Sign in
            </Link>
          )}
        </div>
      }
    >
      <Tab>
        <TabItem
          isActive={activeTab === "links"}
          setTab={() => setActiveTab("links")}
          name="Links"
        />
        <TabItem
          isActive={activeTab === "groups"}
          setTab={() => setActiveTab("groups")}
          name="Groups"
        />
        <TabItem
          isActive={activeTab === "pinned"}
          setTab={() => setActiveTab("pinned")}
          name="Pinned"
        />
      </Tab>
      <div className="pt-4">
        {activeTab === "links" && (
          <LinkLists
            isCurrentUser={authUser ? user.id === authUser.id : false}
            links={user.links}
          />
        )}
        {activeTab === "groups" && <LinkGroups links={user.links} />}
        {activeTab === "pinned" && <PinnedLinks links={user.links} />}
      </div>
    </Layout>
  ) : (
    <div className="h-auto bg-gradient-to-b from-purple-500 to-violet-950 space-x-4 min-h-screen flex items-center justify-center p-4">
      <div className="flex justify-center items-center flex-col h-[80vh] rounded-3xl max-w-2xl w-full bg-white shadow-sm p-6">
        <h1 className="text-lg text-slate-600">User not found.</h1>
      </div>
    </div>
  );
}
