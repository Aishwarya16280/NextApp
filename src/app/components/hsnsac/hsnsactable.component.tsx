'use client';

import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchHSNSAC, fetchHSNSACById } from '@/app/features/hsnsacSlice';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all community modules once before using AgGridReact
ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  // no change here
  editHSNSAC: (id: string) => void; // optional, if you want callback on edit click
}

const HSNSACTable: React.FC<Props> = ({ editHSNSAC }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { hsnsacList, loading } = useSelector((state: RootState) => state.hsnsac);

  // Fetch all HSNSAC entries once on mount
  useEffect(() => {
    if (!hsnsacList.length) {
      dispatch(fetchHSNSAC());
    }
  }, [dispatch, hsnsacList.length]);

  // Handler for edit icon click
  const onEditClick = (id: string) => {
    // Dispatch fetch single by ID
    dispatch(fetchHSNSACById(id));

    // Optional callback if parent wants to know about edit click
    if (editHSNSAC) {
      editHSNSAC(id);
    }
  };

  const columnDefs = [
    { headerName: 'Code', field: 'code', sortable: true, filter: true },
    { headerName: 'Short Description', field: 'shortDesc', sortable: true, filter: true },
    {
      headerName: 'Action',
      field: 'id',
      cellRenderer: (params: any) => (
        <button
          type="button"
          onClick={() => onEditClick(params.value)}
          className="text-blue-600 hover:text-blue-800"
          aria-label={`Edit HSNSAC ${params.value}`}
        >
          <FaEdit />
        </button>
      ),
      width: 100,
    },
  ];

  return (
    <section className="p-4 bg-gray-50 rounded shadow">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            rowData={hsnsacList}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>
      )}
    </section>
  );
};

export default HSNSACTable;
