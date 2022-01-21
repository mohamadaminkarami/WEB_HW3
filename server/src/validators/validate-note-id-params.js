import isNumber from "../utils/is-number";

export default function validateNoteIdParams() {
  return async (ctx, next) => {
    const { noteId } = ctx.params;
    if (!isNumber(noteId)) {
      ctx.badRequest({ errors: ["note id must be a number"] });
      return;
    }
    ctx.params.noteId = parseInt(noteId, 10);
    await next();
  };
}
