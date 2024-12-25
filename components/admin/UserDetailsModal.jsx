import { useState } from 'react';

const UserDetailsModal = ({ user, eventData, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isFullScreen) {
        setIsFullScreen(false);
      } else {
        onClose();
      }
    }
  };

  // Full screen ID card view
  if (isFullScreen && user.idCardUrl) {
    return (
      <div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div className="relative max-w-full max-h-full p-4">
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
          >
            ×
          </button>
          <img 
            src={user.idCardUrl} 
            alt="College ID"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Personal Details</h3>
              <div className="space-y-2">
                <p className="text-gray-300">OJASS ID: {user.ojassId}</p>
                <p className="text-gray-300">Email: {user.email}</p>
                <p className="text-gray-300">College: {user.college}</p>
                <p className="text-gray-300">Registration Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  Status: <span className={user.paid ? 'text-green-400' : 'text-red-400'}>
                    {user.paid ? 'Paid' : 'Pending'}
                  </span>
                </p>
                {user.paid && (
                  <>
                    <p className="text-gray-300">Amount: ₹{user.paidAmount}</p>
                    <p className="text-gray-300">Payment Date: {new Date(user.payment?.date).toLocaleDateString()}</p>
                    <p className="text-gray-300">Receipt ID: {user.payment?.receiptId}</p>
                    <p className="text-gray-300">Payment ID: {user.payment?.razorpayPaymentId}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ID Card with click to expand */}
          {user.idCardUrl && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">College ID Card</h3>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity inline-block"
                onClick={() => setIsFullScreen(true)}
              >
                <img 
                  src={user.idCardUrl} 
                  alt="College ID" 
                  className="max-w-md rounded-lg border border-gray-700"
                />
                <p className="text-sm text-gray-400 mt-2">Click to view full screen</p>
              </div>
            </div>
          )}

          {/* Registered Events */}
          {user.events?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Registered Events</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {user.events.map(eventId => {
                  const event = eventData.flat().find(e => e.id === eventId);
                  return event ? (
                    <div key={eventId} className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-white">{event.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Registration Date: {
                          user.eventDetails?.find(e => e.eventId === eventId)?.registrationDate
                          ? new Date(user.eventDetails.find(e => e.eventId === eventId).registrationDate).toLocaleDateString()
                          : 'N/A'
                        }
                      </p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal; 