const baseUrl =
  process.env.NODE_ENV === "production"
    ? "bookgram.vercel.app"
    : "http://localhost:3000";
export default baseUrl;
