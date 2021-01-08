const Lib = (props) => {
  return (
    <>
      {props.data &&
        props.data.map((e) => {
          return (
            <>
              <a href={`/book/${e._id}`}>
                <img src={e.image}></img>
                <h1>{e.title}</h1>
              </a>
            </>
          );
        })}
    </>
  );
};

export default Lib;
