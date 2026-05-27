import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function ModernTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-white text-gray-900 w-full h-full p-10 font-sans flex flex-col">
      {/* Header - Repeats minimally on subsequent pages */}
      <div className={`flex justify-between items-start border-b-2 border-primary-500 ${isFirstPage ? 'pb-8' : 'pb-4'}`}>
        <div className="w-1/2">
          {company.logo && isFirstPage ? (
            <img src={company.logo} alt="Company Logo" className="max-h-24 max-w-[200px] object-contain mb-4" />
          ) : isFirstPage && company.name ? (
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">{company.name}</h1>
          ) : null}
          
          {isFirstPage && (
            <div className="text-gray-600 text-sm flex flex-col gap-1">
              {company.address && <p className="whitespace-pre-wrap"><span className="font-semibold text-gray-500">Address:</span> <span className="text-gray-800">{company.address}</span></p>}
              {company.email && <p><span className="font-semibold text-gray-500">Email:</span> <span className="text-gray-800">{company.email}</span></p>}
              {company.phone && <p><span className="font-semibold text-gray-500">Phone:</span> <span className="text-gray-800">{company.phone}</span></p>}
              {company.taxNumber && <p><span className="font-semibold text-gray-500">Tax ID:</span> <span className="text-gray-800">{company.taxNumber}</span></p>}
              {company.website && <p><span className="font-semibold text-gray-500">Website:</span> <span className="text-gray-800">{company.website}</span></p>}
            </div>
          )}
        </div>
        <div className="text-right w-1/2">
          <h2 className="text-5xl font-black text-gray-200 uppercase tracking-widest mb-4">INVOICE</h2>
          <div className="flex flex-col gap-1 text-sm">
            <p><span className="font-semibold text-gray-500">Invoice No:</span> <span className="font-medium">{details.invoiceNumber}</span></p>
            <p><span className="font-semibold text-gray-500">Date:</span> <span className="font-medium">{details.invoiceDate}</span></p>
            {isFirstPage && (
              <p><span className="font-semibold text-gray-500">Due Date:</span> <span className="font-medium">{details.dueDate}</span></p>
            )}
          </div>
        </div>
      </div>

      {/* Bill To - Only on first page */}
      {isFirstPage && (
        <div className="mt-8 mb-8">
          <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">Bill To:</h3>
          <div className="text-gray-800 text-sm flex flex-wrap mt-2 -mx-4">
            <p className="w-full sm:w-1/2 px-4 pb-2"><span className="font-semibold text-gray-500">Customer Name:</span> <span className="font-bold text-lg">{customer.name || 'Customer Name'}</span></p>
            {customer.company && <p className="w-full sm:w-1/2 px-4 pb-2"><span className="font-semibold text-gray-500">Company:</span> <span className="font-medium">{customer.company}</span></p>}
            {customer.address && <p className="w-full sm:w-1/2 px-4 pb-2 whitespace-pre-wrap"><span className="font-semibold text-gray-500">Address:</span> <span className="text-gray-600">{customer.address}</span></p>}
            {customer.email && <p className="w-full sm:w-1/2 px-4 pb-2"><span className="font-semibold text-gray-500">Email:</span> <span className="text-gray-600">{customer.email}</span></p>}
            {customer.phone && <p className="w-full sm:w-1/2 px-4 pb-2"><span className="font-semibold text-gray-500">Phone:</span> <span className="text-gray-600">{customer.phone}</span></p>}
            {customer.taxNumber && <p className="w-full sm:w-1/2 px-4 pb-2"><span className="font-semibold text-gray-500">Tax ID:</span> <span className="text-gray-600">{customer.taxNumber}</span></p>}
          </div>
        </div>
      )}

      {/* Spacer for non-first pages to balance layout */}
      {!isFirstPage && <div className="mt-8"></div>}

      {/* Items Table - Render the specific chunk for this page */}
      <div className="flex-1">
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="bg-primary-50 text-primary-800">
              <th className="py-3 px-4 text-sm font-semibold w-1/2">Description</th>
              <th className="py-3 px-4 text-sm font-semibold text-center w-[15%]">Qty</th>
              <th className="py-3 px-4 text-sm font-semibold text-right w-[15%]">Price</th>
              <th className="py-3 px-4 text-sm font-semibold text-right w-[20%]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {itemsChunk.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-800">{item.description || '-'}</td>
                <td className="py-3 px-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-sm text-gray-600 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-800 text-right">{Number(item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals & Notes - Only on last page */}
      {isLastPage && (
        <div className="flex justify-between items-start mt-auto pt-8">
          <div className="w-1/2 pr-8">
            {(extra.notes || extra.terms) && (
              <div className="text-sm text-gray-600 flex flex-col gap-4">
                {extra.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Notes</h4>
                    <p className="whitespace-pre-wrap">{extra.notes}</p>
                  </div>
                )}
                {extra.terms && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Terms & Conditions</h4>
                    <p className="whitespace-pre-wrap">{extra.terms}</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Signature */}
            {(extra.signature || extra.signatoryName) && (
              <div className="mt-8 w-48">
                {extra.signature ? (
                  <img src={extra.signature} alt="Signature" className="w-full h-auto max-h-24 object-contain border-b border-gray-300 pb-2 mb-2" />
                ) : (
                  <div className="border-b border-gray-300 pb-2 mb-2 text-center">
                    <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 font-medium text-center uppercase tracking-widest">Authorized Signature</p>
              </div>
            )}
          </div>

          <div className="w-1/2 sm:w-[40%]">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{calculations.subtotal.toFixed(2)}</span>
              </div>
              {Number(summary.discount) > 0 && (
                <div className="flex justify-between mb-2 text-sm text-red-500">
                  <span>Discount</span>
                  <span>-{Number(summary.discount).toFixed(2)}</span>
                </div>
              )}
              {calculations.taxTotal > 0 && (
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Tax</span>
                  <span>{calculations.taxTotal.toFixed(2)}</span>
                </div>
              )}
              {Number(summary.shipping) > 0 && (
                <div className="flex justify-between mb-4 text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{Number(summary.shipping).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-xl font-black text-primary-600">
                  {details.currency} {calculations.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
