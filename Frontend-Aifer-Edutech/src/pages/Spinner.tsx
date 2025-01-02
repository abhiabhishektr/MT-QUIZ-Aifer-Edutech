import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;
