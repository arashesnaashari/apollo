const Container = (props) => {
  return (
    <>
      <section className="new-reveiws">
        <h1 className="new-reveiws--title">از جدید ترین نقد ها</h1>
        <div className="cards-primary">
          <div className="card-primary">
            <img
              className="card-primary--image"
              src="./img/new-reveiws1.png"
              alt="reveiw section"
            />
            <span className="user">
              <span className="user--box">@User_2</span>
              <span className="user--post-time">
                <span className="middot">.</span>
                <span>4min</span>
              </span>
            </span>
            <div className="card-primary--description">
              <h1 className="title">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟
              </h1>
              <p className="description">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
              </p>
            </div>
            <div className="card-primary--author">
              <img
                src="./img/review-author1.png"
                alt="review-author"
                className="review-author"
              />
              <span className="author-name">Eugene Adams</span>
            </div>
          </div>
          <div className="card-primary">
            <img
              className="card-primary--image"
              src="./img/new-reveiws2.png"
              alt="reveiw section"
            />
            <span className="user">
              <span className="user--box">@User_2</span>
              <span className="user--post-time">
                <span className="middot">.</span>
                <span>4min</span>
              </span>
            </span>
            <div className="card-primary--description">
              <h1 className="title">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟
              </h1>
              <p className="description">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
              </p>
            </div>
            <div className="card-primary--author">
              <img
                src="./img/review-author2.png"
                alt="review-author"
                className="review-author"
              />
              <span className="author-name">Larry Hill</span>
            </div>
          </div>
        </div>
      </section>
      <div className="midline"></div>
    </>
  );
};
export default Container;
