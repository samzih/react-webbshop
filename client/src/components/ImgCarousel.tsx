import { Carousel } from "antd";

function ImgCarousel() {
  const contentStyle: React.CSSProperties = {
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <Carousel autoplay>
        <div>
          <h1
            style={{
              ...contentStyle,
              backgroundImage:
                'url("https://www.about-drinks.com/wp-content/uploads/2022/06/red-bull-energy-drink.jpg")',
            }}
          ></h1>
        </div>
        <div>
          <h1
            style={{
              ...contentStyle,
              backgroundImage:
                'url("https://usercontent.one/wp/www.swenico.se/wp-content/uploads/2022/08/Untitled-design-39-1-2048x1152.png-kopia.jpg?media=1675334743")',
            }}
          ></h1>
        </div>
        <div>
          <h1
            style={{
              ...contentStyle,
              backgroundImage:
                'url("https://www.fitnessguru.com/media/catalog/product/cache/60b7d85b9b5bb92ab90d10fd19a86d7d/o/n/one-whey-isolate-lifestyle-block.jpg")',
            }}
          ></h1>
        </div>
        <div>
          <h1
            style={{
              ...contentStyle,
              backgroundImage:
                'url("https://m.media-amazon.com/images/S/aplus-media-library-service-media/17c82ff5-2acb-493f-9d84-849687c58727.__CR0,0,970,600_PT0_SX970_V1___.jpg")',
            }}
          ></h1>
        </div>
      </Carousel>
    </>
  );
}

export default ImgCarousel;
