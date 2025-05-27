'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addHSNSAC, modifiedHSNSAC } from '@/app/features/hsnsacSlice';

interface Props {
  title: string;
  hsnsacId: string | null;
  isModalFormOpen: boolean;
  closeModalForm: () => void;
}

const HSNSACModalForm: React.FC<Props> = ({
  title,
  hsnsacId,
  isModalFormOpen,
  closeModalForm,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const hsnsacList = useSelector((state: RootState) => state.hsnsac.hsnsacList);

  const [form, setForm] = useState({ code: '', shortDesc: '' });

  useEffect(() => {
    if (hsnsacId) {
      const item = hsnsacList.find((h) => h.id === hsnsacId);
      if (item) {
        setForm({ code: item.code, shortDesc: item.shortDesc });
      }
    } else {
      setForm({ code: '', shortDesc: '' });
    }
  }, [hsnsacId, isModalFormOpen, hsnsacList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hsnsacId) {
      dispatch(modifiedHSNSAC({ id: hsnsacId, ...form }));
      alert('Updated successfully!');
    } else {
      dispatch(addHSNSAC(form));
      alert('Added successfully!');
    }
    closeModalForm();
  };

  if (!isModalFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-96 space-y-4"
      >
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <div>
          <label className="block">Code</label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">Short Description</label>
          <input
            type="text"
            value={form.shortDesc}
            onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModalForm}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HSNSACModalForm;
