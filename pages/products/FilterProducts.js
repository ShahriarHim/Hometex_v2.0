import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Constants from "@/ults/Constant";
import { FaSearch } from "react-icons/fa";

const FilterSection = () => {
  const [filters, setFilters] = useState([]); // Store filter sections
  const [selectedFilters, setSelectedFilters] = useState({}); // Store selected filters
  const [openSections, setOpenSections] = useState({}); // Track opened sections

  // Fetch filter list on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          `${Constants.BASE_URL}/api/products/filter-list`
        );
        const data = await response.json();
        setFilters(data); // Assume API returns an array of filter sections

        // Initialize openSections state
        const initialOpenState = {};
        data.forEach((filter) => {
          initialOpenState[filter.name] = true; // Open by default
        });
        setOpenSections(initialOpenState);
        initialOpenState["search"] = true;
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  // Toggle filter selection
  const toggleFilter = (section, option) => {
    setSelectedFilters((prev) => {
      const sectionFilters = prev[section] || [];
      const updatedFilters = sectionFilters.some(
        (item) => item.id === option.id
      )
        ? sectionFilters.filter((item) => item.id !== option.id)
        : [...sectionFilters, option];

      return { ...prev, [section]: updatedFilters };
    });
  };

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-64 p-4 bg-white rounded-3xl border border-gray-200">
      {/* Search Bar */}
      <div className="mb-4">
        {/* Collapsible Toggle Button for Search */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("search")}
        >
          <h3 className="font-semibold">Search</h3>
          {openSections["search"] ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>

        {/* Collapsible Section for Search Input */}
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out transform ${
            openSections["search"] ? "max-h-[100px]" : "max-h-0"
          }`}
        >
          <div className="relative mt-5">
            <input
              type="text"
              className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Search"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaSearch size={18} className="text-gray-600" />
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-2 border-gray-300 mt-6" />
      </div>

      {/* Dynamically Render Filter Sections */}
      {filters.map((filter) => (
        <div key={filter.id} className="mb-4">
          {/* Section Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(filter.name)}
          >
            <h3 className="font-semibold">{filter.name}</h3>
            {openSections[filter.name] ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {/* Section Options with Transition */}
          <div
            className={`overflow-hidden transition-all duration-1000 ease-in-out transform ${
              openSections[filter.name] ? "max-h-[600px]" : "max-h-0"
            }`}
          >
            {openSections[filter.name] && (
              <div className="mt-2 space-y-2">
                {filter.value.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[filter.name]?.some(
                        (item) => item.id === option.id
                      )}
                      onChange={() => toggleFilter(filter.name, option)}
                    />
                    {option.name}
                    {selectedFilters[filter.name]?.some(
                      (item) => item.id === option.id
                    ) && (
                      <X
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => toggleFilter(filter.name, option)}
                      />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Horizontal Line */}
          <hr className="my-2 border-gray-300 mt-6" />
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
