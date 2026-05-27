import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import FileUpload from '../ui/FileUpload';

export default function ExtraDetailsSection() {
  const { invoice, updateExtra } = useInvoice();

  const handleChange = (e) => {
    updateExtra({ [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notes & Terms</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="label-text">Notes / Payment Instructions</label>
            <textarea 
              name="notes" 
              value={invoice.extra.notes} 
              onChange={handleChange} 
              rows="3" 
              className="input-field resize-none" 
              placeholder="It was great doing business with you." 
            />
          </div>
          <div>
            <label className="label-text">Terms & Conditions</label>
            <textarea 
              name="terms" 
              value={invoice.extra.terms} 
              onChange={handleChange} 
              rows="2" 
              className="input-field resize-none" 
              placeholder="Payment is due within 15 days." 
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Signature Options</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Option 1: Upload Signature</label>
              <FileUpload 
                label="Signature Image (Optional)"
                value={invoice.extra.signature}
                onChange={(val) => updateExtra({ signature: val })}
                onRemove={() => updateExtra({ signature: '' })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Option 2: Type Name</label>
              <div className="flex-1 flex flex-col justify-start mt-2">
                <input type="text" name="signatoryName" value={invoice.extra.signatoryName || ''} onChange={handleChange} className="input-field" placeholder="Enter Signatory Name" />
                <p className="text-xs text-gray-500 mt-2">If no image is uploaded, this name will be displayed as an authorized signature.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
