import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { sendMail } from "./email.server";
import db from "./db.server";
import { OTPStrategy } from "remix-auth-otp";

const secret = process.env.OTP_SECRET;

export const auth = new Authenticator(sessionStorage);

auth.use(
  new OTPStrategy(
    {
      secret,
      storeCode: async (code) => {
        await db.otp.create({
          data: {
            code: code,
            active: true,
            attempts: 0,
          },
        });
      },

      sendCode: async ({ email, code, magicLink }) => {
        await sendMail({ email, magicLink, code });
      },

      validateCode: async (code) => {
        const otp = await db.otp.findUnique({
          where: {
            code: code,
          },
        });
        if (!otp) throw new Error("OTP code not found.");

        return {
          code: otp.code,
          active: otp.active,
          attempts: otp.attempts,
        };
      },

      invalidateCode: async (code, active, attempts) => {
        if (!active) {
          await db.otp.delete({
            where: {
              code: code,
            },
          });
        } else {
          await db.otp.update({
            where: {
              code: code,
            },
            data: {
              active: active,
              attempts: attempts,
            },
          });
        }
      },
    },
    async ({ email, code, magicLink, form, request }) => {
      if (form) console.log("Optional form submission logic.");
      if (magicLink) console.log("Optional magic link submission logic.");

      let user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await db.user.create({
          data: { email },
        });
      }

      return user;
    }
  )
);
