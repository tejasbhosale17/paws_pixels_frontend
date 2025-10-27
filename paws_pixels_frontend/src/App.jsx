import { useState } from "react";

import "./App.css";
import Connect from "./components/Connect";
import Syncing from "./components/Syncing";
import Profile from "./components/Profile";
import Renditions from "./components/Renditions";
import Home from "./components/Home";
import DownloadPage from "./components/DownloadPage";
import DownloadImage from "./components/DownloadImage";
import FinalChanges from "./components/FinalChanges";

function App() {
  const [currentScreen, setCurrentScreen] = useState("connect");

  return (
    <>
      <div className="home">
        {/* <Home /> */}
        {/* <Connect /> */}
        {/* <Syncing /> */}
        {/* <Profile /> */}
        <FinalChanges />
        {/* <DownloadPage /> */}
        {/* <DownloadImage /> */}
        {/* <Renditions /> */}
      </div>
    </>
  );
}

export default App;
