import MostRatedPost from "./MostRatedPost";
import LatestPost from "./LatestPost";
import MostViewsPost from "./MostViewsPost";
const Books = (props) => {
  return (
    <>
      <h1>Posts </h1>
      <MostRatedPost data={props.data} />
      {/* <LatestPost data={props.data} />
      <MostViewsPost data={props.data} /> */}
    </>
  );
};
export default Books;
