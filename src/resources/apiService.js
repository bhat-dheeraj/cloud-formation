import axios from "axios";
import {
  API_IMAGE_UPLOAD,
  API_IMAGE_ANALYSIS,
  API_GET_IMAGES,
  API_GET_IMAGE,
} from "./apiUrls";

export const getImages = async () => {
  try {
    const response = await axios.get(API_GET_IMAGES);

    const data = JSON.parse(response.data?.body ?? null);
    return data;
  } catch {
    return null;
  }
};

export const getImageByName = async (fileName) => {
  try {
    const response = await axios.get(`${API_GET_IMAGE}?fileName=${fileName}`);

    const data = JSON.parse(response.data?.body ?? null);
    return data;
  } catch {
    return null;
  }
};

export const uploadImage = async (request) => {
  try {
    const response = await axios.post(API_IMAGE_UPLOAD, { ...request });

    const data = JSON.parse(response.data?.body ?? null);
    return data;
  } catch {
    return null;
  }
};

export const analyzeImage = async (fileName) => {
  try {
    const response = await axios.post(API_IMAGE_ANALYSIS, { fileName });

    const data = JSON.parse(response.data?.body ?? null);
    return data;
  } catch {
    return null;
  }
};
