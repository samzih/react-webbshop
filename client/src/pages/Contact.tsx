import "../Styling/Contact.css";
import { Image } from "antd";
export default function Contact() {
  return (
    <div className="contact-container">
      <div>
        <h2 className="contact-title">Information:</h2>
        <p>Kjosk</p>
        <p>Göteborg, Hamngatan 43</p>
        <p>0733-00 00 00</p>
        <p>enmejl@mejl.se</p>
      </div>
      <Image
        className="contactImage "
        preview={false}
        src="https://www.google.com/maps/vt/data=NoWqqusMxp1oO1ycCftvpYSHck9mB6DkmU7M6SX7PrWXD4hRjp5Q23XzBrpXv7xaOcG0LMXTd1ApmOdod1uOSSWg4vld3mhevNdTAP1TKKhFgPXyNYvuSbpm8OnpV3DTdbDDQ4P0EKkxeTi5J7nbsdC83hKFU0diFvQK"
      />
    </div>
  );
}
