// AudioUploader.jsx

import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const TRANSCRIBE_PATH = "/api/transcribe";

export default function AudioUploader() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose an audio file first.");
      return;
    }
    const formData = new FormData();
    // include filename for some iOS/Safari flows
    formData.append("file", file, file.name || "audio.m4a");

    try {
      const res = await axios.post(`${API}${TRANSCRIBE_PATH}`, formData);
      setTranscription(
        typeof res.data === "string" ? res.data : JSON.stringify(res.data)
      );
    } catch (err) {
      console.error(err);
      setError("Upload failed. Try again or use a smaller file.");
    }
  };

  return (
    <div className="container">
      <h1>Audio to Text Transcriber</h1>

      <div className="file-input">
        {/* iOS tip: include common extensions so Files picker appears */}
        <input
          id="file"
          type="file"
          accept="audio/*,.m4a,.wav,.mp3,.aac,.caf"
          onChange={handleFileChange}
        />
        {file && <p style={{ marginTop: 8 }}>Selected: {file.name}</p>}
      </div>

      <button className="upload-button" onClick={handleUpload} disabled={!file}>
        Upload and Transcribe
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="transcription-result">
        <h2>Transcription Result</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
}
