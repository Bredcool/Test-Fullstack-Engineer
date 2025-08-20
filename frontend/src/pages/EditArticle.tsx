import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle } from "../services/api";
import ArticleForm from "../components/ArticleForm";

const EditArticle = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState({
        title: "",
        content: "",
        category: "",
        status: "",
    });

    useEffect(() => {
        const fetchArticle = async () => {
            const res = await getArticleById(Number(id));
            if (res.data) setInitialData(res.data); // karena endpoint GET /articles/:id return 1 objek
        };
        fetchArticle();
    }, [id]);

    const handleSubmit = async (data: any) => {
        await updateArticle(Number(id), data);
        navigate("/all-posts");
    };

    return (
        <div>
            <h1>Edit Article</h1>
            <ArticleForm initialData={initialData} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditArticle;
