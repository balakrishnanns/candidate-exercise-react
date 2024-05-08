import React from "react";
import "./style.scss";

export const SearchInput = ({ name, placeholder, onChange }) => {
    return (
        <>
            <div className="search">
                <input
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onChange={onChange}
                    className="searchInput"
                />
            </div>

        </>
    )
}