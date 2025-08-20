import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, trashArticle } from "../services/api";
import TableComponent from "../components/TableComponent";
import PaginationComponent from "../components/PaginationComponent";

const tabs = ["published", "draft", "trashed"];
const perPage = 5; // jumlah artikel per halaman

const AllPosts = () => {
    const [activeTab, setActiveTab] = useState("published");
    const [articles, setArticles] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const fetchArticles = async (status: string) => {
        try {
            const res = await getArticles(status);
            setArticles(res?.data ?? []);
        } catch (err) {
            console.error("Error fetching articles:", err);
            setArticles([]);
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchArticles(activeTab);
    }, [activeTab]);

    const handleEdit = (id: number) => navigate(`/edit/${id}`);
    const handleTrash = async (id: number) => {
        await trashArticle(id);
        fetchArticles(activeTab);
    };

    const totalPages = Math.ceil((articles ?? []).length / perPage);
    const currentArticles = (articles ?? []).slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return (
        <div style={{ textAlign: "center", marginLeft: 600 }}>
            <h1>All Posts</h1>

            {/* Tombol Add New */}
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", maxWidth: "800px", margin: "0 auto" }}>
                <div>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                marginRight: "10px",
                                padding: "5px 10px",
                                backgroundColor: activeTab === tab ? "#007bff" : "#f0f0f0",
                                color: activeTab === tab ? "#fff" : "#000",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => navigate("/add-new")}
                    style={{
                        padding: "5px 15px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                >
                    + Add New
                </button>
            </div>

            {/* Tabel Artikel */}
            {(articles ?? []).length > 0 ? (
                <TableComponent
                    data={currentArticles}
                    onEdit={handleEdit}
                    onTrash={activeTab !== "trashed" ? handleTrash : undefined}
                    showTrash={activeTab !== "trashed"}
                />
            ) : (
                <p>Tidak ada artikel di tab <strong>{activeTab}</strong></p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={page => setCurrentPage(page)}
                />
            )}
        </div>
    );
};

export default AllPosts;
