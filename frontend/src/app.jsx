import { useEffect, useState } from 'react';
import API from './api/axiosInstance';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se data mangwana
    API.get('/test')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Project Starter Flow</h1>
      {data && (
        <div>
          <p style={{ color: 'green' }}>{data.message}</p>
          <h3>Team Members from Backend:</h3>
          <ul>
            {data.team.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;