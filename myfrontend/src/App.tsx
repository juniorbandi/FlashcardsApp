import React, { useEffect, useState } from "react";
import axios from "axios";

interface Word {
  id: string;
  polish_name: string;
  english_name: string;
  status: string;
}

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [polish_name, setPolishName] = useState("");
  const [english_name, setEnglishName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/words/");
        setWords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddWord = () => {
    console.log(polish_name);
    console.log(english_name);
    console.log(status);

    try {
      const response = axios.post("http://localhost:8000/api/words/", {
        polish_name,
        english_name,
        status: "active",
      });
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  return (
    <div>
      <h1>Words List</h1>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            {word.polish_name} - {word.english_name} ({word.status})
          </li>
        ))}
      </ul>

      <div>
        <label>
          Polish Name:
          <input
            type="text"
            value={polish_name}
            onChange={(e) => setPolishName(e.target.value)}
          />
        </label>
        <br />
        <label>
          English Name:
          <input
            type="text"
            value={english_name}
            onChange={(e) => setEnglishName(e.target.value)}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleAddWord}>Add Word</button>
      </div>
    </div>
  );
};

export default App;
