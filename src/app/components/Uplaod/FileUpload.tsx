'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setStatus(null);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {}, 
    multiple: true,
  });
  const handleSubmit = async () => {
    if (files.length === 0) {
      setStatus('Please select at least one file.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      setStatus('Uploading...');
      const res = await axios.post('http://localhost:5000/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('Upload successful!');
      console.log(res.data);
    } catch (err: any) {
      setStatus('Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow bg-white space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded cursor-pointer flex flex-col items-center justify-center text-center transition ${
          isDragActive ? 'bg-blue-100' : 'bg-gray-50'
        }`}
        style={{ borderColor: 'rgb(209,219,213)' }}
      >
        <input {...getInputProps()} />
        <FaUpload className="w-6 h-6 text-gray-500 mb-2" />
        <p className="text-gray-600 font-medium">Choose Files</p>
        <p className="text-xs text-gray-500">Drag & drop or click to upload any files (images, PDF, Excel, etc.)</p>
      </div>
      {files.length > 0 && (
        <ul className="text-sm text-gray-700 list-disc pl-5">
          {files.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Upload
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default FileUpload;
