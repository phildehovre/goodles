import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer-ctn">
      <ul>
        <li>About me</li>
        <li>Contact</li>© {new Date().getFullYear()} -{" "}
        {new Date().getFullYear() + 1}
        <a href="www.philippedehovre.com">Philippe De Hovre</a>
      </ul>
    </footer>
  );
}

export default Footer;
