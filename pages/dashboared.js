import { indigo } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import AuthContext from "../context/auth-context";

const Dashboared = () => {
  const router = useRouter();

  return (
    <AuthContext.Consumer>
      {(context) => {
        if (typeof window !== "undefined" && !context.token) {
          router.push("/");
        }
        return (
          <>
            <h1>d</h1>
          </>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Dashboared;
