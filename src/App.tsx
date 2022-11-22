import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Me from "./components/Me";
import ShoutoutList from "./components/ShoutoutList";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ShoutoutList />} />
          <Route path="/user/:name" element={<ShoutoutList />} />
          <Route path="/me" element={<Me />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
