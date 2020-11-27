const Container = (props) => {
  return (
    <>
      <section className="add-to-library">
        <div className="add-to-library--content">
          <h1>
            یوال هرری: <br />
            انسان خردمند: تاریخ مختصر بشر
          </h1>
          <div className="add-to-library--content__box">
            <a href="#">افزودن به کتابخانه</a>
            <select name="add-book">
              <option value="م">م</option>
              <option value="ن">ن</option>
              <option value="ه">ه</option>
            </select>
          </div>
        </div>
        <div className="add-to-library--image">
          <img src="./img/add-to-library.png" alt="book" />
          <img src="./img/add-to-library1.png" alt="book" />
        </div>
      </section>
      <div className="midline"></div>
    </>
  );
};
export default Container;
