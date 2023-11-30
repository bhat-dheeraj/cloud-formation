import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { analyzeImage, getImageByName } from "../resources/apiService";

const Analyze = (props) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

  const fetchImage = async () => {
    if (props.selectedImage) {
      setLoading(true);
      const response = await getImageByName(props.selectedImage);
      setImageSrc(`data:image/jpeg;base64,${response.image}`);
      setLoading(false);
    }
  };

  const fetchImageLabels = async () => {
    const response = await analyzeImage(props.selectedImage);
    setImageData({ ...response });
  };

  useEffect(() => {
    fetchImage();
    fetchImageLabels();
  }, [props.selectedImage]);

  if (isLoading) {
    return (
      <Container style={{ padding: "40px 0px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  return (
    <Container style={{ padding: "40px 0px" }}>
      <div
        className="gallery-title page-title fs-5 text"
        style={{ marginBottom: "20px", cursor: "pointer", color: "blue" }}
        onClick={(e) => props.updateTab("gallery")}
      >
        Back to Gallery
      </div>
      <div className="gallery-title page-title fs-3 text">Analyze image</div>
      <Row className="analyze-row">
        <div className="analyze-left">
          <img
            className="analyze-img"
            alt={props.fileName}
            src={imageSrc}
            width={500}
          />
        </div>
        <Col className="analyze-right">
          <div className="fs-4 text">Results:</div>

          <Row className="image-data">
            <Col className="image-labels image-labels-left">
              <div className="image-label-container">
                <div className="img-lbl-left img-lbl-title">Text detected</div>
                <div className="img-lbl-right img-lbl-title">Confidence</div>
              </div>
              {imageData?.textDetection?.TextDetections?.length > 0
                ? imageData.textDetection.TextDetections.map((text) => {
                    return (
                      <div className="image-label-container">
                        <div className="img-lbl-left">{text.DetectedText}</div>
                        <div className="img-lbl-right">
                          {parseFloat(text.Confidence).toFixed(2)}%
                        </div>
                      </div>
                    );
                  })
                : null}
            </Col>
            <Col className="image-labels">
              <div className="image-label-container">
                <div className="img-lbl-left img-lbl-title">Label</div>
                <div className="img-lbl-right img-lbl-title">Confidence</div>
              </div>
              {imageData?.imageProperties?.Labels?.length > 0
                ? imageData.imageProperties.Labels.map((label) => {
                    return (
                      <div className="image-label-container">
                        <div className="img-lbl-left">{label.Name}</div>
                        <div className="img-lbl-right">
                          {parseFloat(label.Confidence).toFixed(2)}%
                        </div>
                      </div>
                    );
                  })
                : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Analyze;
