import mongoose from "mongoose";

const connection = {};

export async function mongoConnect() {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use Previous connection to the database");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGO_URL);
  console.log("New Connection to the database");
  connection.isConnected = db.connections[0].readyState;
}

export async function mongoDisconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnedting from the database");
    }
  }
}

// export const mongoConnect = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("connected to database"))
//     .catch((err) => console.log(err));
// };
// export const mongoDisconnect = async () => {
//   await mongoose
//     .disconnect()
//     .then(() => console.log("disconnected from database"))
//     .catch((err) => console.log(err));
// };
