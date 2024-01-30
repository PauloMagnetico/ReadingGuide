import VideoStreamPage from './pages/VideoStreamPage';
import NavBar from './components/NavBar';
import Route from "./components/common/Route";
import Footer from "./components/Footer"
import InfoPage from './pages/InfoPage';
import AdminPage from './pages/AdminPage';

function App() {

  return (
    <div className='w-full max-w-lg mx-auto'>
      <NavBar />
      <div className="p-3 box-border bg-palette_1">
        <Route path="/infoPage">
          <InfoPage />
        </Route>
        <Route path="/adminPage">
          <AdminPage />
        </Route>
        <Route path="/">
          <VideoStreamPage />
        </Route>
      </div>
      <Footer />
    </div>
  )
}

export default App;
