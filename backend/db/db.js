import mongoose from "mongoose";

const Connection = async (userName, passWord) => {
  const URL = `mongodb+srv://${userName}:${passWord}@blogapp.aukq15f.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL);
    console.log("connected");
  } catch (err) {
    console.log(err.message);
  }
};
export default Connection;
