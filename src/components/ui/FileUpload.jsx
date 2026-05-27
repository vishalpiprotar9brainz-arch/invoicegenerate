import React from 'react';
import { Upload, X } from 'lucide-react';

export default function FileUpload({ label, value, onChange, onRemove }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="label-text">{label}</label>
      
      {value ? (
        <div className="relative inline-block w-max">
          <img 
            src={value} 
            alt="Uploaded Preview" 
            className="h-16 w-auto object-contain rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
            <Upload size={20} className="mb-2" />
            <p className="text-sm font-semibold">Click to upload {label.toLowerCase()}</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
}
