const Container = (props) => {
  return (
    <>
      <section className="author-intro">
        <h1>معرفی نویسنده</h1>
        <div className="author-intro--box">
          <img src="./img/author-intro.png" alt="author-Introduction" />
          <div className="author-intro--description">
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای .
            </p>
            <span className="author-name">منظر حسینی</span>
          </div>

          <a href="#" className="more">
            بیشتر &gt; &gt;
          </a>
        </div>
      </section>
      <div className="midline"></div>
    </>
  );
};
export default Container;
