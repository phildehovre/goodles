import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer-ctn">
      <ul>
        <li>
          <a href="http://www.philippedehovre.com/#about" target="_blank">
            About me
          </a>
        </li>
        <li>
          <a href="http://www.philippedehovre.com/#contact" target="_blank">
            Contact
          </a>
        </li>
      </ul>
      © {new Date().getFullYear()} - {new Date().getFullYear() + 1}
      <a href="http://www.philippedehovre.com" target="_blank">
        Philippe De Hovre
      </a>
    </footer>
  );
}

export default Footer;
