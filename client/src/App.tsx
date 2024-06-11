import VideoStreamPage from './pages/VideoStreamPage';
import NavBar from './components/NavBar';
// import Route from "./components/common/Route";
// switch to react-router-dom for github pages
import Footer from "./components/Footer"
import AdminPage from './pages/AdminPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { wakeUpServer } from './api/wakeUpServer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  //Load the server, can take a while when container is sleeping
  const loadServer = async () => {
    setIsLoading(true);
    const result = await wakeUpServer();
    if (result.success) {
      setIsLoading(false);
    } else {
      console.error('Error waking up server:', result.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServer();
  }, [])

  return (
    <div className='w-full max-w-lg mx-auto'>
      <NavBar />
      <div className="p-3 bg-palette_1">
        <Router basename="/">
          <Routes>
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/" element={<VideoStreamPage isLoading={isLoading} />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div> 
  )
}

export default App;
