import { useState } from 'react';
import toast from 'react-hot-toast';

const TeamMemberInput = ({ 
  index, 
  member, 
  isRequired, 
  onVerify, 
  onChange, 
  onRemove, 
  disabled 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!member.id || !member.id.match(/^OJASS-[0-9A-Z]{6}$/)) {
      toast.error('Invalid OJASS ID format');
      return;
    }

    setIsVerifying(true);
    try {
      await onVerify(index);
    } finally {
      setIsVerifying(false);
    }
  };

  const getInputStyle = () => {
    if (member.verified) {
      return 'bg-green-500/20 text-green-300 border-green-500';
    }
    if (member.status === 'not_paid') {
      return 'bg-red-500/20 text-red-300 border-red-500';
    }
    return 'bg-gray-700 text-white border-gray-600';
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={member.id}
          onChange={(e) => onChange(index, e.target.value.toUpperCase())}
          placeholder={`Team Member ${index + 2} OJASS ID${isRequired ? ' *' : ' (Optional)'}`}
          className={`flex-1 px-4 py-2 rounded-lg ${getInputStyle()} border focus:border-blue-500`}
          required={isRequired}
          disabled={disabled || isVerifying || member.verified}
        />
        
        {member.id && member.id.match(/^OJASS-[0-9A-Z]{6}$/) && !member.verified && (
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 whitespace-nowrap"
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        )}

        {!isRequired && !member.verified && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
          >
            ×
          </button>
        )}
      </div>

      {member.verified && (
        <p className="text-green-400 text-sm">✓ Verified: {member.name}</p>
      )}
      {member.status === 'not_paid' && (
        <p className="text-red-400 text-sm">⚠ Not Paid: {member.name}</p>
      )}
      <p className="text-xs text-gray-400">Format: OJASS-XXXXXX (X can be numbers or letters)</p>
    </div>
  );
};

export default TeamMemberInput;