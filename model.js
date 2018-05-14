var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var hospitalSchema = new Schema({
  	hospitalName: {
            type: String,
            required: true
        },
        hospitalAddress1: { type: String},
        hospitalAddress2: { type: String},
        hospitalAddress3: { type: String},
	hospitalPhoneNumber: { type: Number },
	RecipientName: { type: String },
	RecipientBloodGroup: { type: String },
	AcceptableDonorBloodGroup: { type: String },
	BloodNeedUrgent: { type: String },
	Unit: { type: Number }
       
});


var donorSchema = new Schema({
  	donarName: {
            type: String,
            required: true
        },
        donorAddress1: { type: String},
	donorAddress2: { type: String},
	donorAddress3: { type: String},
	donorPhoneNumber: { type: Number },
	donorBloodGroup: { type: String },
	AcceptableRecipientBloodGroup: { type: String },
	BloodDonoteExperience: { type: String },
	lastBloodDonatedDate: { type: Date },
	hospitalSchemaRef: { type: String } 
       
});

// the schema is useless so far
// we need to create a model using it
var hospital = mongoose.model('Hospital', hospitalSchema);
var donor = mongoose.model('Donor', donorSchema);

// make this available to our users in our Node applications
module.exports.hospital = hospital;
module.exports.donor = donor;
