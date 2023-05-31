import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import { getSession, commitSession } from "~/services/session.server";

export async function loader({ request }) {
  const user = await auth.isAuthenticated(request, {
    successRedirect: "/new",
  });

  const session = await getSession(request.headers.get("Cookie"));
  const hasSentEmail = session.has("auth:otp");

  const email = session.get("auth:email");
  const error = session.get(auth.sessionErrorKey);

  return json(
    { user, hasSentEmail, email, error },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }) {
  await auth.authenticate("OTP", request, {
    successRedirect: "/signin",
    failureRedirect: "/signin",
  });
}

function Signin() {
  const { user, hasSentEmail, email, error } = useLoaderData();

  return (
    <div className="flex items-center justify-center min-h-screen h-auto bg-neutral-100">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-neutral-600 -mt-10 mb-6">
          Sign in
        </h1>

        {!user && !hasSentEmail && (
          <Form
            method="post"
            className="bg-white p-4 rounded-lg border border-neutral-200 shadow-lg shadow-neutral-300/10"
          >
            <label htmlFor="email" className="text-neutral-600 font-medium">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter email"
              className="px-3 text-neutral-800 py-1.5 mt-2 mb-2 placeholder:text-neutral-400 block border border-neutral-300 bg-white rounded-md w-full outline-offset-[-1px] focus:outline-purple-500 outline outline-2 outline-transparent"
              required
            />
            <p className="text-neutral-500 text-sm">
              We'll send you an OTP code for email verification, or you can use
              the Magic link.
            </p>

            <button
              type="submit"
              className="shadow-lg mt-6 hover:shadow-purple-300 duration-150 bg-purple-500 text-white w-full py-2 rounded-md font-semibold"
            >
              Send Code
            </button>
          </Form>
        )}

        {hasSentEmail && (
          <div className="w-full">
            <Form
              method="post"
              className="bg-white p-4 rounded-lg border border-neutral-200 shadow-lg shadow-neutral-300/10"
            >
              <label htmlFor="email" className="text-neutral-600 font-medium">
                Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="Enter code"
                className="px-3 text-neutral-800 py-1.5 mt-2 mb-2 placeholder:text-neutral-400 block border border-neutral-300 bg-white rounded-md w-full outline-offset-[-1px] focus:outline-purple-500 outline outline-2 outline-transparent"
                required
              />

              <button
                type="submit"
                className="shadow-lg mt-2 hover:shadow-purple-300 duration-150 bg-purple-500 text-white w-full py-2 rounded-md font-semibold"
              >
                Continue
              </button>
            </Form>

            {/* Renders the form that requests a new code. */}
            {/* Email input is not required, the email is already in Session. */}
            <Form method="post" className="flex py-4 space-x-1">
              <p className="text-slate-600">Didn't get the code?</p>{" "}
              <button
                type="submit"
                className="font-medium hover:underline underline-offset-4 text-purple-700"
              >
                request for a new one
              </button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signin;
