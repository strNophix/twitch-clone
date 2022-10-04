import { Routes, Route } from 'react-router-dom';

import BrowseLayout from './components/BrowseLayout';
import CategoryPage from './pages/CategoryPage';
import ChannelPage from './pages/ChannelPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<BrowseLayout />}>
        <Route path="/:channel" element={<ChannelPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/" element={<h1>Hi</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
