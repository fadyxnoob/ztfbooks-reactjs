import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, classNames, path, onClick, type = 'button' }) => {
    if (path) {
        // Render a Link if path is provided
        return (
            <Link to={path} className={classNames}>
                {children}
            </Link>
        );
    }

    // Render a button if path is not provided
    return (
        <button
            type={type} // Allow specifying the button type (e.g., 'button', 'submit')
            className={classNames}
            onClick={onClick} // Handle onClick
        >
            {children}
        </button>
    );
};

export default Button;
