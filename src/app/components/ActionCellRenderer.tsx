import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { FaEdit } from 'react-icons/fa';

interface ActionCellRendererProps extends ICellRendererParams {
  onEditClick: (rowIndex: number) => void;
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = (props) => {
  const { onEditClick, node } = props;

  const handleClick = () => {
    if (node && typeof node.rowIndex === 'number') {
      onEditClick(node.rowIndex);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 hover:text-blue-800"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      title="Edit"
    >
      <FaEdit />
    </button>
  );
};

export default ActionCellRenderer;
