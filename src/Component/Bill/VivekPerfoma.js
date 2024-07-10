import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const VivekProformaInvoice = () => {
    const dispatch = useDispatch();
    const performa = useSelector((state) => state.performa);

    const invoiceRef = useRef(null);

    const downloadInvoice = () => {
        const invoiceElement = invoiceRef.current;
        const scale = 2; // Increase scale for higher resolution

        html2canvas(invoiceElement, {
            scale: scale,
            dpi: 300, // Set DPI (optional)
            logging: true // Enable logging for debugging (optional)
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 10.0); // Use image/png for better quality
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, width, height, '', 'FAST');
            pdf.save('VivekBholeproforma_invoice.pdf');
        });
    };

    function splitTextIntoLines(text, wordsPerLine) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach((word, index) => {
            if (currentLine.split(' ').length >= wordsPerLine) {
                lines.push(currentLine.trim());
                currentLine = '';
            }
            currentLine += (currentLine ? ' ' : '') + word;
        });

        if (currentLine.trim().length > 0) {
            lines.push(currentLine.trim());
        }

        return lines;
    }


    return (
        <div>
            <div ref={invoiceRef}
                style={{
                    fontFamily: 'Arial, sans-serif',
                    width: '210mm', // A4 width
                    minHeight: '297mm', // A4 height
                    margin: 'auto',
                    border: '1px solid black',
                    padding: '10mm',
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5', // Light grey background color
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '0', border: '1px solid black', padding: '5px' }}>
                    <h3>PROFORMA INVOICE</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0' }}>
                    <div style={{ width: '75%', border: '1px solid black', padding: '10px' }}>
                        <p>
                            <strong>Company Name :</strong> {performa.companyName}
                        </p>
                        <p>
                            <strong>Company Pan No. :</strong> {performa.companyPanNo}
                        </p>
                        <p>
                            <strong>State :</strong> {performa.state}
                        </p>
                        <p>
                            <strong>Invoice No. :</strong> {performa.invoiceNo}
                        </p>
                    </div>
                    <div style={{ width: '45%', border: '1px solid black', padding: '10px' }}>
                        <p>
                            <strong>GSTIN :</strong> {performa.gstin}
                        </p>
                        <p>
                            <strong>State Code :</strong> {performa.stateCode}
                        </p>
                        <p>
                            <strong>Invoice Date :</strong> {performa.invoiceDate}
                        </p>
                    </div>
                </div>
                <div style={{ marginBottom: '0', padding: '10px', border: '1px solid black' }}>
                    <p>
                        <strong>Receiver Name :</strong> {performa.receiverName}
                    </p>
                    <p>
                        <strong>Address :</strong> {performa.receiverAddress}
                    </p>
                    <p>
                        <strong>GSTIN :</strong> {performa.receiverGstin}
                    </p>
                    <p>
                        <strong>State :</strong> {performa.receiverState}
                    </p>
                    <p>
                        <strong>Project No. :</strong> {performa.projectNo}
                    </p>
                    <p>
                        <strong>Project Reference No. :</strong> {performa.projectReferenceNo}
                    </p>
                    <p>
                        <strong>Work Order No. :</strong> {performa.workOrderNo}
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0' }}>
                    <div style={{ width: '75%', border: '1px solid black', padding: '10px' }}>
                        <p>
                            <strong>Particulars :</strong> {performa.particulars}
                        </p>
                    </div>
                    <div style={{ width: '45%', border: '1px solid black', padding: '10px' }}>
                        <p>
                            <strong> AMT. (Rs)</strong><br/> {performa.amtRs}
                        </p>
                    </div>
                </div>
                <div style={{ marginBottom: '0', padding: '10px', border: '1px solid black' }}>
                    <p><strong>Rs. In Words :</strong> {performa.amtWords}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0' }}>
                    <div style={{ width: '75%', border: '1px solid black', padding: '10px' }}>
                        <p>
                            <strong> Bank Details :</strong> AXIS Bank Ltd
                        </p>
                        <p>
                            <strong> A/c Name :</strong>  Vivek Bhole Consultant Pvt Ltd
                        </p>
                        <p>
                            <strong> A/C No. :</strong> 919020012575070
                        </p>
                        <p>
                            <strong>IFSC CODE :</strong> UTIB0000395
                        </p>
                    </div>
                    <div style={{ width: '45%', border: '1px solid black', padding: '10px' }}>
                        <p style={{ marginTop: '132px', textAlign: 'center' }}>
                            <strong>Common Seal </strong>
                        </p>
                    </div>
                    <div style={{ width: '65%', border: '1px solid black', padding: '10px' }}>
                        <p>
                            <strong style={{ textAlign: 'center' }}>For Vivek Bhole Consultant Pvt Ltd</strong>
                        </p>
                        <p style={{ marginTop: '80px', textAlign: 'center' }}>
                            <strong>(Authorised Signatory)</strong>
                        </p>
                    </div>
                </div>

            </div>
            <button style={{ marginTop: '10px', height: '40px', width: '100%' }} onClick={downloadInvoice}>Download PDF</button>
        </div>
    );
};

export default VivekProformaInvoice;
