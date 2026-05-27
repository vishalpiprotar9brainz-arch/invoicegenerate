import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useInvoice } from '../../context/InvoiceContext';

export default function ItemsTable() {
  const { invoice, addItem, updateItem, removeItem, calculations } = useInvoice();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Items</h3>
      
      <div className="hidden sm:flex w-full text-left border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 pb-2">
        <div className="w-full sm:w-[40%] pr-2">Item Description</div>
        <div className="w-[15%] pr-2">Qty</div>
        <div className="w-[15%] pr-2">Price</div>
        <div className="w-[15%] pr-2">Tax %</div>
        <div className="w-[10%] text-right pr-2">Amount</div>
        <div className="w-[5%]"></div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-0">
        {invoice.items.map((item, index) => (
          <div key={item.id} className="flex flex-col sm:flex-row border border-gray-200 sm:border-0 sm:border-b sm:border-gray-100 dark:border-gray-800 rounded-lg sm:rounded-none p-3 sm:p-0 last:border-b-0 group gap-3 sm:gap-0">
            
            <div className="w-full sm:w-[40%] sm:py-3 sm:pr-2">
              <label className="block sm:hidden text-xs font-medium text-gray-500 mb-1">Description</label>
              <input
                type="text"
                required
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="input-field"
                placeholder="Item description"
              />
            </div>
            
            <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-[60%] gap-3 sm:gap-0">
              <div className="flex-1 sm:w-[25%] sm:py-3 sm:pr-2">
                <label className="block sm:hidden text-xs font-medium text-gray-500 mb-1">Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="flex-1 sm:w-[25%] sm:py-3 sm:pr-2">
                <label className="block sm:hidden text-xs font-medium text-gray-500 mb-1">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="flex-1 sm:w-[25%] sm:py-3 sm:pr-2">
                <label className="block sm:hidden text-xs font-medium text-gray-500 mb-1">Tax %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={item.taxRate}
                  onChange={(e) => updateItem(item.id, 'taxRate', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div className="w-full sm:w-[16%] sm:py-3 sm:pr-2 flex sm:block justify-between items-center sm:text-right font-medium text-gray-900 dark:text-gray-100 mt-2 sm:mt-0">
                <span className="block sm:hidden text-sm font-medium text-gray-500">Total:</span>
                <span>{Number(item.amount).toFixed(2)}</span>
              </div>
              
              <div className="w-full sm:w-[8%] sm:py-3 text-right border-t border-gray-100 sm:border-0 pt-2 sm:pt-0 mt-2 sm:mt-0">
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={invoice.items.length === 1}
                  className="w-full sm:w-auto flex justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 sm:hover:bg-transparent rounded-md disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="btn-secondary self-start gap-2 mt-2"
      >
        <Plus size={16} />
        Add Item
      </button>
    </section>
  );
}
