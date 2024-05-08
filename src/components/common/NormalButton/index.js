import React from "react";
import "./style.scss";

const NormalButton = ({ className = "",
    label = "",
    onClick,
    onSubmit,
    type = "submit", }) => {


    return (
        <>
            <button
                type={type}
                className={`${className} w-100 bg-primary text-white p-2 border-none`}
                onClick={onClick}
                onSubmit={onSubmit}
            >
                {label}
            </button>
        </>
    );
};

export default NormalButton;
