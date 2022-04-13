module.exports = (mongoose) => {
  const Property = mongoose.model(
    "property",
    mongoose.Schema(
      {
        propertyID: Number,
        propertyName: String,
        address: String,
        district: String,
        price: String,
        photos1: String,
        photos2: String,
        photos3: String,
        photos4: String,
        photos5: String,
        photos6: String,
        wifi: String,
        parking: String,
        disabledParking: String,
        bouncers: String,
      },
      { timestamps: true }
    )
  );
  return Property;
};
