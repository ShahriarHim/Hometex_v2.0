import React from 'react';

const FilterProducts = ({ filters, toggleFilter, handlePriceChange, clearFilters, categories, colors, sizes }) => {
    return (
        <div className="filter-card bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            {/* Subcategory Filter */}
            <div className="mb-4">
                <h4 className="font-medium">Subcategory</h4>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.subcategory.includes(category.name)}
                                    onChange={() => toggleFilter('subcategory', category.name)}
                                />
                                {category.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Color Filter */}
            <div className="mb-4">
                <h4 className="font-medium">Color</h4>
                <ul className="space-y-2">
                    {colors.map((color) => (
                        <li key={color}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.color.includes(color)}
                                    onChange={() => toggleFilter('color', color)}
                                />
                                {color}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
                <h4 className="font-medium">Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange([filters.priceRange[0], e.target.value])}
                    className="w-full"
                />
                <div className="flex justify-between">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                </div>
            </div>

            {/* Size Filter */}
            <div className="mb-4">
                <h4 className="font-medium">Size</h4>
                <ul className="space-y-2">
                    {sizes.map((size) => (
                        <li key={size}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.size.includes(size)}
                                    onChange={() => toggleFilter('size', size)}
                                />
                                {size}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={clearFilters}
                className="w-full bg-gray-500 text-white py-2 rounded-md"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default FilterProducts;
