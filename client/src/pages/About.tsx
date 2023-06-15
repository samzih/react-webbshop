import "../Styling/About.css";
import { Image } from "antd";
export default function About() {
  return (
    <div className="about-container">
      <h2>Om oss</h2>
      <p>
        En liten kjosk i hjärtat av Göteborg som även tillhandahar produkter
        online.
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <Image
        className="aboutImage responsiveImage"
        width={600}
        preview={false}
        src="https://images.pexels.com/photos/12330187/pexels-photo-12330187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    </div>
  );
}
