import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  text: String
}, { timestamps: true });

export default model("Note", noteSchema);