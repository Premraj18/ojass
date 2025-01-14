"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import eventData from '@/app/event/event.json';
import toast from 'react-hot-toast';
import UserDetailsModal from '@/components/admin/UserDetailsModal';
import AdminNav from '@/components/admin/AdminNav';

const TeamDetailsPopover = ({ participant, eventDetails, event, onClose }) => {
  if (!eventDetails || !event) return null;

  const isTeamEvent = parseInt(event.teamSizeMax) > 1;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4 relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        <h3 className="text-xl font-semibold text-white mb-4">
          {event.name}
        </h3>
        
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Participant Info */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-medium text-white">{participant.name}</h4>
              <span className={`px-2 py-1 rounded-full text-sm ${
                eventDetails.isTeamLeader ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {eventDetails.isTeamLeader ? 'Team Leader' : 'Team Member'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-400">OJASS ID: <span className="text-gray-200">{participant.ojassId}</span></p>
              <p className="text-gray-400">College: <span className="text-gray-200">{participant.college}</span></p>
              <p className="text-gray-400">Email: <span className="text-gray-200">{participant.email}</span></p>
              <p className="text-gray-400">Phone: <span className="text-gray-200">{participant.phone}</span></p>
            </div>
          </div>

          {/* Team Information */}
          {isTeamEvent && (
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-3">Team Details</h4>
              
              {eventDetails.isTeamLeader ? (
                <>
                  <p className="text-gray-400 mb-2">Team Members ({eventDetails.teamMembers?.length || 0}):</p>
                  <div className="space-y-2">
                    {eventDetails.teamMembers?.map((memberId, idx) => (
                      <div key={idx} className="bg-gray-600/50 p-2 rounded flex items-center justify-between">
                        <span className="text-gray-200">{memberId}</span>
                        <span className="text-xs text-gray-400">Member {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-400">Team Leader:</p>
                  <div className="bg-gray-600/50 p-2 rounded mt-1">
                    <span className="text-gray-200">{eventDetails.teamLeader}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Event & Registration Details */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-white mb-3">Registration Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Registration Date:</span>
                <span className="text-gray-200">
                  {new Date(eventDetails.registrationDate).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Payment Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  participant.paid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {participant.paid ? 'Paid' : 'Payment Pending'}
                </span>
              </div>
              {participant.payment && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Payment Amount:</span>
                    <span className="text-gray-200">₹{participant.payment.amount || 0}</span>
                  </div>
                  {participant.payment.razorpayPaymentId && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Payment ID:</span>
                      <span className="text-gray-200">{participant.payment.razorpayPaymentId}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [eventParticipants, setEventParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTeamDetails, setSelectedTeamDetails] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminToken');
    if (!isAdmin) {
      router.push('/admin');
    } else {
      // Load all students on initial render
      fetchAllStudents(1);
    }
  }, [router]);

  const fetchAllStudents = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/all-users?page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();
      
      if (res.ok) {
        setSearchResults(data.users);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
        setPage(pageNum);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchAllStudents(1);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/search-users?q=${searchQuery}`);
      const data = await res.json();
      
      if (res.ok) {
        setSearchResults(data.users);
        setTotalPages(1); // Reset pagination for search results
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleEventSearch = async (eventId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/event-participants?eventId=${eventId}`);
      const data = await res.json();
      
      if (res.ok) {
        setEventParticipants(data.participants);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch event participants');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      localStorage.removeItem('adminToken');
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleParticipantClick = (participant) => {
    const event = eventData.flat().find(e => e.id === selectedEvent);
    const eventDetails = participant.eventDetails?.find(d => d.eventId === selectedEvent);
    
    if (event && eventDetails) {
      setSelectedTeamDetails({
        participant,
        eventDetails,
        event
      });
    } else {
      toast.error('Could not load team details');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <AdminNav onLogout={handleLogout} />

      {/* Tab Navigation - Fixed below header */}
      <div className="fixed top-16 left-0 right-0 z-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Student Search
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Event Participants
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto mt-32 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'students' ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Students</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or OJASS ID"
                  className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Search
                </button>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      fetchAllStudents(1);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {loading ? (
                <div className="text-center text-gray-400 py-8">Loading...</div>
              ) : (
                <>
                  <div className="space-y-4">
                    {searchResults.map(user => (
                      <div 
                        key={user._id} 
                        className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                            <p className="text-gray-300">OJASS ID: {user.ojassId}</p>
                            <p className="text-gray-300">College: {user.college}</p>
                            <p className="text-gray-300">Phone: {user.phone}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-300">
                              Status: <span className={user.paid ? 'text-green-400' : 'text-red-400'}>
                                {user.paid ? 'Paid' : 'Pending'}
                              </span>
                            </p>
                            {user.events?.length > 0 && (
                              <p className="text-gray-400 text-sm mt-1">
                                {user.events.length} Events Registered
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      <button
                        onClick={() => fetchAllStudents(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-white">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => fetchAllStudents(page + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Event Participants</h2>
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value);
                  handleEventSearch(e.target.value);
                }}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none mb-6"
              >
                <option value="">Select Event</option>
                {eventData.flat().map(event => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>

              <div className="space-y-4">
                {eventParticipants.map(participant => {
                  const eventDetails = participant.eventDetails?.find(d => d.eventId === selectedEvent);
                  const event = eventData.flat().find(e => e.id === selectedEvent);
                  const isTeamEvent = event && parseInt(event.teamSizeMax) > 1;
                  const registrationDate = eventDetails?.registrationDate || participant.registrationDate;

                  return (
                    <div 
                      key={participant._id} 
                      className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => handleParticipantClick(participant)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">{participant.name}</h3>
                            {isTeamEvent && eventDetails && (
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                eventDetails.isTeamLeader ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {eventDetails.isTeamLeader ? 'Leader' : 'Member'}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300">OJASS ID: {participant.ojassId}</p>
                          <p className="text-gray-300">College: {participant.college}</p>
                          <p className="text-gray-300">Phone: {participant.phone}</p>
                          
                          {isTeamEvent && eventDetails && (
                            <div className="mt-2">
                              {!eventDetails.isTeamLeader && eventDetails.teamLeader && (
                                <p className="text-gray-300">
                                  Team Leader: <span className="text-blue-400">{eventDetails.teamLeader}</span>
                                </p>
                              )}
                              {eventDetails.isTeamLeader && eventDetails.teamMembers && eventDetails.teamMembers.length > 0 && (
                                <div>
                                  <p className="text-gray-400">Team Size: {eventDetails.teamMembers.length + 1}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-sm flex flex-col items-end gap-2">
                          <span className={`px-2 py-1 rounded-full ${
                            participant.paid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {participant.paid ? 'Paid' : 'Unpaid'}
                          </span>
                          {registrationDate && (
                            <p className="text-gray-400">
                              {new Date(registrationDate).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {selectedEvent && eventParticipants.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No participants found for this event
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <p>
              For admin panel related issues, contact Ayush:{' '}
              <a 
                href="tel:+918299797516" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                +91 8299797516
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* User Details Modal - Only for student search */}
      {activeTab === 'students' && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          eventData={eventData}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Team Details Popover - For event participants */}
      {selectedTeamDetails && (
        <TeamDetailsPopover
          participant={selectedTeamDetails.participant}
          eventDetails={selectedTeamDetails.eventDetails}
          event={selectedTeamDetails.event}
          onClose={() => setSelectedTeamDetails(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 