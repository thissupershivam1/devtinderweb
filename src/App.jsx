import Navbar from "./components/Navbar"
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { appStore } from "./utils/appStore";
import Feed from "./components/Feed";
import Requests from "./components/Request";
import Connections from "./components/Connections";
import Chat from "./components/Chat";

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">

    <Routes>
      <Route path="/" element={<Body/>} >
           <Route path="/" element={<Feed/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/profile" element={<Profile/>} />
           <Route path="/requests" element={<Requests />} />
           <Route path="/connections" element={<Connections />} />
           <Route path="/chat/:targetUserId" element={<Chat />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>


      
    </>
  )
}

export default App
