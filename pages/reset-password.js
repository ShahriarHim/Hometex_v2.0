import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillHome, AiFillCaretRight, AiOutlineLock, AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSafety, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsShieldLock, BsCheckCircle } from 'react-icons/bs'

const ResetPassword = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        token: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        if (router.query.token && router.query.email) {
            setFormData(prev => ({
                ...prev,
                token: router.query.token,
                email: router.query.email
            }))
        }
    }, [router.query])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Password validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long')
            setLoading(false)
            return
        }

        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('https://htbapi.hometexbd.ltd/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            
            if (response.ok) {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/account/login')
                }, 3000)
            } else {
                setError(data.message || 'Password reset failed')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }
 
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-sky-400 to-indigo-400 text-white py-6 mb-8">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="hover:text-white flex items-center">
                            <AiFillHome className="mr-1" /> Home
                        </Link>
                        <AiFillCaretRight className="text-white/70" />
                        <Link href="/account" className="hover:text-white">Account</Link>
                        <AiFillCaretRight className="text-white/70" />
                        <span>Reset Password</span>
                    </div>
                    <h1 className="text-3xl font-bold mt-4">Reset Your Password</h1>
                    <p className="text-white/90 mt-2">Secure your account with a strong password</p>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 pb-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
                            <div className='bg-gradient-to-r from-sky-400 to-indigo-400 p-8 text-white'>
                                <div className="flex items-center mb-4">
                                    <BsShieldLock className="text-4xl mr-4" />
                                    <h5 className='text-3xl font-bold'>Create New Password</h5>
                                </div>
                                <p className='text-sm opacity-90 leading-relaxed'>
                                    Your new password must be different from previously used passwords and meet our security requirements.
                                </p>
                            </div>

                            {success ? (
                                <div className="p-12 text-center">
                                    <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                                        <BsCheckCircle className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Password Reset Successful!</h3>
                                    <p className="text-gray-600 mb-8">
                                        Your password has been successfully reset. You will be redirected to the login page in a moment.
                                    </p>
                                    <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 animate-progress-bar"></div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-8">
                                    {error && (
                                        <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-700 border border-red-200">
                                            {error}
                                        </div>
                                    )}

                                    <div className='space-y-6'>
                                        <div>
                                            <label className='block text-gray-700 text-sm font-semibold mb-2'>Email Address</label>
                                            <div className="relative">
                                                <input 
                                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                                    type="email"
                                                    value={formData.email}
                                                    disabled
                                                />
                                                <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block text-gray-700 text-sm font-semibold mb-2'>New Password</label>
                                            <div className="relative">
                                                <input 
                                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                    required
                                                    minLength={8}
                                                />
                                                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <button 
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block text-gray-700 text-sm font-semibold mb-2'>Confirm Password</label>
                                            <div className="relative">
                                                <input 
                                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={formData.password_confirmation}
                                                    onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                                    required
                                                    minLength={8}
                                                />
                                                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <button 
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                 
                                    </div>

                                    <div className="flex items-center justify-between mt-8">
                                        <Link href="/">
                                            <button 
                                                type="button" 
                                                className="px-6 py-3 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center"
                                            >
                                                <AiFillHome className="mr-2" />
                                                Back to Home
                                            </button>
                                        </Link>
                                        <button 
                                            type="submit" 
                                            className={`px-8 py-3 bg-sky-400 text-white rounded-lg font-medium flex items-center
                                                ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-sky-500 active:bg-sky-600'} 
                                                transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg`}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Resetting...
                                                </span>
                                            ) : (
                                                <>
                                                    <AiOutlineLock className="mr-2" />
                                                    Reset Password
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Side Content */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <AiOutlineInfoCircle className="mr-2 text-sky-500" />
                                Security Tips
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-sky-50 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">Keep Your Password Safe</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Never share your password with anyone</li>
                                        <li>• Avoid using personal information</li>
                                        <li>• Use unique passwords for each account</li>
                                        <li>• Change your password periodically</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-indigo-50 rounded-lg">
                                    <h4 className="font-medium text-indigo-700 mb-2">Need Help?</h4>
                                    <p className="text-sm text-indigo-600 mb-4">
                                        If you're having trouble resetting your password, our support team is here to help.
                                    </p>
                                    <Link href="/contact">
                                        <button className="w-full px-4 py-2 border border-indigo-400 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
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
    )
}

export default ResetPassword 