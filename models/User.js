import mongoose from 'mongoose';

// Function to generate random OJASS ID
function generateOjassId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'OJASS-';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Helper function to get prices from env with fallbacks
const getPrices = () => ({
  nitJsrEarly: parseInt(process.env.NITJSR_EARLY_PRICE) || 1,
  nitJsrRegular: parseInt(process.env.NITJSR_REGULAR_PRICE) || 2,
  otherEarly: parseInt(process.env.OTHER_EARLY_PRICE) || 3,
  otherRegular: parseInt(process.env.OTHER_REGULAR_PRICE) || 4
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  ojassId: {
    type: String,
    unique: true,
    default: generateOjassId
  },
  isNitJsr: {
    type: Boolean,
    required: [true, 'Please specify if you are from NIT Jamshedpur'],
    default: false
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  idCardUrl: {
    type: String,
    required: [true, 'ID Card image is required']
  },
  paymentId: {
    type: String,
    sparse: true
  },
  paymentDate: {
    type: Date
  },
  payment: {
    receiptId: {
      type: String,
      sparse: true
    },
    razorpayOrderId: {
      type: String,
      sparse: true
    },
    razorpayPaymentId: {
      type: String,
      sparse: true
    },
    amount: {
      type: Number,
      default: 0
    },
    date: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  events: [{
    type: String,  // Event IDs
    sparse: true
  }],
  eventDetails: [{
    eventId: String,
    eventName: String,
    registrationDate: Date
  }]
}, { 
  timestamps: true,
  // Add this to ensure virtuals are included in the response
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update required payment amount calculation
userSchema.virtual('requiredAmount').get(function() {
  const registrationDate = this.registrationDate || new Date();
  const earlyBirdDeadline = new Date('2024-01-01');
  const prices = getPrices();
  
  if (this.isNitJsr) {
    return registrationDate <= earlyBirdDeadline ? prices.nitJsrEarly : prices.nitJsrRegular;
  } else {
    return registrationDate <= earlyBirdDeadline ? prices.otherEarly : prices.otherRegular;
  }
});

// Add virtual for registration phase
userSchema.virtual('registrationPhase').get(function() {
  const now = new Date();
  const earlyBirdDeadline = new Date('2024-01-01');
  
  return now <= earlyBirdDeadline ? 'Early Bird' : 'Regular';
});

// Ensure unique OJASS ID before saving
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
      const ojassId = generateOjassId();
      const existingUser = await this.constructor.findOne({ ojassId });
      
      if (!existingUser) {
        this.ojassId = ojassId;
        isUnique = true;
      }
      attempts++;
    }
    
    if (!isUnique) {
      throw new Error('Unable to generate unique OJASS ID');
    }
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema); 