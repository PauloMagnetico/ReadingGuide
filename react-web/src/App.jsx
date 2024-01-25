import VideoStreamPage from './pages/VideoStreamPage';
import NavBar from './components/NavBar';
import Route from "./components/common/Route";
import Footer from "./components/Footer"
import InfoPage from './pages/InfoPage';

function App() {

  return (
    <div className='w-full max-w-lg mx-auto'>
      <NavBar />
      <div className="rounded p-3 box-border">
        <Route path="/infoPage">
          <InfoPage />
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
