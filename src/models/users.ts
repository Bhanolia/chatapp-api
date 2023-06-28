import mongoose from "mongoose";

// Make User Schema
const userScheme = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// make userScheme to Mongo model "userModel"
export const userModel = mongoose.model("user", userScheme);

// Read User
export const getUser = () => userModel.find();
export const getUserByEmail = (email: String) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: String) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: String) => userModel.findById({ id });

// Create User
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject);

// Delete User
export const deleteUserById = (id: String) =>
  userModel.findOneAndDelete({ _id: id });

// Update User
export const UpdateUserById = (id: String, values: Record<string, any>) =>
  userModel.findByIdAndUpdate({ id, values });
