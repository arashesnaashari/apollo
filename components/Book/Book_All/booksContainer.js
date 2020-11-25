import Best from "./BestSelllBooks";
import Last from "./LastBooks";
import Pop from "./PopularBooks";
const Books = (props) => {
  return (
    <>
      <h1>Books Part </h1>
      <Best data={props.data} />
      <Last data={props.data} />
      <Pop data={props.data} />
     
    </>
  );
};
export default Books;
