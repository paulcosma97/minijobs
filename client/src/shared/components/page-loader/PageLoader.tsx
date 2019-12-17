import React from 'react';
import './style.css';
import { pure } from 'recompose';

const PageLoader: React.FC = () => (<div className="loader-wrapper"><div className="lds-ripple"><div></div></div></div>);

export default pure(PageLoader);