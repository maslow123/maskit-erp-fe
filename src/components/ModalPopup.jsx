import React from 'react';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
// import './ModalPopup.css';

export default function ModalPopup({ visible, onClose, children, width = 700, height = 550, title  }) {
    return (
        <Rodal  visible={visible} onClose={() => onClose(false)} width={width} height={height}>
            <div className='header'>
                {title}
            </div>
            <div className='container mt-3'>
                {children}
            </div>
        </Rodal>
    )
}