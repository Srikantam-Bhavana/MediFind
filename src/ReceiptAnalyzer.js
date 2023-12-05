import React, { useState } from 'react';
import axios from 'axios';

const ReceiptAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [itemDescriptions, setItemDescriptions] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const analyzeReceipt = async () => {
    try {
      if (!selectedFile) {
        console.error("Please select a file.");
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setItemDescriptions(response.data.items);  
    } catch (error) {
      console.error("An error occurred:", error.message || error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={analyzeReceipt}>Analyze Receipt</button>
      
      {itemDescriptions.length > 0 && (
        <div>
          <h3>Item Descriptions:</h3>
          <ul>
            {itemDescriptions.map((description, index) => (
              <li key={index}>{description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReceiptAnalyzer;
