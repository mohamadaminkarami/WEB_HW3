import app from "./app";
import config from "./config";

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT},`);
});
