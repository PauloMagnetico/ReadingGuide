import VideoStreamPage from './pages/VideoStreamPage';
import NavBar from './components/NavBar';
// import Route from "./components/common/Route";
// switch to react-router-dom for github pages
import Footer from "./components/Footer"
import AdminPage from './pages/AdminPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='w-full max-w-lg mx-auto'>
      <NavBar />
      <div className="p-3 box-border bg-palette_1">
        <Router basename="/">
          <Routes>
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/" element={<VideoStreamPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App;
