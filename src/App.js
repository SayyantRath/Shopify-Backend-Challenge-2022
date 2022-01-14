import { Routes, Route, Link } from "react-router-dom";
import { Divider } from "@mui/material";
import Home from "./pages/Home";

import "./App.css";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <div
        style={{
          width: "100vw",
          height: "5vw",
          display: "flex",
          flexDirection: "start",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginLeft: "3%" }}
          component={Link}
          to="/"
        >
          Home
        </Button>
      </div>
      <Divider sx={{width: "100%"}}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
