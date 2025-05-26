'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, User } from '../features/usersSlice';
import { AppDispatch, RootState } from '@/store';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule  } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaEdit } from 'react-icons/fa';
import ActionCellRenderer from '../components/ActionCellRenderer';
ModuleRegistry.registerModules([AllCommunityModule]);
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Memoize handleEdit so columnDefs memo doesn't break
  const handleEdit = useCallback((user: User) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setIsModalOpen(true);
  }, []);

  const handleAdd = () => {
    setFormData({ name: '', email: '', role: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      dispatch(updateUser({ id: editingId, ...formData }));
    } else {
      dispatch(addUser(formData));
    }
    setIsModalOpen(false);
  };

  const columnDefs = useMemo(() => [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true, filter: true },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true, filter: true },
    { field: 'role', headerName: 'Role', flex: 1, sortable: true, filter: true },
    {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: ActionCellRenderer,
        cellRendererParams: {
          onEditClick: (rowIndex: number) => {
            const user = users[rowIndex];
            setFormData({ name: user.name, email: user.email, role: user.role });
            setEditingId(user.id);
            setIsModalOpen(true);
          },
        },
        width: 100,
      },      
      
  ], [handleEdit]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 w-full">
    <div className="w-full max-w-5xl flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">User Table</h1>
    <button
      onClick={handleAdd}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add User
    </button>
  </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="ag-theme-alpine w-full max-w-5xl" style={{ height: 400 }}>
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressRowClickSelection={true}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null ? 'Edit User' : 'Add User'}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
