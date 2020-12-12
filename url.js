const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bookgram.vercel.app"
    : "https://bookgram.vercel.app";
export default baseUrl;
