export const Constants = {
  prod: process.env.NODE_ENV === "production",
  cookieName: "qid",
  redis: {
    forgotPass: "forgot-password:",
  },
};
