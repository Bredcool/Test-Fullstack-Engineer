import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div style={{ marginTop: "20px" }}>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        margin: "0 5px",
                        padding: "5px 10px",
                        backgroundColor: page === currentPage ? "#007bff" : "#f0f0f0",
                        color: page === currentPage ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default PaginationComponent;
