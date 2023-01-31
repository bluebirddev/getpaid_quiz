import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Setup from './Setup';
import { Hello } from './pages/Hello';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Setup />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/hello" element={<Hello />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
