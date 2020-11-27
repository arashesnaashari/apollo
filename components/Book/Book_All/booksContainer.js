import Best from "./BestSelllBooks";
import Last from "./LastBooks";
import Pop from "./PopularBooks";
import Middle1 from "../../Home/Middle1";
import Author from "../../Home/author";
import LastPost from "../../Home/lastPost";
import Container from "../../Home/Container";

const Books = (props) => {
  return (
    <>
      <Container />
      <Pop data={props.data} />
      <Middle1 />
      <Last data={props.data} />
      <Best data={props.data} />
      <LastPost />
      <Author />
    </>
  );
};
export default Books;
