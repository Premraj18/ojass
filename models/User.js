import mongoose from 'mongoose';

// Function to generate random OJASS ID
function generateOjassId() {
  const timestamp = Date.now().toString(36).toUpperCase(); // Convert timestamp to base36
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'OJASS-';
  
  // Add first 2 chars from timestamp
  result += timestamp.slice(0, 2);
  
  // Add 4 random characters
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  
  return result;
}

// Helper function to get prices from env with fallbacks
const getPrices = () => ({
  nitJsrEarly: parseInt(process.env.NEXT_PUBLIC_NITJSR_EARLY_PRICE) || 1,
  nitJsrRegular: parseInt(process.env.NEXT_PUBLIC_NITJSR_REGULAR_PRICE) || 2,
  otherEarly: parseInt(process.env.NEXT_PUBLIC_OTHER_EARLY_PRICE) || 3,
  otherRegular: parseInt(process.env.NEXT_PUBLIC_OTHER_REGULAR_PRICE) || 4
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
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  ojassId: {
    type: String,
    required: [true, 'OJASS ID is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return v && v.startsWith('OJASS-') && v.length === 12;
      },
      message: props => `${props.value} is not a valid OJASS ID!`
    }
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  isNitJsr: {
    type: Boolean,
    required: [true, 'Please specify if you are from NIT Jamshedpur'],
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  idCardUrl: {
    type: String,
    required: [true, 'ID Card image is required']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  events: [{
    type: String,
    sparse: true
  }],
  eventDetails: [{
    eventId: String,
    eventName: String,
    registrationDate: Date,
    isTeamLeader: Boolean,
    teamMembers: [String],
    isTeamMember: Boolean,
    teamLeader: String
  }],
  referralCode: {
    type: String,
    trim: true,
    sparse: true
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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update the early bird deadline in the userSchema
const EARLY_BIRD_DEADLINE = new Date('2025-01-16');

// Update required payment amount calculation
userSchema.virtual('requiredAmount').get(function() {
  const registrationDate = this.registrationDate || new Date();
  const prices = getPrices();
  
  if (this.isNitJsr) {
    return registrationDate <= EARLY_BIRD_DEADLINE ? prices.nitJsrEarly : prices.nitJsrRegular;
  } else {
    return registrationDate <= EARLY_BIRD_DEADLINE ? prices.otherEarly : prices.otherRegular;
  }
});

// Add virtual for registration phase
userSchema.virtual('registrationPhase').get(function() {
  const now = new Date();
  return now <= EARLY_BIRD_DEADLINE ? 'Early Bird' : 'Regular';
});

// Initialize OJASS ID before validation
userSchema.pre('validate', async function(next) {
  try {
    if (!this.ojassId) {
      let isUnique = false;
      let attempts = 0;
      let generatedId;
      
      while (!isUnique && attempts < 20) {
        generatedId = generateOjassId();
        const existingUser = await this.constructor.findOne({ ojassId: generatedId });
        
        if (!existingUser) {
          this.ojassId = generatedId;
          isUnique = true;
        }
        attempts++;
      }
      
      if (!isUnique) {
        throw new Error('Failed to generate unique OJASS ID after multiple attempts');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Additional validation before save
userSchema.pre('save', function(next) {
  if (!this.ojassId) {
    next(new Error('OJASS ID is required and must be generated before saving'));
    return;
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User; 