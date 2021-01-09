import React from "react";
import AuthContext from "../../context/auth-context";
class Editor extends React.Component {
  static contextType = AuthContext;
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
    const Image = require("@editorjs/image");
    const Delimiter = require("@editorjs/delimiter");

    let content = null;
    if (this.props.data !== undefined) {
      content = this.props.data;
    }

    this.editor = new EditorJS({
      placeholder: "ی چیز بنویس...",
      holder: "editorjs",
      logLevel: "ERROR",
      tools: {
        delimiter: Delimiter,
        table: Table,
        list: List,
        image: {
          class: Image,
          config: {
            uploader: {
              async uploadByFile(file) {
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
    e.preventDefault();
    let data = await this.editor.saver.save();
    const { userId } = this.context;
    console.log(data);
    console.log(userId);
    const title = data.blocks.find((e) => {
      return e.type == "header";
    }); // .data.text
    const body = data.blocks.find((e) => {
      return e.type == "paragraph";
    }); //data.text
    const image = data.blocks.find((e) => {
      return e.type == "image";
    }); // data.file.url

    console.log(title);
    if (title && body) {
      // console.log(
      //   `title : ${title.data.text}   body:${body.data.text}   image:${image.data.file.url}`
      // );
      //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      console.log(
        JSON.stringify(data)
          .split("")
          .map((e) => {
            if (e == '"') {
              return "'";
            } else {
              return e;
            }
          })
          .join("")
      );
      fetch("/api/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: `
        mutation {
          createPost(input:{userId:"5fba7c7f637eca2ba0e4e39e",title:"ttttttt",body:"bbbbbb",image:"https://res.cloudinary.com/bookgram/image/upload/v1610145007/p5e8z66hk5vhto0sn3zi.jpg",data:"${JSON.stringify(
            data
          )
            .split("")
            .map((e) => {
              if (e == '"') {
                return "'";
              } else {
                return e;
              }
            })
            .join("")}"}){
            _id
          }
        }
        `,
        }),
      });
    }
  }
  render() {
    return (
      <>
        <div id={"editorjs"} onChange={(e) => this.onChange(e)}></div>
        <button onClick={(e) => this.onSave(e)}>Save</button>
      </>
    );
  }
}

export default Editor;
