import React, { useState } from "react";


const ProductQunatity = () => {
  const [selectedOption, setSelectedOption] = useState({
    label: "1 kg",
    price: "₹54",
    originalPrice: "₹93.15",
    discount: "42% OFF",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { label: "250 g", price: "₹13.5", originalPrice: "₹21.92", discount: "38% OFF" },
    { label: "500 g", price: "₹27", originalPrice: "₹42.47", discount: "36% OFF" },
    { label: "1 kg", price: "₹54", originalPrice: "₹93.15", discount: "42% OFF" },
    { label: "3 kg", price: "Out of stock", discount: null },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-selected"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="option-details">
          <span className="option-label">{selectedOption.label}</span>
          {selectedOption.discount && (
            <span className="option-discount">{selectedOption.discount}</span>
          )}
        </div>
        <div className="option-price">
          <span className="current-price">{selectedOption.price}</span>
          {selectedOption.originalPrice && (
            <span className="original-price">{selectedOption.originalPrice}</span>
          )}
        </div>
        <span className="arrow">{isDropdownOpen ? "▲" : "▼"}</span>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-option ${
                selectedOption.label === option.label ? "selected" : ""
              } ${option.price === "Out of stock" ? "out-of-stock" : ""}`}
              onClick={() =>
                option.price !== "Out of stock" && handleSelect(option)
              }
            >
              <div className="option-details">
                <span className="option-label">{option.label}</span>
                {option.discount && (
                  <span className="option-discount">{option.discount}</span>
                )}
              </div>
              <div className="option-price">
                {option.price !== "Out of stock" ? (
                  <>
                    <span className="current-price">{option.price}</span>
                    <span className="original-price">
                      {option.originalPrice}
                    </span>
                  </>
                ) : (
                  <span className="stock-status">{option.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductQunatity;
