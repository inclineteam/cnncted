import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import db from "~/services/db.server";

export const loader = async ({ request }) => {
  const authUser = await auth.isAuthenticated(request);
  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user.isNew) return redirect("/");

  return null;
};

export const action = async ({ request }) => {
  const user = await auth.isAuthenticated(request);
  const form = await request.formData();
  const firstName = form.get("firstname");
  const lastName = form.get("lastname");
  const username = form.get("username");
  const updatedUserInfo = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName,
      lastName,
      username,
      isNew: false,
      avatar: `https://gravatar.com/avatar/${user.id}?s=400&d=retro&r=x`,
    },
  });

  return json({
    updatedUserInfo,
  });
};

function NewUser() {
  return (
    <div className="flex items-center justify-center min-h-screen h-auto bg-neutral-100">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-neutral-600 -mt-10 mb-6">
          Welcome!
        </h1>

        <Form
          method="post"
          className="bg-white p-4 rounded-lg border border-neutral-200 shadow-lg shadow-neutral-300/10"
        >
          <div className="mb-4 flex space-x-4">
            <div>
              <label
                htmlFor="firstname"
                className="text-neutral-600 font-medium"
              >
                First Name
              </label>
              <input
                name="firstname"
                placeholder="Your first name"
                className="px-3 text-neutral-800 py-1.5 mt-2 mb-2 placeholder:text-neutral-400 block border border-neutral-300 bg-white rounded-md w-full outline-offset-[-1px] focus:outline-purple-500 outline outline-2 outline-transparent focus:shadow-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="text-neutral-600 font-medium"
              >
                Last Name
              </label>
              <input
                name="lastname"
                placeholder="Your last name"
                className="px-3 text-neutral-800 py-1.5 mt-2 mb-2 placeholder:text-neutral-400 block border border-neutral-300 bg-white rounded-md w-full outline-offset-[-1px] focus:outline-purple-500 outline outline-2 outline-transparent focus:shadow-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="text-neutral-600 font-medium">
              Username
            </label>
            <div className="space-x-2 flex px-3 text-neutral-800 py-1.5 mt-2 mb-2 placeholder:text-neutral-400 block border border-neutral-300 bg-white rounded-md w-full outline-offset-[-1px] focus-within:outline-purple-500 outline outline-2 outline-transparent focus-within:shadow-md">
              <div className="font-bold text-slate-600">@</div>
              <input
                name="username"
                placeholder="cnncteduser"
                className="outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="shadow-lg mt-2 hover:shadow-purple-300 duration-150 bg-purple-500 text-white w-full py-2 rounded-md font-semibold"
          >
            Update information
          </button>
        </Form>
      </div>
    </div>
  );
}

export default NewUser;
