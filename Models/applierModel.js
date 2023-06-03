const mongoose = require("mongoose");
const mongooseSerial = require("mongoose-serial")
const domicileSchema = new mongoose.Schema(
  {
    serialNumber:{
      type:String
    },
    fullName: {
      type: String,
     
    },
    FatherName: {
      type: String,
     
    },

    phone: {
      type: String,
    },
    CNIC: {
      type: String,
    
      unique: true,
    },
    Current_address: {
      type: String,
      
    },
    Tehsil: {
      type: String,
     
    },
    Permanent_address: {
      type: String,
      
    },
    Distract: {
      type: String,
     
    },
    images: [String],

    entryDate: [Date],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    relationName: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//  domicileSchema.plugin(mongooseSerial, { field:"serialNumber", digits:4})
 domicileSchema.plugin(mongooseSerial, { field:"serialNumber"})
module.exports = mongoose.model("domicile", domicileSchema);
