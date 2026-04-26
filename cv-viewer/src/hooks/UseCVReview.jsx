import axios from "axios";
import { useState } from "react";
import { uploadCv } from "../services/Api";

export const useCVReview = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [checkFile,setCheckFile]=useState(false);


  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("File not selected");
      return;
    }
    setLoading(true);
    setError(null);
    setFile(selectedFile);
    try {
      const data = await uploadCv(selectedFile);
      setScoreData(data);
      setCheckFile(true);
    } catch (err) {
      setError("Failed to analyze Cv");
    } finally {
      setLoading(false);
    }
    e.target.value=null;
  };

  const reset = () => {
    setFile(null);
    setScoreData(null);
    setError(null);
    checkFile(false);
  };

  return {
    file,
    handleFileUpload,
    loading,
    error,
    scoreData,
    reset,
    checkFile,
  };
};
