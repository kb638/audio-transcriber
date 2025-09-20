import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const TRANSCRIBE_PATH = "/api/transcribe";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (e) => setFile(e.target.files?.[0] ?? null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // name must match @RequestParam("file")

    try {
      const res = await axios.post(`${API}${TRANSCRIBE_PATH}`, formData);
      // if your controller returns { text: "..." }, use res.data.text
      setTranscription(
        typeof res.data === "string" ? res.data : JSON.stringify(res.data)
      );
    } catch (error) {
      console.error("Error transcribing audio", error);
      setTranscription("Failed to transcribe. See console for details.");
    }
  };

  return (
    <div className="container">
      <h1> Audio to Text Transcriber</h1>
      <div className="file-input">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <button className="upload-button" onClick={handleUpload}>
        Upload and Transcribe
      </button>
      <div className="transcription-result">
        <h2>Transcription Result</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioUploader;
