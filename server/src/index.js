import app from "./app";
import config from "./config";

const { PORT } = config;

app.on("error", (error) => {
  console.log(error);
});

process.on("unhandledRejection", (reason) => {
  // I just caught an unhandled promise rejection,
  // let's throw it here so my central error handler can catch it
  throw new Error(reason, 500);
});

process.on("uncaughtException", (error) => {
  // I just received an error that was never handled, time to handle it
  // by throwing it so my error handling middleware can catch it
  console.log(error);
  throw new Error("Error", 500);
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
