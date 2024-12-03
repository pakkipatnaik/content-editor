import React, { useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/save", {
        content: value,
      });
      setValue("")
      alert(response.data.message);
    } catch (error) {
      alert("Error saving content!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Markdown Editor</h1>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
        minEditorHeight={200}
        toolbarCommands={[["bold", "italic", "unordered-list"]]}
      />
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleSave}
      >
        Save Content
      </button>
    </div>
  );
};

export default App;
