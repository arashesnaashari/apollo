import { useRouter } from "next/router";
const Setting = () => {
  const router = useRouter();
  return (
    <>
   
          <h1>Menu</h1>
        <span onClick={() => router.push("/dashboard/setting")}>Setting</span>
        <span onClick={() => router.push("/dashboard/library")}>Library</span>
        <span onClick={() => router.push("/dashboard/compare")}>Compare</span>
        <span onClick={() => router.push("/dashboard/feed")}>Feed</span>
     
    </>
  );
};
export default Setting;
