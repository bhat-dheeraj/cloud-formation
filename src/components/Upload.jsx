import React, { useState } from "react";
import { Button, Card, Container, Row, Spinner, Toast } from "react-bootstrap";
import { uploadImage } from "../resources/apiService";

const Upload = (props) => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
      setError("");
    };
    reader.onerror = (error) => {
      setError("Error reading file.");
    };
  };

  const isValidFile = (file) => {
    // Check for file type
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("File type must be .png or .jpg");
      return false;
    }

    // Check for file size (100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be under 100MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      convertToBase64(file);
      setFileName(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      convertToBase64(file);
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadImageListener = async (e) => {
    setLoading(true);
    const response = await uploadImage({ imageData: base64, fileName });
    props.setToast({ show: true, message: response.message });
    props.fetchImages();
    props.updateTab("gallery");
    setLoading(false);
  };

  return (
    <Container style={{ padding: "40px 0px" }}>
      <div
        className="gallery-title page-title fs-5 text"
        style={{ marginBottom: "20px", cursor: "pointer", color: "blue" }}
        onClick={(e) => props.updateTab("gallery")}
      >
        Back to Gallery
      </div>
      <div className="gallery-title page-title fs-3 text">Upload</div>

      <Card className="upload-card">
        {base64 ? (
          <div className="uploaded-section">
            <img
              src={base64}
              alt="Uploaded"
              className="uploaded-img"
              width={500}
            />
            <div className="gallery-title page-title fs-6 text">{fileName}</div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="upload-drag-drop"
          >
            Drag and drop your file here or click button select a file
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-input-label">
              Select a file
            </label>
          </div>
        )}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row className="button-row">
            <Button
              onClick={(e) => {
                setBase64("");
                setError("");
              }}
            >
              Reset
            </Button>
            <Button onClick={uploadImageListener}>Upload</Button>
          </Row>
        )}
      </Card>
    </Container>
  );
};

export default Upload;
