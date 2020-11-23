

// BookQuery($varId: String!)
const CommentsForm = (props) => {
  return (
    <>
      <div style={{ border: "red 1px solid" }}>
        <span>text:{props.comment.text} ||||||| </span>
        <span>rate:{props.comment.rate} |||||| </span>
        <span>creator:{props.comment.creator.username}</span>
      </div>
      
    </>
  );
};

export default CommentsForm;
//text
//creator
//rate
