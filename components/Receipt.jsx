import Image from 'next/image';

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

  return (
    <div className="min-h-screen w-full pt-20 pb-10 bg-[url('/bghero.webp')] bg-fixed bg-center bg-cover">
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/90 top-0" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg p-8 print:p-0 print:shadow-none print:bg-white text-gray-900 relative">
          {/* Watermark - Only visible in print */}
          <div className="hidden print:block absolute inset-0 pointer-events-none opacity-[0.08] -rotate-12">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/digicraft.svg"
                alt="DigiCraft Watermark"
                width={600}
                height={600}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Back Button - Hidden in Print */}
          <button 
            onClick={onClose}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 print:hidden"
          >
            ← Back to Dashboard
          </button>

          {/* Receipt Content */}
          <div className="space-y-6 relative">
            {/* Header */}
            <div className="mb-8 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Image
                      src="/ojassblack.png"
                      alt="OJASS Black Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-4xl font-bold text-[#2563EB]">OJASS 2025</h1>
                    <p className="text-gray-600">NIT Jamshedpur</p>
                  </div>
                </div>
                
                {/* DigiCraft Logo with glow effect */}
                <div className="relative w-32 h-12 flex items-center justify-center">
                  <div className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
                  <Image
                    src="/digicraft.svg"
                    alt="DigiCraft Logo"
                    width={96}
                    height={48}
                    className="object-contain relative z-10"
                    priority
                  />
                </div>
              </div>
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
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium text-gray-900 text-right">{user.phone}</p>
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
              <div className="text-xs text-gray-400 space-y-2">
                <p>For payment related issues: digicraft.one@gmail.com | +91 8299797516</p>
                <p className="text-[11px] mt-2">Powered by DigiCraft</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center mt-8 print:hidden">
              <button
                onClick={() => {
                  // Create a timestamp for the filename
                  const timestamp = new Date().toISOString().split('T')[0];
                  const filename = `OJASS_Receipt_${user.ojassId}_${timestamp}.pdf`;
                  
                  // Open in new tab for download
                  window.open(`/api/download-receipt?userId=${user._id}&filename=${filename}`, '_blank');
                }}
                className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 