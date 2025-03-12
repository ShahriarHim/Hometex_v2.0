import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillHome, AiFillCaretRight, AiOutlineMail, AiOutlineLock, AiOutlineQuestionCircle } from 'react-icons/ai'

const Forgotten = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('https://htbapi.hometexbd.ltd/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setIsSuccess(true);
                setMessage('Password reset link has been sent to your email.');
            } else {
                setMessage(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setMessage('Failed to connect to the server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Breadcrumb */}
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <ul className="flex items-center space-x-2 text-sm text-gray-600">
                    <li><Link href="/" className="hover:text-blue-600 flex items-center"><AiFillHome className="mr-1" /> Home</Link></li>
                    <AiFillCaretRight className="text-gray-400" />
                    <li><Link href="/account" className="hover:text-blue-600">Account</Link></li>
                    <AiFillCaretRight className="text-gray-400" />
                    <li className="text-gray-900">Reset Password</li>
                </ul>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                            <div className='card-header bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white'>
                                <div className="flex items-center mb-4">
                                    <AiOutlineLock className="text-4xl mr-4" />
                                    <h5 className='text-3xl font-bold'>Reset Password</h5>
                                </div>
                                <p className='text-sm opacity-90 leading-relaxed'>
                                    Lost access to your account? Don't worry! Enter your email address below and we'll send you instructions to reset your password.
                                </p>
                            </div>

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="p-8">
                                    {message && (
                                        <div className={`p-4 mb-6 rounded-lg ${
                                            message.includes('error') 
                                                ? 'bg-red-50 text-red-700 border border-red-200' 
                                                : 'bg-green-50 text-green-700 border border-green-200'
                                        }`}>
                                            {message}
                                        </div>
                                    )}

                                    <div className='relative mb-6'>
                                        <label className='block text-gray-700 text-sm font-semibold mb-2'>
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input 
                                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between space-x-4">
                                        <Link href="/">
                                            <button 
                                                type="button" 
                                                className="px-6 py-3 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                            >
                                                Back to Home
                                            </button>
                                        </Link>
                                        <button 
                                            type="submit" 
                                            className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-medium
                                                ${isLoading 
                                                    ? 'opacity-75 cursor-not-allowed' 
                                                    : 'hover:bg-blue-700 active:bg-blue-800'} 
                                                transition-all duration-200 transform hover:-translate-y-0.5`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : 'Reset Password'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Check your email</h3>
                                    <p className="text-gray-600 mb-8">
                                        We've sent a password reset link to <span className="font-medium">{email}</span>
                                    </p>
                                    <Link href="/">
                                        <button 
                                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                                        >
                                            Return to Home
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Side Content */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <AiOutlineQuestionCircle className="text-blue-600 mt-1 mr-3" size={20} />
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-1">Didn't receive the email?</h4>
                                        <p className="text-sm text-gray-600">Check your spam folder or contact our support team.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <AiOutlineQuestionCircle className="text-blue-600 mt-1 mr-3" size={20} />
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-1">Link expired?</h4>
                                        <p className="text-sm text-gray-600">Request a new password reset link by submitting the form again.</p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-3">Need additional assistance?</p>
                                    <Link href="/contact">
                                        <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                                            Contact Support
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgotten;