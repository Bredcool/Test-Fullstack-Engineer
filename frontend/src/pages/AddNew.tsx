import { useNavigate } from "react-router-dom";
import { createArticle } from "../services/api";
import ArticleForm from "../components/ArticleForm";

const AddNew = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: { title: string; content: string; category: string; status: "published" | "draft" }) => {
        await createArticle(data);
        navigate("/all-posts");
    };

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Add New Article</h1>
            <ArticleForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddNew;
