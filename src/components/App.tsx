import React from 'react';
import Button from 'shared/button/button';
import './App.css';

const App = () => {
  return (
    <div className="div">
      Zdarove
      <button role="heading" disabled>
        Privet
      </button>
      <Button />
    </div>
  );
};

export default App;
