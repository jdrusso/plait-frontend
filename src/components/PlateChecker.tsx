import React, { useState } from 'react';
import axios from 'axios';

interface PlateResponse {
  available: boolean;
  src?: string;
}

const PlateChecker: React.FC = () => {
  const [plate, setPlate] = useState<string>('');
  const [result, setResult] = useState<PlateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkPlate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/check_plate', { plate });
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Check License Plate Availability</h1>
      <form onSubmit={checkPlate}>
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Enter license plate"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {result && (
        <div>
          <h2>Results for "{plate}":</h2>
          <p>Available: {result.available ? 'Yes' : 'No'}</p>
          {result.src && <img src={result.src} alt="License Plate" />}
        </div>
      )}
    </div>
  );
};

export default PlateChecker;
