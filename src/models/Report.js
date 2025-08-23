import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdfLink: { type: String, required: true },
  year: { type: Number, required: true },
  spendingDetails: [
    {
      category: { type: String, required: true },
      amount: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);