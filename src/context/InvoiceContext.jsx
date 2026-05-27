import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const InvoiceContext = createContext();

const initialInvoiceState = {
  company: {
    logo: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    taxNumber: '',
    website: ''
  },
  customer: {
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    taxNumber: ''
  },
  details: {
    invoiceNumber: 'INV-0001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    currency: 'USD'
  },
  items: [
    { id: uuidv4(), description: 'Sample Item', quantity: 1, unitPrice: 100, taxRate: 0, amount: 100 }
  ],
  summary: {
    discount: 0,
    shipping: 0
  },
  extra: {
    notes: 'Thank you for your business.',
    terms: 'Please pay within 15 days of receiving this invoice.',
    signature: '',
    signatoryName: ''
  },
  settings: {
    template: 'modern'
  }
};

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState(initialInvoiceState);
  const [darkMode, setDarkMode] = useLocalStorage('theme_dark', false);
  const [isInvoiceConfirmed, setIsInvoiceConfirmed] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers for updating specific sections
  const updateCompany = (data) => setInvoice(prev => ({ ...prev, company: { ...prev.company, ...data } }));
  const updateCustomer = (data) => setInvoice(prev => ({ ...prev, customer: { ...prev.customer, ...data } }));
  const updateDetails = (data) => setInvoice(prev => ({ ...prev, details: { ...prev.details, ...data } }));
  const updateSummary = (data) => setInvoice(prev => ({ ...prev, summary: { ...prev.summary, ...data } }));
  const updateExtra = (data) => setInvoice(prev => ({ ...prev, extra: { ...prev.extra, ...data } }));
  const updateSettings = (data) => setInvoice(prev => ({ ...prev, settings: { ...prev.settings, ...data } }));

  // Items handlers
  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: uuidv4(), description: '', quantity: 1, unitPrice: 0, taxRate: 0, amount: 0 }]
    }));
  };

  const updateItem = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Auto calculate amount
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.amount = Number(updatedItem.quantity || 0) * Number(updatedItem.unitPrice || 0);
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const removeItem = (id) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Calculations
  const calculations = useMemo(() => {
    const subtotal = invoice.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const taxTotal = invoice.items.reduce((sum, item) => {
      const itemAmount = Number(item.amount) || 0;
      const taxRate = Number(item.taxRate) || 0;
      return sum + (itemAmount * (taxRate / 100));
    }, 0);
    
    const discountAmount = Number(invoice.summary.discount) || 0;
    const shippingAmount = Number(invoice.summary.shipping) || 0;
    
    const grandTotal = (subtotal - discountAmount) + taxTotal + shippingAmount;

    return {
      subtotal,
      taxTotal,
      grandTotal
    };
  }, [invoice.items, invoice.summary]);

  const resetInvoice = () => {
    if (window.confirm('Are you sure you want to reset all form data? This cannot be undone.')) {
      setInvoice({
        ...initialInvoiceState,
        details: {
          ...initialInvoiceState.details,
          invoiceNumber: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
        }
      });
      setIsInvoiceConfirmed(false);
    }
  };

  const contextValue = {
    invoice,
    darkMode,
    setDarkMode,
    updateCompany,
    updateCustomer,
    updateDetails,
    updateSummary,
    updateExtra,
    updateSettings,
    addItem,
    updateItem,
    removeItem,
    calculations,
    resetInvoice,
    isInvoiceConfirmed,
    setIsInvoiceConfirmed
  };

  return (
    <InvoiceContext.Provider value={contextValue}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);
