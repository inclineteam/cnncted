import { renderToString } from "react-dom/server";
import { emailProvider } from "./email-provider.server";

export const sendMail = async (options) => {
  const subject = "Cnncted OTP Code";
  const body = renderToString(
    <p>
      Hey there! 👋
      <br />
      Here's your code: {options.code}
      <br />
      Alternatively, you can click{" "}
      <a href={options.magicLink}>this link to automatically sign you in.</a>
    </p>
  );

  await emailProvider(options.email, subject, body);
};
