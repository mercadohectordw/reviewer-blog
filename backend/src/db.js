const {connect} = require("mongoose");

module.exports.dbConnect = () => {
  connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Mongoose is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};