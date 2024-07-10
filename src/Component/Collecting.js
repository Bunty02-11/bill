import React, { useState } from 'react';
import Performa from './Performa/Performa';
import ProformaInvoice from './Bill/Performabill';
import VivekProformaInvoice from './Bill/VivekPerfoma';

function Collecting() {
    const [selectedInvoice, setSelectedInvoice] = useState('ProformaInvoice');

    const handleSelectChange = (event) => {
        setSelectedInvoice(event.target.value);
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <select 
                    onChange={handleSelectChange} 
                    value={selectedInvoice}
                    style={{ fontSize: '20px', padding: '10px' }}
                >
                    <option value="ProformaInvoice">Neo Modern</option>
                    <option value="VivekProformaInvoice">Vivek Bhole Proforma</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginRight: '20px' }}>
                    <Performa />
                </div>
                <div style={{ flex: 1 }}>
                    {selectedInvoice === 'ProformaInvoice' && <ProformaInvoice />}
                    {selectedInvoice === 'VivekProformaInvoice' && <VivekProformaInvoice />}
                </div>
            </div>
        </div>
    );
}

export default Collecting;
