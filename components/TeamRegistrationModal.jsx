import { useState } from 'react';
import toast from 'react-hot-toast';
import TeamMemberInput from './TeamMemberInput';

const TeamRegistrationModal = ({ event, user, onClose, onSuccess }) => {
  const teamSizeMin = parseInt(event.teamSizeMin);
  const teamSizeMax = parseInt(event.teamSizeMax);
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState(() => {
    // Initialize required team members
    return Array(teamSizeMin - 1).fill({ id: '', verified: false, name: '' });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate team members
    const requiredMembers = teamMembers.slice(0, teamSizeMin - 1);
    if (!requiredMembers.every(member => member.verified)) {
      toast.error('Please verify all required team members');
      return;
    }

    try {
      setLoading(true);

      // Get verified member IDs
      const verifiedMembers = teamMembers
        .filter(member => member.verified)
        .map(member => member.id);

      const res = await fetch('/api/register-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          eventId: event.id,
          eventName: event.name,
          teamMembers: verifiedMembers
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      onSuccess(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyMember = async (index) => {
    try {
      const member = teamMembers[index];
      const res = await fetch(`/api/verify-member?ojassId=${member.id}`);
      const data = await res.json();

      if (data.status === 'not_found') {
        const updatedMembers = [...teamMembers];
        updatedMembers[index] = {
          ...teamMembers[index],
          status: null,
          verified: false,
          name: ''
        };
        setTeamMembers(updatedMembers);
        throw new Error(data.message);
      }

      if (data.status === 'not_paid') {
        // Update member with not paid status
        const updatedMembers = [...teamMembers];
        updatedMembers[index] = {
          ...member,
          status: 'not_paid',
          name: data.name
        };
        setTeamMembers(updatedMembers);
        throw new Error(`${member.id} hasn't completed registration payment`);
      }

      if (data.events?.includes(event.id)) {
        throw new Error(`${member.id} is already registered for this event`);
      }

      // Update member verification status
      const updatedMembers = [...teamMembers];
      updatedMembers[index] = {
        ...member,
        verified: true,
        status: 'verified',
        name: data.name
      };
      setTeamMembers(updatedMembers);
      toast.success(`Verified: ${data.name}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = {
      id: value,
      verified: false,
      status: null,
      name: ''
    };
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    if (teamMembers.length < teamSizeMax - 1) {
      setTeamMembers([...teamMembers, { id: '', verified: false, name: '' }]);
    }
  };

  const removeTeamMember = (index) => {
    if (index >= teamSizeMin - 1) {
      const newMembers = [...teamMembers];
      newMembers.splice(index, 1);
      setTeamMembers(newMembers);
    }
  };

  const isTeamValid = () => {
    const requiredMembers = teamMembers.slice(0, teamSizeMin - 1);
    return requiredMembers.every(member => member.verified);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Register Team for {event.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-white">Team Leader</p>
              <p className="text-sm text-gray-400">{user.name} ({user.ojassId})</p>
            </div>

            {teamMembers.map((member, index) => (
              <TeamMemberInput
                key={index}
                index={index}
                member={member}
                isRequired={index < teamSizeMin - 1}
                onVerify={verifyMember}
                onChange={handleMemberChange}
                onRemove={removeTeamMember}
                disabled={loading}
              />
            ))}
          </div>

          {teamMembers.length < teamSizeMax - 1 && (
            <button
              type="button"
              onClick={addTeamMember}
              className="w-full py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
            >
              + Add Optional Team Member
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !isTeamValid()}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Team'}
          </button>
        </form>

        <div className="mt-4 space-y-2 text-sm text-gray-400">
          <p>* Required team members: {teamSizeMin} (including you)</p>
          <p>Maximum team size: {teamSizeMax} (including you)</p>
          <p>Note: All team members must be registered and have completed payment</p>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistrationModal;