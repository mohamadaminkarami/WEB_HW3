export default function validateBody(schema) {
  return async (ctx, next) => {
    const { body } = ctx.request;
    try {
      await schema.validate(body);
    } catch (error) {
      ctx.badRequest({ errors: error.errors });
      return;
    }
    await next();
  };
}
