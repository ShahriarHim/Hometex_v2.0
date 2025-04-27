import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useGeolocated } from "react-geolocated";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding, FaLocationArrow, FaShoppingBag } from 'react-icons/fa';
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
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Checkout Information</h2>
                  <p className="text-gray-500 mt-1">Please fill in your details to complete the order</p>
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-3 rounded-full">
                  <FaShoppingBag className="text-primary text-2xl" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-gray-700 font-medium mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-gray-700 font-medium mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phoneNumber" className="text-gray-700 font-medium mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLoadingLocation}
                    className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm hover:bg-gray-100/80 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaLocationArrow className="text-gray-600" />
                    <span className="font-medium">{isLoadingLocation ? "Getting Location..." : "Use My Current Location"}</span>
                  </button>
                </div>

                {showLocationDetails && (
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">
                      Location Details
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="streetAddress"
                        value={locationDetails.streetAddress}
                        onChange={handleLocationDetailsChange}
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                        placeholder="Enter street address"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="country" className="text-gray-700 font-medium mb-2">
                      Select Country *
                    </label>
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300 appearance-none"
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
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="postcode" className="text-gray-700 font-medium mb-2">
                      Post Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="Division" className="text-gray-700 font-medium mb-2">
                      Select Division *
                    </label>
                    <div className="relative">
                      <select
                        name="Division"
                        value={formData.Division}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="">Select Division</option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="District" className="text-gray-700 font-medium mb-2">
                      Select District *
                    </label>
                    <div className="relative">
                      <select
                        name="District"
                        value={formData.District}
                        onChange={handleChange}
                        required
                        className="w-full py-3.5 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <span className="text-red-500 mr-1">*</span>
                  All fields are mandatory
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Payment</span>
                    <BsArrowRight className="text-xl" />
                  </button>
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