import axios from "axios";

const API_URL = "http://localhost:5000"; // backend fiber

// Get semua artikel (option: filter by status)
export const getArticles = async (status?: string) => {
    const url = status ? `${API_URL}/articles?status=${status}` : `${API_URL}/articles`;
    return await axios.get(url);
};

export const getArticleById = async (id: number) => {
    return await axios.get(`${API_URL}/articles/${id}`);
};

export const createArticle = async (data: {
    title: string;
    content: string;
    category: string;
    status: string;
}) => {
    return await axios.post(`${API_URL}/articles`, data);
};

export const updateArticle = (id: number, data: Partial<{
    title: string;
    content: string;
    category: string;
    status: string;
}>) => axios.put(`${API_URL}/articles/${id}`, data);

export const trashArticle = async (id: number) => {
    return await axios.delete(`${API_URL}/articles/${id}`);
};

export const publishArticle = (id: number) => updateArticle(id, { status: "published" });
export const draftArticle = (id: number) => updateArticle(id, { status: "draft" });
