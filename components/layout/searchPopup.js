import React, { useState, useRef, useEffect } from "react";
import { RiCloseLine, RiSearchLine, RiQrScanLine } from "react-icons/ri";

const SearchBarPopup = ({ onClose }) => {
    const [sort, setSort] = useState("");
    const [orientation, setOrientation] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [advancedSearchVisible, setAdvancedSearchVisible] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const modalRef = useRef();
    const fileInputRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleShowItems = () => {
        // Handle the search logic here
        console.log("Show items with filters: ", { sort, orientation, minPrice, maxPrice, photoFile });
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhotoFile(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start px-4 py-6 sm:px-0 z-50 mt-0">
            <div
                ref={modalRef}
                className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-6xl sm:w-full p-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Search for Items</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <RiCloseLine size="24" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Keywords</label>
                        <input
                            type="text"
                            placeholder="Keywords"
                            className="px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Sort By</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="px-4 py-2 border rounded-md"
                        >
                            <option value="">Sort</option>
                            <option value="relevance">Relevance</option>
                            <option value="date">Date</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Prizes</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="$ Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="px-4 py-2 border rounded-md w-1/2"
                            />
                            <input
                                type="number"
                                placeholder="$ Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="px-4 py-2 border rounded-md w-1/2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Orientation</label>
                        <select
                            value={orientation}
                            onChange={(e) => setOrientation(e.target.value)}
                            className="px-4 py-2 border rounded-md"
                        >
                            <option value="">Orientation</option>
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-1" style={{ height: '1.5rem' }}></div>
                        <button
                            onClick={handleShowItems}
                            className="block w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Show Items
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-left">
                    <button
                        onClick={() => setAdvancedSearchVisible(!advancedSearchVisible)}
                        className="text-blue-500 hover:underline"
                    >
                        Advanced Search {'>>'}
                    </button>
                    {advancedSearchVisible && (
                        <div className="mt-2 p-4 border rounded-md">
                            {/* Advanced search options */}
                            <div className="flex flex-col mb-4">
                                <label className="mb-1 text-gray-700">Search by Image</label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-0 flex items-center pl-2 cursor-pointer" onClick={triggerFileInput}>
                                        <img
                                            src="/images/icons/capture.png"
                                            alt="Camera Viewfinder Icon"
                                            className="h-6 w-6"
                                        />
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            id="photo-upload"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by image"
                                        className="w-full px-10 py-2 border rounded-md"
                                    />
                                    <div className="absolute right-0 flex items-center pr-2 space-x-2">
                                        <RiSearchLine size="24" className="text-gray-500 cursor-pointer" />
                                        <RiQrScanLine size="24" className="text-gray-500 cursor-pointer" />
                                    </div>
                                </div>
                                {photoFile && <p className="mt-2 text-sm text-gray-600">Selected file: {photoFile.name}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBarPopup;
