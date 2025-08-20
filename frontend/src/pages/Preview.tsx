import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import PaginationComponent from "../components/PaginationComponent";

const Preview = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        const fetchPublished = async () => {
            const res = await getArticles("publish");
            setArticles(res.data);
        };
        fetchPublished();
    }, []);

    const totalPages = Math.ceil(articles.length / perPage);
    const currentArticles = articles.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div>
            <h1>Preview Articles</h1>
            {currentArticles.map(article => (
                <div key={article.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <small>Category: {article.category}</small>
                </div>
            ))}

            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
};

export default Preview;
