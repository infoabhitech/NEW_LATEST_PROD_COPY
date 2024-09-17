import React from "react";
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const Carousel = () => {
  return (
    <div>
      <ReactBootstrapCarousel>
        <ReactBootstrapCarousel.Item>
          {/* Video 1 */}
          <video width="100%" height="500" controls>
            <source src="video1.mp4" type="video/mp4" />
          </video>
        </ReactBootstrapCarousel.Item>
       
      </ReactBootstrapCarousel>
    </div>
  );
};

export default Carousel;