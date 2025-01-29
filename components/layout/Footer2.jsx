import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';

const Footer2 = () => {
  const currentYear = new Date().getFullYear();

  const demoImages = [
    "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];

  return (
    <footer className="bg-white text-gray-600 py-8">
      {/* Logo and Description */}
      <div className="container mx-auto px-4 text-center mb-8">
        <Link href="/">
          <img 
            src="/images/hometex-logo.png" 
            alt="Hometex Logo" 
            className="h-12 mx-auto mb-4"
          />
        </Link>
        <p className="text-sm leading-relaxed">
              Discover the perfect blend of style and comfort with our curated collection 
              of home textiles. Transform your living spaces with our premium quality products.
            </p>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr_0.9fr_0.9fr] gap-8 mb-8">
          {/* Store Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-black mb-4">Store Information</h3>
            <div className="flex items-center space-x-2">
              <HiLocationMarker className="text-yellow-500" size={18} />
              <span className="text-sm">151, Demo Store United States, France</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiPhone className="text-yellow-500" size={18} />
              <span className="text-sm">+ (123) 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiMail className="text-yellow-500" size={18} />
              <span className="text-sm">info@example.com</span>
            </div>
          </div>

          {/* Our Gallery */}
          <div>
            <h3 className="font-semibold text-black mb-4">Our Gallery</h3>
            <div className="flex gap-4 justify-between">
              {demoImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  className="w-32 h-24 object-cover rounded hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Information - Adjusted position to the right */}
          <div className="pl-8">
            <h3 className="font-semibold text-black mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-pink-500">About Us</Link></li>
              <li><Link href="/delivery" className="hover:text-pink-500">Delivery</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-pink-500">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-500">Terms & Conditions</Link></li>
              <li><Link href="/information" className="hover:text-pink-500">Information</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-black mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="hover:text-pink-500">Account</Link></li>
              <li><Link href="/order-history" className="hover:text-pink-500">Order History</Link></li>
              <li><Link href="/site-map" className="hover:text-pink-500">Site Map</Link></li>
              <li><Link href="/wish-list" className="hover:text-pink-500">Wish List</Link></li>
              <li><Link href="/returns" className="hover:text-pink-500">Returns</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-3 mb-8">
          <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600">
            <FaFacebookF size={16} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600">
            <FaTwitter size={16} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600">
            <FaYoutube size={16} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600">
            <FaPinterestP size={16} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600">
            <FaInstagram size={16} />
          </a>
        </div>

        {/* Payment Methods and Copyright in single line */}
        <div className="border-t pt-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              {/* Payment Methods */}
              <div className="flex items-center space-x-2">
                <span className="text-sm mr-3">We Accept:</span>
                <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-8" />
                <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-8" />
                <img src="https://cdn-icons-png.flaticon.com/512/349/349230.png" alt="Discover" className="h-8" />
                <img src="https://cdn-icons-png.flaticon.com/512/349/349247.png" alt="American Express" className="h-8" />
              </div>

              {/* Copyright */}
              <div className="text-sm text-gray-500">
               Copyright <span className="text-pink-500">{currentYear}</span> Hometex Bangladesh Manufactory. All rights reserved. 
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
