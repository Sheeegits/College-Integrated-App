import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
    {
        name : {type: String, required : true},
        location : {type: String, required : true},
        ranking : {  type: Number, required: true },
        brochure : { type: String, required: true},
        image : { type: String, required: true },
        collegeInfo : { type: String, required: true}
    },
    { timestamp: true }
);
const College = mongoose.model("College", CollegeSchema);
export default College;