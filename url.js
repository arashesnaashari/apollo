const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bookgram-od3dkqsau.vercel.app/"
    : "http://localhost:3000";
export default baseUrl;
