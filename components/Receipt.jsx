const Receipt = ({ user, onClose }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get payment details with fallbacks
  const paymentDetails = {
    receiptId: user.payment?.receiptId || 'N/A',
    date: user.payment?.date || user.paymentDate,
    amount: user.payment?.amount || user.paidAmount || 0,
    status: user.payment?.status || (user.paid ? 'completed' : 'pending')
  };

  console.log('User payment data:', {
    payment: user.payment,
    paymentId: user.paymentId,
    paymentDate: user.paymentDate
  });

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 top-0" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg p-8 print:p-0 print:shadow-none print:bg-white text-gray-900">
          {/* Back Button - Hidden in Print */}
          <button 
            onClick={onClose}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 print:hidden"
          >
            ← Back to Dashboard
          </button>

          {/* Receipt Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-600">OJASS 2025</h1>
              <p className="text-gray-600 mt-1">National Institute of Technology, Jamshedpur</p>
            </div>

            <hr className="border-gray-200" />

            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Payment Receipt</h2>
            </div>

            {/* Receipt Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Receipt No:</p>
                <p className="font-medium text-gray-900">{paymentDetails.receiptId}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Payment Date:</p>
                <p className="font-medium text-gray-900">{formatDate(paymentDetails.date)}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-2">
                <p className="text-gray-600">Participant Name:</p>
                <p className="font-medium text-gray-900 text-right">{user.name}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-gray-600">OJASS ID:</p>
                <p className="font-medium text-gray-900 text-right">{user.ojassId}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-gray-600">Email:</p>
                <p className="font-medium text-gray-900 text-right">{user.email}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-gray-600">College:</p>
                <p className="font-medium text-gray-900 text-right">{user.college}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-gray-600">Registration Type:</p>
                <p className="font-medium text-gray-900 text-right">
                  {user.isNitJsr ? 'NIT Jamshedpur Student' : 'Other College Student'}
                </p>
              </div>
              <div className="grid grid-cols-2 pt-4 border-t">
                <p className="text-gray-600">Registration Phase:</p>
                <p className="font-medium text-gray-900 text-right">{user.registrationPhase}</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-gray-600">Payment Status</p>
                  <p className="text-green-600 font-medium">
                    {paymentDetails.status === 'completed' ? 'Paid' : 'Pending'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Amount Paid</p>
                  <p className="text-blue-600 text-2xl font-bold">₹{paymentDetails.amount}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 space-y-4">
              <p>This is a computer generated receipt and does not require a physical signature.</p>
              <p>For any queries related to registration, please contact: support@ojass.in</p>
              <hr className="my-4" />
              <div className="text-xs text-gray-400">
                <p>
                  Payment processing is maintained by{' '}
                  <a 
                    href="https://digicraft.one" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    DigiCraft.one
                  </a>
                </p>
                <p>For payment related issues, please contact: support@digicraft.one</p>
              </div>
            </div>

            {/* Print Button - Hidden in Print */}
            <div className="text-center mt-8 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 