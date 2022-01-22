import app from "./app";
import config from "./config";

const { PORT } = config;

app.on("error", (error) => {
  console.log(error);
});

process.on("unhandledRejection", (reason) => {
  console.log(reason);
});

process.on("uncaughtException", (error) => {
  console.log(error);
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
