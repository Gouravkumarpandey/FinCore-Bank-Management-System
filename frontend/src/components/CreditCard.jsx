import React from 'react';
import { DollarSign } from 'lucide-react';
import PropTypes from 'prop-types';

const CreditCard = ({ balance, cardNumber, cardHolder, expiryDate, variant = 'primary' }) => {
    // Tailwind gradients for different card variants
    const variants = {
        primary: 'bg-gradient-to-br from-blue-600 to-indigo-700',
        secondary: 'bg-gradient-to-br from-purple-600 to-pink-600',
        dark: 'bg-gradient-to-br from-gray-800 to-gray-900',
    };

    const gradient = variants[variant] || variants.primary;

    return (
        <div className={`${gradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white relative overflow-hidden h-56 w-full max-w-sm flex flex-col justify-between`}>
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-white opacity-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>

            {/* Top Section: Chip and Visa Logo */}
            <div className="flex justify-between items-start z-10">
                <div className="w-12 h-9 bg-yellow-200/80 rounded-md border border-yellow-300/50 flex items-center justify-center overflow-hidden relative">
                    {/* Chip lines */}
                    <div className="absolute w-full h-[1px] bg-yellow-600/30 top-1/3"></div>
                    <div className="absolute w-full h-[1px] bg-yellow-600/30 bottom-1/3"></div>
                    <div className="absolute h-full w-[1px] bg-yellow-600/30 left-1/3"></div>
                    <div className="absolute h-full w-[1px] bg-yellow-600/30 right-1/3"></div>
                </div>
                <div className="text-2xl font-bold italic tracking-wider opacity-90">VISA</div>
            </div>

            {/* Middle Section: Balance and Number */}
            <div className="z-10 mt-4">
                <p className="text-xs font-light text-blue-100 uppercase tracking-widest mb-1">Current Balance</p>
                <div className="flex items-center text-3xl font-bold tracking-tight">
                    <DollarSign className="w-6 h-6 mr-1 opacity-80" />
                    {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
            </div>

            {/* Bottom Section: Details */}
            <div className="z-10 flex justify-between items-end mt-4">
                <div>
                    <p className="text-xs text-blue-100 mb-1 tracking-widest uppercase">Card Holder</p>
                    <p className="font-medium tracking-wide text-lg text-shadow-sm">{cardHolder}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-blue-100 mb-1 tracking-widest uppercase">Expires</p>
                    <p className="font-medium tracking-widest text-lg">{expiryDate}</p>
                </div>
            </div>

            {/* Card Number Mask */}
            <div className="absolute top-1/2 left-0 w-full flex justify-center opacity-10 text-6xl font-mono tracking-widest pointer-events-none select-none">
                •••• ••••
            </div>

            <div className="absolute bottom-20 left-6 text-lg font-mono tracking-widest opacity-80 z-10">
                **** **** **** {cardNumber.slice(-4)}
            </div>

        </div>
    );
};

CreditCard.propTypes = {
    balance: PropTypes.number.isRequired,
    cardNumber: PropTypes.string.isRequired,
    cardHolder: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    variant: PropTypes.string,
};

export default CreditCard;
