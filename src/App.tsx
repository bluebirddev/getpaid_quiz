import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { HomePage } from './pages/Home';
import { QuizPage } from './pages/Quiz';
import Setup from './Setup';
import { ThankYou } from './pages/ThankYou';
import { EmailConfirmed } from './pages/EmailConfirmed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Setup />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/thank-you" element={<ThankYou loading={false} error={false} />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
