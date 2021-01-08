import Output from "editorjs-react-renderer";

const Post = ({ data }) => {
  return (
    <section>
      <Output
        data={JSON.parse(
          data
            .split("")
            .map((e) => {
              if (e == "'") {
                return '"';
              } else {
                return e;
              }
            })
            .join("")
        )}
      />
    </section>
  );
};

export default Post;
// https://www.npmjs.com/package/editorjs-react-renderer
// {'time':1610012736691,'blocks':[{'type':'delimiter','data':{}}],'version':'2.19.1'}
