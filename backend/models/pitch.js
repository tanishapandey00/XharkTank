const mongoose = require("mongoose");

const PitchSchema = new mongoose.Schema(
  {
    entrepreneur: {
      type: String,
    },
    pitchTitle: {
      type: String,
    },
    pitchIdea: {
      type: String,
    },
    askAmount: {
      type: Number,
    },
    equity: {
      type: Number,
    },
    offers: [
      {
        id: {
          type: String,
        },
        investor: {
          type: String,
        },
        amount: {
          type: Number,
        },
        equity: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
  }
  // { timestamps: true }
);

PitchSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
PitchSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const pitch = mongoose.model("Pitch", PitchSchema);
module.exports = pitch;
