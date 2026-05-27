import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { LayoutTemplate } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'freelancer', name: 'Freelancer' },
  { id: 'modern-pro', name: 'Modern Pro' },
  { id: 'business-elite', name: 'Business Elite' },
  { id: 'startup', name: 'Startup' },
  { id: 'agency', name: 'Agency' },
  { id: 'executive', name: 'Executive' },
  { id: 'minimal-clean', name: 'Minimal Clean' },
];

export default function TemplateSelector() {
  const { invoice, updateSettings } = useInvoice();

  return (
    <div id="template-selector" className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300 scroll-mt-28">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
        <LayoutTemplate size={20} className="text-primary-500" />
        <span>Template:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => updateSettings({ template: tpl.id })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              invoice.settings.template === tpl.id
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tpl.name}
          </button>
        ))}
      </div>
    </div>
  );
}
