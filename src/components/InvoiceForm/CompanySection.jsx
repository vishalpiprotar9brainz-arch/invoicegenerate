import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import FileUpload from '../ui/FileUpload';

export default function CompanySection() {
  const { invoice, updateCompany } = useInvoice();

  const handleChange = (e) => {
    updateCompany({ [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">From (Your Company)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Option 1: Upload Logo</label>
          <FileUpload 
            label="Upload Company Logo"
            value={invoice.company.logo}
            onChange={(val) => updateCompany({ logo: val })}
            onRemove={() => updateCompany({ logo: '' })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Option 2: Company Name Text</label>
          <div className="flex-1 flex flex-col justify-center">
            <label className="label-text">Company Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={invoice.company.name} onChange={handleChange} required className="input-field" placeholder="Enter Company Name" />
            <p className="text-xs text-gray-500 mt-2">If no logo is uploaded, this text will be prominently displayed as your brand.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label className="label-text">Your Email <span className="text-red-500">*</span></label>
          <input type="email" name="email" value={invoice.company.email} onChange={handleChange} required className="input-field" placeholder="billing@acmecorp.com" />
        </div>
        <div>
          <label className="label-text">Phone Number</label>
          <input type="text" name="phone" value={invoice.company.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          <label className="label-text">Website</label>
          <input type="text" name="website" value={invoice.company.website} onChange={handleChange} className="input-field" placeholder="https://acmecorp.com" />
        </div>
        <div className="md:col-span-2">
          <label className="label-text">Address</label>
          <textarea name="address" value={invoice.company.address} onChange={handleChange} rows="2" className="input-field resize-none" placeholder="123 Business Rd&#10;City, State, Zip" />
        </div>
        <div className="md:col-span-2">
          <label className="label-text">GST/VAT Number (Optional)</label>
          <input type="text" name="taxNumber" value={invoice.company.taxNumber} onChange={handleChange} className="input-field" placeholder="TAX-12345678" />
        </div>
      </div>
    </section>
  );
}
