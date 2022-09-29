import { Routes, Route } from "react-router-dom";
import BrowseLayout from "./components/BrowseLayout";
import CategoryPage from "./pages/CategoryPage";
import ChannelPage from "./pages/ChannelPage";

function App() {
  return (
    <Routes>
      <Route element={<BrowseLayout />}>
        <Route path="/:channel" element={<ChannelPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/" element={<h1>Hi</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
