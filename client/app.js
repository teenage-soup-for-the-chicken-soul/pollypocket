import React from 'react';
import Routes from './routes';
import Navbar from './components/navbar';
import Footer from './components/footer';

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
