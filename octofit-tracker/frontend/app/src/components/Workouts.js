import React, { useEffect, useState } from 'react';

const getApiUrl = (component) => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const port = '8000';
  return `${protocol}//${codespace}-${port}.app.github.dev/api/${component}/`;
};

const Workouts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const endpoint = getApiUrl('workouts');
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        const results = json.results || json;
        setData(results);
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts data:', results);
      });
  }, []);
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                {data[0] && Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  {Object.values(item).map((val, i) => (
                    <td key={i}>{val !== null ? val.toString() : ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <div className="alert alert-info">No workouts found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
