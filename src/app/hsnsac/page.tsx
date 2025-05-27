'use client';

import React, { useState } from 'react';
import HSNSACModalForm from '../components/hsnsac/hsnsacmodalform.component';
import HSNSACTable from '../components/hsnsac/hsnsactable.component';

const HSNSAC = () => {
  const [openHSNSACModalForm, setOpenHSNSACModalForm] = useState(false);
  const [hsnsacModalFormTitle, setHsnSacModalFormTitle] = useState('Add HSNSAC');
  const [hsnsacId, setHsnSacId] = useState<string | null>(null);

  const displayHSNSACModalForm = async (id: string | null) => {
    if (id) {
      setHsnSacModalFormTitle('Edit HSNSAC');
    } else {
      setHsnSacModalFormTitle('Add HSNSAC');
    }

    setHsnSacId(id);
    setOpenHSNSACModalForm(true);
  };

  return (
    <>
      <div className="main-content">
        <button
          className="mx-auto my-3 e-outline"
          type="button"
          onClick={() => displayHSNSACModalForm(null)}
        >
          + Add HSNSAC
        </button>

        <HSNSACModalForm
          title={hsnsacModalFormTitle}
          hsnsacId={hsnsacId}
          isModalFormOpen={openHSNSACModalForm}
          closeModalForm={() => setOpenHSNSACModalForm(false)}
        />

<HSNSACTable editHSNSAC={(id) => {
  setHsnSacId(id);
  setHsnSacModalFormTitle('Edit HSNSAC');
  setOpenHSNSACModalForm(true);
}} />
      </div>
    </>
  );
};

export default HSNSAC;
