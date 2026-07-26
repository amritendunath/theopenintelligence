import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import HomePage from './pages/HomePage';
import InsightsPage from './pages/InsightsPage';
import InsightPostPage from './pages/InsightPostPage';

function App() {
  return (
    <div className="min-h-screen">
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightPostPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
