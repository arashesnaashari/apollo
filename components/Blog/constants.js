import dynamic from "next/dynamic";

const Table = dynamic(() => import("@editorjs/table"), { ssr: false });
const List = dynamic(() => import("@editorjs/list"), { ssr: false });
const LinkTool = dynamic(() => import("@editorjs/link"), { ssr: false });
const Image = dynamic(() => import("@editorjs/image"), { ssr: false });
const Header = dynamic(() => import("@editorjs/header"), { ssr: false });




export const EDITOR_JS_TOOLS = {
  table: Table,
  list: List,
  linkTool: LinkTool,
  image: Image,
  header: Header,
};
