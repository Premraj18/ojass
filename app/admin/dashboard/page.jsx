"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import eventData from '@/app/event/event.json';
import toast from 'react-hot-toast';
import UserDetailsModal from '@/components/admin/UserDetailsModal';
import AdminNav from '@/components/admin/AdminNav';

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

  const handleParticipantClick = async (participantId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/user/${participantId}`);
      const data = await res.json();
      
      if (res.ok) {
        setSelectedUser(data.user);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error('Failed to fetch user details');
    } finally {
      setLoading(false);
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
              <div className="flex gap-2 mb-6">
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
                {eventParticipants.map(participant => (
                  <div 
                    key={participant._id} 
                    className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => handleParticipantClick(participant._id)}
                  >
                    <h3 className="text-lg font-semibold text-white">{participant.name}</h3>
                    <p className="text-gray-300">OJASS ID: {participant.ojassId}</p>
                    <p className="text-gray-300">College: {participant.college}</p>
                    <p className="text-gray-300">Registration Date: {new Date(participant.registrationDate).toLocaleDateString()}</p>
                  </div>
                ))}
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

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          eventData={eventData}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 