import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  //title: String,
  name: { type: String, required: true }, //same as above
  //createdAt: Date,
  //hashtags: [{ type: String }],
  //meta: {
  //  views: Number,
  //  rating: Number,
  //},
});

const Graduate = mongoose.model("Graduate", userSchema);

export default Graduate;
