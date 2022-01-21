import Koa from "koa";
import bodyParser from "koa-bodyparser";
import respond from "koa-respond";
import cors from "@koa/cors";
import router from "./routes";

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(respond());
app.use(router.routes());

export default app;
