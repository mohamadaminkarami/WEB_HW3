import Router from "@koa/router";

const router = new Router();

router.get("/test", async (ctx) => {
  ctx.body = "hi";
});

export default router;
