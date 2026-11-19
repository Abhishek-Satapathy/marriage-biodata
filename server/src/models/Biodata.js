
import mongoose from 'mongoose'

const biodataSchema = new mongoose.Schema(
  {
    personalDetails: {
      fullName: String,
      dateOfBirthCertificate: Date,
      dateOfBirthOriginal: Date,
      dateOfTime: String, // HH:mm format
      zodiacSign: String,
      star: String,
      gender: String,
      height: String,
      religion: String,
      gotra: String,
      caste: String,
      motherTongue: String,
      maritalStatus: String,
      nationality: String,
      currentAddress: String,
      permanentAddress: String,
      mobileNumber: String,
      email: String,
      eatingHabits: String
    },

    familyDetails: {
      fatherName: String,
      fatherOccupation: String,
      motherName: String,
      motherOccupation: String,
      brothers: Number,
      sisters: Number,
      familyAddress: String
    },

    educationDetails: [
      {
        qualification: String,
        institution: String,
        passingYear: Number
      }
    ],

    professionalDetails: {
      occupation: String,
      designation: String,
      companyName: String,
      annualIncome: String,
      workLocation: String
    },

    profilePhoto: {
      url: String,
      fileId: String
    },

    kundaliPhoto: {
      url: String,
      fileId: String
    },

    otherPhotos: [
      {
        url: String,
        fileId: String
      }
    ],

    socialLinks: {
      instagram: String,
      facebook: String,
      x: String,
      youtube: String,
      website: String
    }
  },
  {
    timestamps: true
  }
)

const Biodata = mongoose.model('Biodata', biodataSchema)

export default Biodata
