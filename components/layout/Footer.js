const Footer = () => (
  <>
    <footer className="footer-grid">
      <div className="logo-and-enamad">
        <a href="#" className="logo">
          <h1>BookGram.io</h1>
        </a>
        <img src="/img/e-namad.png" alt="e namad" />
      </div>
      <div className="footer-links">
        <h1>محصولات</h1>
        <ul className="footer-list">
          <a href="#">
            <li className="footer-list-item">لینک 1</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 2</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 3</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 4</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 5</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 6</li>
          </a>
        </ul>
      </div>
      <div className="footer-links">
        <h1>درباره ما</h1>
        <ul className="footer-list">
          <a href="#">
            <li className="footer-list-item">لینک 1</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 2</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 3</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 4</li>
          </a>
        </ul>
      </div>
      <div className="footer-links">
        <h1>کتابها</h1>
        <ul className="footer-list">
          <a href="#">
            <li className="footer-list-item">لینک 1</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 2</li>
          </a>
        </ul>
      </div>
      <div className="footer-links">
        <h1>بلاگ</h1>
        <ul className="footer-list">
          <a href="#">
            <li className="footer-list-item">لینک 1</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 2</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 3</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 4</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 5</li>
          </a>
          <a href="#">
            <li className="footer-list-item">لینک 6</li>
          </a>
        </ul>
      </div>
      <div className="social">
        <h1 className="social--header">در تماس باشیم</h1>
        <a href="#">
          <svg className="footer-icon icon-telegram1">
            <use xlinkHref="img/symbol-defs.svg#icon-telegram1"></use>
          </svg>
        </a>
        <a href="#">
          <svg className="footer-icon icon-instagram">
            <use xlinkHref="img/symbol-defs.svg#icon-instagram"></use>
          </svg>
        </a>
        <a href="#">
          <svg className="footer-icon icon-facebook">
            <use xlinkHref="img/symbol-defs.svg#icon-facebook"></use>
          </svg>
        </a>
        <a href="#">
          <svg className="footer-icon icon-twitter">
            <use xlinkHref="img/symbol-defs.svg#icon-twitter"></use>
          </svg>
        </a>
      </div>
      <div className="copyright">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از
      </div>
    </footer>
  </>
);

export default Footer;
