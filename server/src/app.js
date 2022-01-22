import Koa from "koa";
import bodyParser from "koa-bodyparser";
import respond from "koa-respond";
import cors from "@koa/cors";
import router from "./routes";
import requestLimiter from "./middlewares/request-rate-limiter";

const app = new Koa();

app.use(respond());
app.use(bodyParser());
app.use(cors());
app.use(requestLimiter({ errorMessage: "Sometimes You Just Have to Slow Down." }));
app.use(router.routes());

export default app;
