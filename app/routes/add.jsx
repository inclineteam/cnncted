import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";
import Layout from "../components/Layout";
import { Form } from "@remix-run/react";

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

  return (
    <Layout user={user}>
      <div className="pt-4">
        <div className="px-3 flex items-center space-x-3">
          <p className="font-medium text-neutral-600">Add new link</p>
        </div>
        <Form method="post">
          <button type="submit">Log out</button>
        </Form>
      </div>
    </Layout>
  );
}
