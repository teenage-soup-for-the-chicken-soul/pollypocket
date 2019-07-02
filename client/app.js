import React from 'react';
import Routes from './routes';
import Navbar from './Components/navbar';
import Footer from './Components/footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <Routes />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default App;
