import dynamic from "next/dynamic";
import { EDITOR_JS_TOOLS } from "../../components/Blog/constants";

const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });

const Blog1 = () => {
  return (
    <EditorJs
    holder="editorjs"
        tools={EDITOR_JS_TOOLS}
        data={{
          time: 1556098174501,
          blocks: [
            {
              type: "header",
              data: {
                text: "Editor.js",
                level: 2,
              },
            },
          ],
          version: "2.12.4",
        }}
      ></EditorJs>
  );
};



export default Blog1;
