import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";
import Layout from "../components/Layout";
import Tab from "../components/Tab";
import TabItem from "../components/TabItem";
import { useSearchParams } from "@remix-run/react";
import LinkLists from "../components/LinkLists";
import LinkGroups from "../components/LinkGroups";
import PinnedLinks from "../components/PinnedLinks";
import { useState } from "react";

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
      links: true,
      linkGroups: true,
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
  const [activeTab, setActiveTab] = useState("links");

  return (
    <Layout user={user}>
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
          isActive={activeTab === "discover"}
          setTab={() => setActiveTab("discover")}
          name="Discover"
        />
        <TabItem
          isActive={activeTab === "pinned"}
          setTab={() => setActiveTab("pinned")}
          name="Pinned"
        />
      </Tab>
      <div className="pt-4">
        {activeTab === "links" && (
          <LinkLists isCurrentUser={true} links={user.links} />
        )}
        {activeTab === "groups" && <LinkGroups links={user.links} />}
        {activeTab === "pinned" && <PinnedLinks links={user.links} />}
      </div>
    </Layout>
  );
}
