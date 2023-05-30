import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";
import { getSession, commitSession } from "~/services/session.server";

export async function loader({ request }) {
  const user = await auth.isAuthenticated(request, {
    successRedirect: "/",
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
    <div>
      <h1>Signin</h1>

      {!user && !hasSentEmail && (
        <Form method="post">
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Insert email .." required />

          <button type="submit">Send Code</button>
        </Form>
      )}

      {hasSentEmail && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Form method="post">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              name="code"
              placeholder="Insert code .."
              required
            />

            <button type="submit">Continue</button>
          </Form>

          {/* Renders the form that requests a new code. */}
          {/* Email input is not required, the email is already in Session. */}
          <Form method="post">
            <button type="submit">Request new Code</button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Signin;
