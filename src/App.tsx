import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Layout from './components/Layout';
import Setup from './Setup';
import { AuthWrapper } from './AuthWrapper';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Setup />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<AuthWrapper />}>
              <Route index element={<Admin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
