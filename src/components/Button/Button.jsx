import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, classNames, path, onClick, type = 'button', disabled }) => {

    if (path) {
        return <Link to={path} className={classNames}>{children}</Link>;
    }

    return (
        <button
            type={type}
            className={classNames}
            onClick={onClick}
            disabled={disabled ? disabled : null}
        >
            {children}
        </button>
    );
};


export default React.memo(Button);
