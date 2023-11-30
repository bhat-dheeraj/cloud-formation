import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Gallery = (props) => {
  return (
    <Container className="gallery-container">
      <div className="gallery-title page-title fs-3 text">
        Gallery{" "}
        <Button onClick={(e) => props.updateTab("upload")}> Upload </Button>
      </div>

      <Row className="gallery-images">
        {props?.images?.length > 0
          ? props.images.map((image, index) => {
              return (
                <Card className="gallery-img-card" key={`image-${index}`}>
                  <div className="gallery-image-title page-title fs-6 text">
                    {image.fileName}
                  </div>
                  <img src={image.url} alt="" className="gallery-image" />
                  <Button
                    onClick={(e) => {
                      props.updateSelectedImage(image.fileName);
                      props.updateTab("analyze");
                    }}
                  >
                    {" "}
                    Analyze{" "}
                  </Button>
                </Card>
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default Gallery;
