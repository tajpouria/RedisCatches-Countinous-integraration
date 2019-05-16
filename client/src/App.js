import React from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const renderContent = () => {
    return <Home />;
  };

  return (
    <div className="App">
      <Navbar />
      {renderContent()}
    </div>
  );
}

export default App;
