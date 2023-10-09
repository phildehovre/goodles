import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer-ctn">
      <ul>
        <li>About me</li>
        <li>Contact</li>© {new Date().getFullYear()} -{" "}
      </ul>
      {new Date().getFullYear() + 1}
      <a href="www.philippedehovre.com">Philippe De Hovre</a>
    </footer>
  );
}

export default Footer;
