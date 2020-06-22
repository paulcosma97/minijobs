import React from "react";
import './MJButton.css';

export interface MJButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    styleType?: 'primary' | 'secondary' | 'tertiary';
}

const MJButton: React.FC<MJButtonProps> = ({ styleType, ...props }) => {
    return (
        <button className={`mj-button mj-button-${styleType || 'primary'}`} {...props} />
    )
}

export default MJButton;