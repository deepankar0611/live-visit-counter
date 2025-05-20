import React from 'react';
import { Link } from 'react-router-dom';

function Page2() {
  return (
    <div className="content-area">
      <h2>Page 2</h2>
      <p>This is a placeholder for page 2.</p>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Link to="/page1"><button>Go to Page 1</button></Link>
      </div>
    </div>
  );
}

export default Page2; 