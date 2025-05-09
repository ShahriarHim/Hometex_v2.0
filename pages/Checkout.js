import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useGeolocated } from "react-geolocated";
import { FaUser, FaEnvelope, FaShoppingBag, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding, FaLocationArrow } from 'react-icons/fa';
import { BsBuilding, BsGeoAlt, BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Checkout = ({ initialDivisions }) => {
  const auth_name = getCookie("home_text_name");
  const auth_phone = getCookie("home_text_phone");
  const auth_email = getCookie("home_text_email");
  const [cities, setCities] = useState(initialDivisions || []);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [formData, setFormData] = useState({
    firstName: auth_name || '',
    lastName: '',
    email: auth_email || '',
    phoneNumber: auth_phone || '',
    country: "",
    city: "",
    postcode: ""
  });

  const router = useRouter();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Add new state for showing the editable location details
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [locationDetails, setLocationDetails] = useState({
    streetAddress: '',
    landmark: '',
    additionalInfo: ''
  });

  useEffect(() => {
    if (formData.Division && !isNaN(formData.Division)) {
      fetchDistricts(formData.Division);
    }
  }, [formData.Division]);

  useEffect(() => {
    // Load user location from cookies if it exists
    const savedLocation = getCookie('user_location');
    if (savedLocation) {
      try {
        const locationData = JSON.parse(savedLocation);
        
        // Pre-fill form data with saved location information
        setFormData(prev => ({
          ...prev,
          country: locationData.countryCode || '',
          city: locationData.city || '',
          postcode: locationData.postcode || '',
        }));
        
        // Find matching division from the stored state/division name
        if (locationData.state && initialDivisions && initialDivisions.length) {
          const matchingDivision = initialDivisions.find(
            div => div.name.toLowerCase() === locationData.state.toLowerCase()
          );
          
          if (matchingDivision) {
            setSelectedDivision(locationData.state);
            fetchDistricts(matchingDivision.id);
            
            setFormData(prev => ({
              ...prev,
              Division: matchingDivision.id
            }));
            
            // After districts are loaded, find the matching district
            setTimeout(() => {
              if (locationData.district) {
                // Find matching district after they're loaded
                const matchingDistrict = districts.find(
                  dist => dist.name.toLowerCase() === locationData.district.toLowerCase()
                );
                
                if (matchingDistrict) {
                  setSelectedDistrict(locationData.district);
                  setFormData(prev => ({
                    ...prev,
                    District: matchingDistrict.id
                  }));
                }
              }
            }, 1000); // Give time for districts to load
          }
        }
        
        // Set location details if stored
        if (locationData.displayName) {
          setLocationDetails({
            streetAddress: locationData.displayName || '',
            landmark: '',
            additionalInfo: ''
          });
          setShowLocationDetails(true);
        }
      } catch (error) {
        console.error("Error parsing location cookie:", error);
      }
    }
  }, [initialDivisions]);

  const fetchDistricts = async (divisionId) => {
    try {
      if (!divisionId || isNaN(divisionId)) {
        console.log("Invalid division ID, skipping district fetch");
        return;
      }

      const response = await fetch(`https://htbapi.hometexbd.ltd/api/district/${divisionId}`);
      if (!response.ok) {
        console.error(`Failed to fetch districts: ${response.status}`);
        setDistricts([]);
        return;
      }

      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Division') {
      if (!isNaN(value)) {
        const selectedDiv = cities.find(city => city.id === parseInt(value));
        setSelectedDivision(selectedDiv ? selectedDiv.name : '');
        fetchDistricts(value);
      } else {
        setSelectedDivision(value);
      }
    } else if (name === 'District') {
      if (!isNaN(value)) {
        const selectedDist = districts.find(district => district.id === parseInt(value));
        setSelectedDistrict(selectedDist ? selectedDist.name : '');
      } else {
        setSelectedDistrict(value);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      console.log("Geolocation availability:", {
        isAvailable: isGeolocationAvailable,
        isEnabled: isGeolocationEnabled,
        coords: coords
      });

      if (!isGeolocationAvailable) {
        alert("Your browser does not support geolocation");
        return;
      }

      if (!isGeolocationEnabled) {
        alert("Please enable location services");
        return;
      }

      if (coords) {
        console.log("Coordinates obtained:", {
          latitude: coords.latitude,
          longitude: coords.longitude
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Location API response:", data);
        console.log("Address details:", data.address);

        // Clean up the division name by removing "Division" word
        const stateName = data.address.state?.replace(" Division", "") || "";
        
        // Clean up the district name by removing "District" word
        const districtName = data.address.state_district?.replace(" District", "") || "";
        
        // Find the matching division ID from cities array
        const matchingDivision = cities.find(
          city => city.name.toLowerCase() === stateName.toLowerCase()
        );

        if (matchingDivision) {
          // First update division
          setFormData(prevFormData => ({
            ...prevFormData,
            country: data.address.country_code?.toUpperCase() || "",
            city: data.address.city || data.address.town || data.address.village || "",
            postcode: data.address.postcode || "",
            Division: matchingDivision.id,
          }));
          setSelectedDivision(stateName);

          // Fetch districts and wait for the response
          const response = await fetch(`https://htbapi.hometexbd.ltd/api/district/${matchingDivision.id}`);
          const districtData = await response.json();
          setDistricts(districtData);

          // After districts are loaded, find and set the matching district
          const matchingDistrict = districtData.find(
            district => district.name.toLowerCase() === districtName.toLowerCase()
          );

          if (matchingDistrict) {
            setFormData(prevFormData => ({
              ...prevFormData,
              District: matchingDistrict.id
            }));
            setSelectedDistrict(districtName);
          }
        }

        // After setting all the location data, show the editable section
        setShowLocationDetails(true);
        
        // Update to include display_name in the streetAddress
        setLocationDetails({
          streetAddress: data.display_name || '',
          landmark: data.address.suburb || '',
          additionalInfo: ''
        });
      }
    } catch (error) {
      console.error("Detailed error:", error);
      alert("Error getting location. Please try again or enter manually.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationDetailsChange = (e) => {
    const { name, value } = e.target;
    setLocationDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      Division: selectedDivision,
      District: selectedDistrict,
    };
    console.log("Form Data:", updatedFormData);
    router.push({
      pathname: '/totalPrice',
      query: updatedFormData,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Checkout Information</h2>
                  <p className="text-gray-500 mt-1">Please fill in your details to complete the order</p>
                </div>
                <div className="bg-gradient-to-r from-primary/20 to-primary/30 p-4 rounded-2xl shadow-inner">
                  <FaShoppingBag className="text-primary text-2xl" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaUser className="text-gray-400 text-sm" />
                      First Name *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaUser className="text-gray-400 text-sm" />
                      Last Name *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400 text-sm" />
                    Email Address *
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phoneNumber" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                    <FaPhone className="text-gray-400 text-sm" />
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLoadingLocation}
                    className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] active:shadow-inner transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaLocationArrow className={`${isLoadingLocation ? 'animate-pulse text-primary' : 'text-gray-500'}`} />
                    <span className="font-medium">{isLoadingLocation ? "Getting Location..." : "Use My Current Location"}</span>
                  </button>
                </div>

                {showLocationDetails && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                      Location Details
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="streetAddress"
                        value={locationDetails.streetAddress}
                        onChange={handleLocationDetailsChange}
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300"
                        placeholder="Enter street address"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="country" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaGlobe className="text-gray-400 text-sm" />
                      Select Country *
                    </label>
                    <div className="relative group">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="">Select Country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="CV">Cabo Verde</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo (DRC)</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curaçao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="SZ">Eswatini</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">Heard & McDonald Islands</option>
                        <option value="VA">Holy See (Vatican City State)</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="postcode" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaBuilding className="text-gray-400 text-sm" />
                      Post Code *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="Division" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <BsBuilding className="text-gray-400 text-sm" />
                      Select Division *
                    </label>
                    <div className="relative group">
                      <select
                        name="Division"
                        value={formData.Division}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="">Select Division</option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="District" className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <BsGeoAlt className="text-gray-400 text-sm" />
                      Select District *
                    </label>
                    <div className="relative group">
                      <select
                        name="District"
                        value={formData.District}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] focus:ring-0 focus:border-primary outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 flex items-center justify-center mt-4 bg-gray-50 py-2 px-4 rounded-xl">
                  <span className="text-red-500 mr-1">*</span>
                  All fields are mandatory
                </div>

                <div className="flex justify-center mt-8">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 font-medium flex items-center justify-center space-x-2 overflow-hidden relative"
                  >
                    <span className="relative z-10">Proceed to Payment</span>
                    <BsArrowRight className="text-xl relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const response = await fetch("https://htbapi.hometexbd.ltd/api/divisions");
    const initialDivisions = await response.json();

    return {
      props: {
        initialDivisions,
      },
    };
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return {
      props: {
        initialDivisions: [],
      },
    };
  }
}

export default Checkout;