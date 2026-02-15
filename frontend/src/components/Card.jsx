import React from 'react';

const Card = ({ title, children, className = "" }) => {
    return (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${className}`}>
            {title && <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>}
            {children}
        </div>
    );
};

export default Card;
