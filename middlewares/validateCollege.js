const validateCollege = (req, res, next) => {
  console.log("Received Body:", req.body);
  console.log("Received Files:", req.files);

  const { name, location, ranking, collegeInfo } = req.body;
  
  // ✅ Since `req.files` is an object, access files correctly
  const image = req.files?.image ? req.files.image[0].path : null;
  const brochure = req.files?.brochure ? req.files.brochure[0].path : null;

  let missingFields = [];

  if (!name) missingFields.push("name");
  if (!location) missingFields.push("location");
  if (!ranking) missingFields.push("ranking");
  if (!collegeInfo) missingFields.push("collegeInfo");
  if (!image) missingFields.push("image");
  if (!brochure) missingFields.push("brochure");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following required fields are missing: ${missingFields.join(", ")}`,
    });
  }

  next();
};

export default validateCollege;
