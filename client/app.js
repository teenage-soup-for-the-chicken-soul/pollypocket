import React from 'react';
import Routes from './routes';
import Navbar from './Components/navbar';
import Footer from './Components/footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
