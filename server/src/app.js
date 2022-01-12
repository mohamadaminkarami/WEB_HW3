import Koa from "koa";
import bodyParser from "koa-bodyparser";
import router from "./router";

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

export default app;
