import VideoStreamPage from './pages/VideoStreamPage';
import NavBar from './components/NavBar';
import AdminPage from './pages/AdminPage';
import AlertPage from "./pages/AlertPage";
import Route from "./components/common/Route";
import Footer from "./components/Footer"

function App() {

  return (
    <div className='w-full max-w-lg mx-auto'>
      <NavBar />
      <div className="rounded p-3 box-border">
        <Route path="/">
          <VideoStreamPage />
        </Route>
        <Route path="/adminpage">
          <AdminPage />
        </Route>
        <Route path="/alertpage">
          <AlertPage />
        </Route>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
