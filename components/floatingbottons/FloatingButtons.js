import React, { useState } from 'react';

const FloatingButtons = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  const submitFeedback = () => {
    // Handle feedback submission logic
    console.log('Feedback submitted:', feedbackText, rating);
    setIsFeedbackModalOpen(false);
  };

  const closeModal = () => {
    setIsReviewModalOpen(false);
    setIsOptionsModalOpen(false);
    setIsFeedbackModalOpen(false);
  };

  return (
    <div id="so-groups" className="fixed bottom-4 right-4 flex flex-col z-50 md:bottom-20 md:right-0 md:top-80 md:block">
      <button
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 mb-2 h-12 w-12 md:h-20 md:w-6 cursor-pointer flex justify-center items-center border border-white rounded-full md:rounded"
        onClick={() => setIsReviewModalOpen(true)}
      >
        <span className="text-xl md:transform md:rotate-90">Review</span>
      </button>

      <button
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 mb-2 h-12 w-12 md:h-20 md:w-6 cursor-pointer flex justify-center items-center border border-white rounded-full md:rounded"
        onClick={() => setIsOptionsModalOpen(true)}
      >
        <span className="text-xl md:transform md:rotate-90">Options</span>
      </button>

      <button
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 h-12 w-12 md:h-40 md:w-9 cursor-pointer flex justify-center items-center border border-white rounded-full md:rounded"
        onClick={() => setIsFeedbackModalOpen(true)}
      >
        <span className="text-xl md:transform md:rotate-90">Feedback</span>
      </button>

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={closeModal}>
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                <div className="px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Feedback</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button onClick={() => setIsFeedbackModalOpen(false)} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                      {/* Feedback content */}
                      <p className="text-sm text-gray-500 text-justify mb-4">Your feedback helps us improve! Please share your thoughts below.</p>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Your feedback here..."
                        className="w-full h-24 border-gray-300 rounded-md resize-none focus:ring-indigo-500 focus:border-indigo-500 mt-2 p-2"
                      ></textarea>
                      <div className="mt-4">
                        {/* Star rating */}
                        <p className="text-sm text-gray-500 text-justify mb-2">Rate your experience:</p>
                        {[...Array(5)].map((_, index) => (
                          <button
                            key={index}
                            className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none focus:text-yellow-400`}
                            onClick={() => setRating(index + 1)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      {/* Submit button */}
                      <button
                        onClick={submitFeedback}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={closeModal}>
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                <div className="px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Review Modal</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button onClick={() => setIsReviewModalOpen(false)} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                      {/* Demo review data */}
                      <p className="text-sm text-gray-500 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus nisi. Integer eleifend eros non nulla convallis volutpat. Nam sagittis risus vel augue faucibus, a aliquam dui viverra. Donec euismod elit at purus tincidunt condimentum. Donec gravida, magna ut dictum consequat, libero est consectetur velit, nec mollis neque justo id nunc. Nam et eleifend felis, ut aliquet elit. Curabitur volutpat eros vitae tincidunt congue. Integer tincidunt libero at arcu ultrices, vel tincidunt ex faucibus. Ut bibendum, nisi vitae fringilla suscipit, ipsum magna iaculis purus, ut dapibus dui arcu ac ligula.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Options Modal */}
      {isOptionsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={closeModal}>
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                <div className="px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Options Modal</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button onClick={() => setIsOptionsModalOpen(false)} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                      {/* Demo options data */}
                      <p className="text-sm text-gray-500 text-justify">Option 1</p>
                      <p className="text-sm text-gray-500 text-justify">Option 2</p>
                      <p className="text-sm text-gray-500 text-justify">Option 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
