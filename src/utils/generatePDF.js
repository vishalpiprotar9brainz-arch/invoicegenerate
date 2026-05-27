import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (containerId, filename = 'invoice.pdf') => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id ${containerId} not found`);
    return;
  }

  const pages = container.querySelectorAll('.invoice-page');
  if (pages.length === 0) {
    console.error('No pages found to generate PDF');
    return;
  }

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Ensure all Google fonts are fully loaded before capturing
    await document.fonts.ready;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      // Save original styles that might affect capturing
      const originalTransform = page.style.transform;
      const originalWidth = page.style.width;
      const originalMaxWidth = page.style.maxWidth;
      
      // Temporarily force exact A4 pixel width (794px @ 96dpi) so mobile screens don't cause text wrapping/oversizing
      page.style.width = '794px';
      page.style.maxWidth = '794px';
      page.style.transform = 'none';

      const canvas = await html2canvas(page, {
        scale: 3, // High resolution for sharp text
        useCORS: true, 
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff', 
        windowWidth: 794,
      });

      // Restore original styles
      page.style.transform = originalTransform;
      page.style.width = originalWidth;
      page.style.maxWidth = originalMaxWidth;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      // Add a new page to PDF if it's not the first page
      if (i > 0) {
        pdf.addPage();
      }

      // Add the captured image, filling the entire A4 page perfectly
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
