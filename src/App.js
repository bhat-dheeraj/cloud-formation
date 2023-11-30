import "./App.css";
import { useEffect, useState } from "react";
import { getImages } from "./resources/apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import Gallery from "./components/Gallery";
import Upload from "./components/Upload";
import Analyze from "./components/Analyze";
import { Toast, ToastContainer } from "react-bootstrap";

function App() {
  const [images, setImages] = useState([]);
  const [tab, setTab] = useState("gallery");
  const [selectedImage, setSelectedImage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const fetchImages = async () => {
    const response = await getImages();
    const { images } = response;
    setImages([...images]);
  };

  const updateSelectedImage = (fileName) => {
    setSelectedImage(fileName);
  };

  const updateTab = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <ToastContainer
        className="p-3"
        position={"top-center"}
        style={{ zIndex: 1 }}
      >
        <Toast
          show={toast.show}
          delay={2000}
          autohide
          position="center"
          onClose={(e) => setToast({ show: false, message: "" })}
          style={{ background: "#4e1eab" }}
        >
          <Toast.Body style={{ color: "white", fontWeight: 600 }}>
            {toast?.message ?? ""}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {tab === "analyze" ? (
        <Analyze selectedImage={selectedImage} updateTab={updateTab} />
      ) : tab === "upload" ? (
        <Upload
          setToast={setToast}
          updateSelectedImage={updateSelectedImage}
          updateTab={updateTab}
          fetchImages={fetchImages}
        />
      ) : (
        <Gallery
          images={images}
          updateSelectedImage={updateSelectedImage}
          updateTab={updateTab}
        />
      )}
    </>
  );
}

export default App;
