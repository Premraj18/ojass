import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  ojassId: String,
  college: String,
  isNitJsr: Boolean,
  paid: {
    type: Boolean,
    default: false
  },
  idCardUrl: String,
  registrationDate: {
    type: Date,
    default: Date.now
  },
  events: [String], // Array of event IDs
  eventDetails: [{ // Array of event registration details
    eventId: String,
    eventName: String,
    registrationDate: Date,
    isTeamLeader: Boolean,
    teamMembers: [String], // Array of team member OJASS IDs
    isTeamMember: Boolean,
    teamLeader: String // OJASS ID of team leader
  }],
  payment: {
    receiptId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    amount: Number,
    date: Date,
    status: String
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User; 