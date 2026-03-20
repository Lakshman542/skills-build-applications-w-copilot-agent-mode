import React, { useEffect, useState } from 'react';

const getApiUrl = (component) => {
  // Try to extract codespace name from window.location.host
  let codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (!codespace) {
    const match = window.location.host.match(/^([^-]+)-8000\.app\.github\.dev/);
    if (match) codespace = match[1];
  }
  const protocol = window.location.protocol;
  const port = '8000';
  if (codespace) {
    return `${protocol}//${codespace}-${port}.app.github.dev/api/${component}/`;
  }
  // fallback for local dev
  return `${protocol}//localhost:${port}/api/${component}/`;
};

const Activities = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const endpoint = getApiUrl('activities');
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        const results = json.results || json;
        setData(results);
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities data:', results);
      });
  }, []);
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Activities</h2>
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
          {data.length === 0 && <div className="alert alert-info">No activities found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Activities;
