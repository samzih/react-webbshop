import "../Styling/Footer.css";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer>
      <div>
        <h5>Information:</h5>
        <p>Kjosk</p>
        <p>Göteborg, Hamngatan 43</p>
        <p>0733-00 00 00</p>
        <p>enmejl@mejl.se</p>
      </div>

      <div>
        <h5>Social media</h5>

        <p>
          <FacebookFilled /> Facebook
        </p>
        <p>
          <InstagramFilled /> Instagram
        </p>

        <p>
          <TwitterCircleFilled /> Twitter
        </p>
      </div>
    </footer>
  );
}

export default Footer;
