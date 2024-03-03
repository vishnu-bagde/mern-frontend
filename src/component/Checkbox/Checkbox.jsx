import React, { useState } from 'react';
import './Checkbox.scss'

function Checkbox({ onChange, id, label, className }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (check) => {
        setIsChecked(check);
        onChange(check, id)
    };

    return (
        <div className={`custom--checkbox flex flex--align-items-center ${className || ""}`}>
            <input type="checkbox" id={id} checked={isChecked} onChange={() => handleCheckboxChange(!isChecked)} />
            <label htmlFor={id} className='flex flex--align-items-center fs--20 font--family font--semibold position--relative'>
                {label}
            </label>
        </div>
    );
}

export default Checkbox;
