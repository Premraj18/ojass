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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ojassId: {
    type: String,
    unique: true,
    default: generateOjassId
  }
}, { timestamps: true });

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