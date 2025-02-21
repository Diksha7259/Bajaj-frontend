import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://bajaj-backend-3-mprt.onrender.com"; // Replace with your deployed backend URL

const App = () => {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    try {
      const jsonInput = JSON.parse(inputData);
      if (!jsonInput.data || !Array.isArray(jsonInput.data)) {
        throw new Error("Invalid JSON format");
      }

      const res = await axios.post(API_URL, jsonInput);
      setResponseData(res.data);
    } catch (err) {
      setError("Invalid JSON input. Please enter a valid JSON.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Bajaj Frontend</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Enter JSON like { "data": ["A","B","1","2"] }'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <div>
          <h3>Response:</h3>
          <select multiple onChange={(e) => setFilter([...e.target.selectedOptions].map(o => o.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <pre>
            {JSON.stringify(
              Object.fromEntries(Object.entries(responseData).filter(([key]) => filter.includes(key))),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
