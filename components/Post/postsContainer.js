import MostRatedPost from "./MostRatedPost";
import LatestPost from "./LatestPost";
import MostViewsPost from "./MostViewsPost";
import Slide from "./slide";
const Books = (props) => {
  return (
    <>
      <main class="blog-grid">
        <div class="blog-title">
          <div class="blog-title--text">
            <div class="blog-title--text__content">
              کتاب من را به آگاهی جهانی انسان متصل می کند.
            </div>
            <img src="../img/blog-title-circle.png" alt="" />
          </div>
          <div class="blog-title--icon">
            <a href="#">
              <svg class="icon-blog icon-telegram">
                <use xlinkHref="../img/symbol-defs.svg#icon-telegram"></use>
              </svg>
            </a>
            <a href="#">
              <svg class="icon-blog icon-insta">
                <use xlinkHref="../img/symbol-defs.svg#icon-insta"></use>
              </svg>
            </a>
            <a href="#">
              <svg class="icon-blog icon-face">
                <use xlinkHref="../img/symbol-defs.svg#icon-face"></use>
              </svg>
            </a>
            <a href="#">
              <svg class="icon-blog icon-twit">
                <use xlinkHref="../img/symbol-defs.svg#icon-twit"></use>
              </svg>
            </a>
          </div>
        </div>
        <Slide data={props.data} />
        <LatestPost data={props.data} />
        <div class="midline"></div>
        <MostViewsPost data={props.data} />
        <MostRatedPost data={props.data} />
      </main>
      <div class="midline"></div>
    </>
  );
};
export default Books;
