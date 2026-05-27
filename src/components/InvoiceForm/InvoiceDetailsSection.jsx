import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
];

export default function InvoiceDetailsSection() {
  const { invoice, updateDetails } = useInvoice();

  const handleChange = (e) => {
    updateDetails({ [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Invoice Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Invoice Number <span className="text-red-500">*</span></label>
          <input type="text" name="invoiceNumber" value={invoice.details.invoiceNumber} onChange={handleChange} required className="input-field" placeholder="INV-0001" />
        </div>
        <div>
          <label className="label-text">Currency</label>
          <select name="currency" value={invoice.details.currency} onChange={handleChange} className="input-field">
            {currencies.map(c => (
              <option key={c.code} value={c.code}>{c.code} ({c.symbol}) - {c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text">Invoice Date <span className="text-red-500">*</span></label>
          <input type="date" name="invoiceDate" value={invoice.details.invoiceDate} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label className="label-text">Due Date <span className="text-red-500">*</span></label>
          <input type="date" name="dueDate" value={invoice.details.dueDate} onChange={handleChange} required className="input-field" />
        </div>
      </div>
    </section>
  );
}
