import fetch from "node-fetch";

const Upload = () => {
  const handleUpload = async (e) => {
    e.preventDefault();
    // let operation = {
    //   query: `mutation ($file: Upload!) {
    //     submitAFile (file: $file) {
    //       filename
    //     }
    //   }`,
    //   variables: {
    //     file: null,
    //   },
    // };
    // const map = {
    //   0: ["variables.file"],
    // };
    const theFile = e.target.files[0];
    const body = new FormData();
    body.append("operations", JSON.stringify(operation));
    body.append("map", JSON.stringify(map));
    body.append(0, theFile);
    // const opts = {
    //   method: "POST",
    //   body,
    //   headers: { Accept: "application/json" },
    // };
    const data = await fetch("/api/graphql", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: body,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <input type="file" onChange={handleUpload} />
    </>
  );
};

export default Upload;
