const Rest = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("profilePicture", file);
    const res = await fetch("/api/rest", {
      method: "POST",
      // credentials: "same-origin",
      headers: { Accept: "application/json" },
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <input type="file" onChange={handleUpload}></input>
    </>
  );
};

export default Rest;
