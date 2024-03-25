const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    experience: {
      type: String,
      required: [true, 'Please add a years of experience'],
    },
    expertise: {
      type: String,
      required: [true, 'Please add a years of expertise'],
    },
    picture: {
      type: String,
      required: [true, 'Please add link to picture'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Cascade delete bookings when a dentist is deleted
DentistSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    console.log(`Bookings being removed from dentist ${this._id}`);
    await this.model('Booking').deleteMany({ dentist: this._id });
    next();
  }
);

module.exports = mongoose.model('Dentist', DentistSchema);
