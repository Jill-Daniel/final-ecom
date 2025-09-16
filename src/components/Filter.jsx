// src/components/Filter.jsx
import React, { useState } from "react";

const Filter = ({ categories, onFilterChange, onSearch }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const handleCheckboxChange = (category, subcategory) => {
    onFilterChange(category, subcategory);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="filter-container">
      {/* Search Box */}
      <div className="filter-search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
        />
      </div>

      {/* Categories */}
      <div className="filter-categories">
        {categories.map((category, index) => (
          <div key={index} className="filter-category">
            <div
              className="filter-category-header"
              onClick={() => toggleCategory(category.name)}
            >
              <span>{category.name}</span>
              <span className="arrow">
                {expandedCategory === category.name ? "▲" : "▼"}
              </span>
            </div>

            {expandedCategory === category.name && (
              <div className="filter-subcategories">
                {category.subcategories.map((sub, subIndex) => (
                  <label key={subIndex} className="filter-option">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(category.name, sub)}
                    />
                    <span>{sub}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
