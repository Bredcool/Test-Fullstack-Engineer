import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import AddNew from "./pages/AddNew";
import EditArticle from "./pages/EditArticle";
import Preview from "./pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/all-posts" replace />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/add-new" element={<AddNew />} />
        <Route path="/edit/:id" element={<EditArticle />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
