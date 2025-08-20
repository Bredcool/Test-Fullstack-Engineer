import React, { useState, useEffect } from "react";

interface FormProps {
    initialData?: { title: string; content: string; category: string; status?: string };
    onSubmit: (data: { title: string; content: string; category: string; status: "published" | "draft" }) => void;
}

const ArticleForm: React.FC<FormProps> = ({ initialData, onSubmit }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(initialData?.category || "");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setCategory(initialData.category || "");
        }
    }, [initialData]);

    return (
        <div>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <button
                onClick={() => onSubmit({ title, content, category, status: "published" })}
            >
                Publish
            </button>
            <button
                onClick={() => onSubmit({ title, content, category, status: "draft" })}
            >
                Save as Draft
            </button>
        </div>
    );
};

export default ArticleForm;
