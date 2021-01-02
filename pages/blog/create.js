// import Editorjs from "../../components/Blog/creator";
// import dynamic from "next/dynamic";
// import { useEffect } from "react";
// import { use } from "passport";
// const ReactDOM = dynamic(() => import("react-dom"));

// const Blog1 = () => {
//   const CompanyIconInHeader = <div id="editorjs">y</div>;
//   return ReactDOM.render(<Editorjs />, CompanyIconInHeader);
// };

// export default Blog1;
import React from "react";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }

  async componentDidMount() {
    this.initEditor();
  }

  initEditor = () => {
    const EditorJS = require("@editorjs/editorjs");
    const Header = require("@editorjs/header");
    const Table = require("@editorjs/table");
    const List = require("@editorjs/list");
    const LinkTool = require("@editorjs/link");
    const Image = require("@editorjs/image");

    let content = null;
    if (this.props.data !== undefined) {
      content = this.props.data;
    }

    this.editor = new EditorJS({
      placeholder: "ی چیز بنویس...",
      holder: "editorjs",
      logLevel: "ERROR",
      tools: {
        table: Table,
        list: List,
        linkTool: LinkTool,
        image: {
          class: Image,
          config: {
            uploader: {
              async uploadByFile(file) {
                // var img = new Image();
                // const canvas = this.refs.canvas;
                // const context = this.refs.canvas.getContext("2d");
                // let fileee;
                // img.onload = function () {
                //   var iw = img.width;
                //   var ih = img.height;
                //   var scale = Math.min(150 / iw, 120 / ih);
                //   var iwScaled = iw * scale;
                //   var ihScaled = ih * scale;
                //   canvas.width = iwScaled;
                //   canvas.height = ihScaled;
                //   context.drawImage(
                //     img,
                //     0,
                //     0,
                //     context.canvas.width,
                //     context.canvas.height
                //   );
                //   console.log(canvas.toDataURL("image/jpeg", 0.8));
                //   fileee = canvas.toDataURL("image/jpeg", 0.8);
                // };
                // img.src = URL.createObjectURL(file);
                const formData = new FormData();
                formData.append("profilePicture", file);
                const resFile = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                const dataFile = await resFile.json();
                console.log(dataFile);
                return dataFile;
              },
            },
          },
        },
        header: Header,
      },
      i18n: {
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": "تنظیمات بلاک",
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": "تبدیل شدن",
              },
            },
            toolbar: {
              toolbox: {
                Add: "اضافه کردن",
              },
            },
          },
          toolNames: {
            Image: "عکس",
            Text: "متن",
            Heading: "هدینگ",
            List: "لیست",
            Warning: "هشدار",
            Checklist: "چک لیست",
            Quote: "نظر",
            Code: "کد",
            Delimiter: "جدا کننده",
            "Raw HTML": "HTML-фрагмент",
            Table: "جدول",
            Link: "لینک",
            Marker: "ماژیک",
            Bold: "بلد",
            Italic: "ایتالیک",
            InlineCode: "کد",
          },
          tools: {
            warning: {
              Title: "هشدار",
              Message: "هشدار",
            },
            link: {
              "جایگزلری لینک": "جایگزاری لینک",
            },
            stub: {
              "بلاک درست نشان داده نمی شود": "میتوانید ....",
            },
          },
          blockTunes: {
            delete: {
              Delete: "حذف",
            },
            moveUp: {
              "Move up": "بره بالا",
            },
            moveDown: {
              "Move down": "بیاد پایین",
            },
          },
        },
      },
      data: content,
    });
  };
  async onSave(e) {
    let data = await this.editor.saver.save();

    console.log(data);
  }

  render() {
    return (
      <>
        <canvas ref="canvas" style={{ display: "none" }} />

        <button onClick={(e) => this.onSave(e)}>Save</button>
        <div id={"editorjs"} onChange={(e) => this.onChange(e)}></div>
      </>
    );
  }
}

export default Editor;
