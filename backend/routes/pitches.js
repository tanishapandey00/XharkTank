const express = require("express");
const pitchs = require("../models/pitch");
const router = express.Router();

const mongoose = require("mongoose");
//Posting the Pitch By Investor
//validator function
const AddEndpointRules = {
  entrepreneur: "string",
  pitchTitle: "string",
  pitchIdea: "string",
  askAmount: "number",
  equity: "number",
};
const AddOfferEndpointRules = {
  investor: "string",
  amount: "number",
  equity: "number",
  comment: "string",
};
function matches(body, rules) {
  for (let attribute in rules) {
    if (typeof body[attribute] !== typeof rules[attribute]) {
      return false;
    }
  }
  return true;
}

router.post("/pitches", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log("Empty Request");
    res.status(400).send({ message: "Empty Pitch" });
  } else if (
    !req.body.entrepreneur ||
    !req.body.pitchTitle ||
    !req.body.pitchIdea ||
    !req.body.askAmount ||
    !req.body.equity ||
    req.body.equity > 100 ||
    typeof req.body.entrepreneur !== "string" ||
    typeof req.body.pitchTitle !== "string" ||
    typeof req.body.pitchIdea !== "string" ||
    typeof req.body.askAmount !== "number" ||
    typeof req.body.equity !== "number"
  ) {
    res.status(400).send({ message: "Missing Property" });
    console.log("Wrong Request");
    console.log({ message: req.body });
  } else {
    const pitch = new pitchs({
      entrepreneur: req.body.entrepreneur,
      pitchTitle: req.body.pitchTitle,
      pitchIdea: req.body.pitchIdea,
      askAmount: req.body.askAmount,
      equity: req.body.equity,
      offers: [],
    });
    try {
      await pitch.save();
      res.status(201).send({ id: pitch.id });
      console.log({ message: req.body });
      console.log("success");
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  }
});

router.post("/pitches/:pitchId/makeOffer", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log("Empty Request");
    res.status(400).send({ message: "Offer Body is Empty" });
  } else if (
    !req.body.investor ||
    !req.body.amount ||
    !req.body.equity ||
    !req.body.comment ||
    req.body.equity > 100 ||
    typeof req.body.investor !== "string" ||
    typeof req.body.amount !== "number" ||
    typeof req.body.equity !== "number" ||
    typeof req.body.comment !== "string"
  ) {
    console.log("Wrong Request");
    console.log({ message: req.body });
    res.status(400).send({ message: "Invalid Property parameter" });
  } else {
    const pitchId = req.params.pitchId;
    const investor = req.body.investor;
    const amount = req.body.amount;
    const equity = req.body.equity;
    const comment = req.body.comment;
    const newID = mongoose.Types.ObjectId();

    pitchs.findByIdAndUpdate(
      { _id: pitchId },
      {
        $push: {
          offers: {
            id: newID,
            investor: investor,
            amount: amount,
            equity: equity,
            comment: comment,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (err) {
          console.log(message.err);
          res.status(400).send({ message: message.err });
        } else if (data == null) {
          res.status(404).send({ message: "Id doesnot Exist" });
        } else {
          // console.log(data);
          // console.log(data.offers);
          // console.log(data.offers.length);
          data.save();
          // const newOffer = data.offers.slice('offers',-1);
          // console.log({id : newID})
          console.log({ message: req.body });
          res.status(200).send({ id: newID });
          console.log("success");
        }
      }
    );
  }
});

router.get("/pitches", async (req, res) => {
  try {
    const pitch = await pitchs.find().sort({ _id: -1 });
    if (!pitch) {
      res.status(404).send({ message: "Empty List" });
    } else {
      res.status(200).send(pitch);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//get a specific pitch
router.get("/pitches/:pitchId", async (req, res) => {
  const pitchId = req.params.pitchId;
  await pitchs
    .findById(pitchId)
    .then((pitch) => {
      if (!pitch) {
        res.status(404).send({ message: "ID does not exist" });
      } else {
        res.status(200).send(pitch);
      }
    })
    .catch((err) => res.status(400).send({ message: err.message }));
  // try {
  //   const pitch = await findById(pitchId).populate('offers');
  //   if (!pitch)  res.status(404);
  //   else {
  //     res.status(200).send(pitch);
  //   }
  // } catch (err) {
  //    res.status(400);
  // }
});
module.exports = router;
