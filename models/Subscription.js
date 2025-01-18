import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  subscription: {
    endpoint: {
      type: String,
      required: true,
      unique: true
    },
    keys: {
      p256dh: String,
      auth: String
    },
    expirationTime: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription; 