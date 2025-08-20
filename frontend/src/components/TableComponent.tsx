import React from "react";

interface TableProps {
    data: any[];
    onEdit?: (id: number) => void;
    onTrash?: (id: number) => void;
    showTrash?: boolean;
}

const TableComponent: React.FC<TableProps> = ({ data, onEdit, onTrash, showTrash = true }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>
                            {onEdit && <button onClick={() => onEdit(item.id)}>✏️</button>}
                            {showTrash && onTrash && <button onClick={() => onTrash(item.id)}>🗑️</button>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
