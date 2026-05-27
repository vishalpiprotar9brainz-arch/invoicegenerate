import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function CorporateTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-white text-gray-900 w-full h-full p-10 font-sans flex flex-col border-t-8 border-gray-800">
      
      {/* Header - Shown on all pages, minimal on subsequent */}
      <div className={`flex justify-between items-center ${isFirstPage ? 'mb-10' : 'mb-4'}`}>
        <div className="w-1/2">
          {company.logo && isFirstPage ? (
            <img src={company.logo} alt="Company Logo" className="max-h-20 max-w-[200px] object-contain" />
          ) : isFirstPage && company.name ? (
            <h1 className="text-3xl font-black text-gray-900 tracking-wider uppercase">{company.name}</h1>
          ) : null}
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-light text-gray-400 uppercase tracking-widest mb-1">INVOICE</h2>
          <p className="text-lg font-medium text-gray-800">{details.invoiceNumber}</p>
        </div>
      </div>

      {isFirstPage && (
        <div className="flex justify-between mb-10 gap-4">
          <div className="w-[30%]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">From</h3>
            <div className="text-sm flex flex-col gap-1">
              <p><span className="font-bold text-gray-500 w-24 inline-block">Company Name:</span> <span className="font-bold text-gray-800">{company.name}</span></p>
              {company.address && <p className="whitespace-pre-wrap flex"><span className="font-bold text-gray-500 w-24 inline-block shrink-0">Address:</span> <span className="text-gray-700">{company.address}</span></p>}
              {company.email && <p><span className="font-bold text-gray-500 w-24 inline-block">Email:</span> <span className="text-gray-700">{company.email}</span></p>}
              {company.phone && <p><span className="font-bold text-gray-500 w-24 inline-block">Phone:</span> <span className="text-gray-700">{company.phone}</span></p>}
              {company.taxNumber && <p><span className="font-bold text-gray-500 w-24 inline-block">Tax ID:</span> <span className="text-gray-700">{company.taxNumber}</span></p>}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Bill To</h3>
            <div className="text-sm flex flex-wrap mt-2 -mx-2">
              <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-500 w-24 inline-block">Customer Name:</span> <span className="font-bold text-gray-800">{customer.name || 'Customer Name'}</span></p>
              {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-500 w-24 inline-block">Company:</span> <span className="text-gray-700">{customer.company}</span></p>}
              {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 whitespace-pre-wrap flex"><span className="font-bold text-gray-500 w-24 inline-block shrink-0">Address:</span> <span className="text-gray-700">{customer.address}</span></p>}
              {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-500 w-24 inline-block">Email:</span> <span className="text-gray-700">{customer.email}</span></p>}
              {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-500 w-24 inline-block">Phone:</span> <span className="text-gray-700">{customer.phone}</span></p>}
              {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-500 w-24 inline-block">Tax ID:</span> <span className="text-gray-700">{customer.taxNumber}</span></p>}
            </div>
          </div>
          <div className="w-[20%] text-right flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date of Issue</p>
              <p className="text-sm font-medium">{details.invoiceDate}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</p>
              <p className="text-sm font-medium">{details.dueDate}</p>
            </div>
          </div>
        </div>
      )}

      {!isFirstPage && <div className="mt-8"></div>}

      <div className="flex-1">
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="bg-gray-100 border-y border-gray-300">
              <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Qty</th>
              <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Price</th>
              <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {itemsChunk.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 px-4 text-sm text-gray-800">{item.description || '-'}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">{Number(item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLastPage && (
        <div className="flex justify-between items-start mt-auto pt-8">
          <div className="w-1/2 pr-8">
            {(extra.notes || extra.terms) && (
              <div className="text-sm text-gray-600">
                {extra.notes && (
                  <div className="mb-4">
                    <p className="font-bold text-gray-800 mb-1">Notes</p>
                    <p className="whitespace-pre-wrap">{extra.notes}</p>
                  </div>
                )}
                {extra.terms && (
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Terms & Conditions</p>
                    <p className="whitespace-pre-wrap">{extra.terms}</p>
                  </div>
                )}
              </div>
            )}
            
            {(extra.signature || extra.signatoryName) && (
              <div className="mt-8 w-48 text-center">
                {extra.signature ? (
                  <img src={extra.signature} alt="Signature" className="w-full h-auto max-h-20 object-contain mb-2" />
                ) : (
                  <div className="mb-2">
                    <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                  </div>
                )}
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Authorized Signature</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-[40%]">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-600">Subtotal</td>
                  <td className="py-1 text-right font-medium">{calculations.subtotal.toFixed(2)}</td>
                </tr>
                {Number(summary.discount) > 0 && (
                  <tr>
                    <td className="py-1 text-gray-600">Discount</td>
                    <td className="py-1 text-right font-medium text-red-600">-{Number(summary.discount).toFixed(2)}</td>
                  </tr>
                )}
                {calculations.taxTotal > 0 && (
                  <tr>
                    <td className="py-1 text-gray-600">Tax</td>
                    <td className="py-1 text-right font-medium">{calculations.taxTotal.toFixed(2)}</td>
                  </tr>
                )}
                {Number(summary.shipping) > 0 && (
                  <tr>
                    <td className="py-1 text-gray-600">Shipping</td>
                    <td className="py-1 text-right font-medium">{Number(summary.shipping).toFixed(2)}</td>
                  </tr>
                )}
                <tr className="border-t-2 border-gray-800 font-bold text-lg">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">{details.currency} {calculations.grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
