import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, classNames, path }) => {
    return path ? (
        <Link to={path} className={classNames}>
            {children}
        </Link>
    ) : (
        <button className={classNames}>
            {children}
        </button>
    );
};

export default Button;
