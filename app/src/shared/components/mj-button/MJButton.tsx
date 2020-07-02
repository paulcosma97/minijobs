import React from "react";
import './MJButton.css';
import Callback from "../../utils/callback";

export interface MJButtonProps {
    type?: 'primary' | 'secondary' | 'tertiary';
    onClick?: Callback<any>;
}

const MJButton: React.FC<MJButtonProps> = ({ type, onClick, children }) => {
    return (
        <button className={`mj-button mj-button-${type || 'primary'}`} onClick={onClick}>{children}</button>
    )
}

export default MJButton;