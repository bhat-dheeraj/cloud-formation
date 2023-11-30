import logo from "./logo.svg";
import "./App.css";
import { API_IMAGE_ANALYSIS, API_IMAGE_UPLOAD } from "./resources/apiUrls";
import axios from "axios";
import { useEffect } from "react";

console.log(API_IMAGE_UPLOAD, " ==== ", API_IMAGE_ANALYSIS);

function App() {
  const fetchAnalysis = async () => {
    const response = axios.post(API_IMAGE_ANALYSIS, {
      fileName: "test_image.jpg",
    });
    console.log("======  ", response);
  };

  useEffect(() => {
    fetchAnalysis();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
