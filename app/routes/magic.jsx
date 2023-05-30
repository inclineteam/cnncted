import { auth } from "~/services/auth.server";

export const loader = async ({ request }) => {
  await auth.authenticate("email-link", request, {
    successRedirect: "/",
    failureRedirect: "/signin",
  });
};
