const Container = (props) => {
  return (
    <>
      <section className="showcase">
        <div className="showcase--content">
          <h1 className="showcase--title">کتابخانه خودت را بساز</h1>
          <p className="showcase--description">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون
          </p>
          <a href="#" className="btn btn-primary">
            مشاهده همه
          </a>
        </div>

        <div className="showcase--images">
          <img
            className="book-reading"
            src="./img/showcase-img1.png"
            alt="book reading"
          />
          <img
            src="./img/showcase-img2.png"
            className="library"
            alt="book library"
          />
        </div>
      </section>
      <div className="midline"></div>
    </>
  );
};
export default Container;
