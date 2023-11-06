import { connect } from "mongoose";
const connnectDb = () => {
  connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Db Connected Successfuly!");
    })
    .catch((err) => {
      console.log(`Error connecting to DB ${err}`);
    });
};

export default connnectDb;
