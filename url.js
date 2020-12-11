const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bookgram-jtviq0oxm.vercel.app"
    : "http://localhost:3000";
export default baseUrl;
