import Router from "@koa/router";
import validateNoteIdParams from "./validators/validate-note-id-params";
import { User, Note } from "./database/models";
import validateBody from "./validators/validate-body";
import { NOTE_POST_REQUEST_SCHEMA, NOTE_PUT_REQUEST_SCHEMA, USER_REGISTER_AND_LOGIN_REQUEST_BODY } from "./validators/schemas";

const router = new Router();

router.post("/user/login", validateBody(USER_REGISTER_AND_LOGIN_REQUEST_BODY), async (ctx) => {
  const {
    request: {
      body: { username, password },
    },
  } = ctx;

  const user = await User.findOne({ where: { username, password, isSuperuser: false } });
  if (user) {
    ctx.body = { message: "you have logged in successfully" };
  } else {
    ctx.notFound({ errors: ["user with this username and password does not exist"] });
  }
});

router.post("/user/register", validateBody(USER_REGISTER_AND_LOGIN_REQUEST_BODY), async (ctx) => {
  const {
    request: {
      body: { username, password },
    },
  } = ctx;
  try {
    const newUser = await User.create({ username, password, isSuperuser: false });
    ctx.body = { message: "user has been created successfully" };
  } catch (error) {
    ctx.badRequest({ errors: error.errors.map((err) => err.message) });
  }
});

router.get("/notes", async (ctx) => {
  ctx.body = await Note.findAll();
});

router.get("/notes/:noteId", validateNoteIdParams(), async (ctx) => {
  const { noteId } = ctx.params;
  // TODO implement caching
  const note = await Note.findByPk(noteId);
  if (note) {
    ctx.body = note;
  } else {
    ctx.notFound({ message: `note with id ${noteId} not found!` });
  }
});

router.post("/notes/new", validateBody(NOTE_POST_REQUEST_SCHEMA), async (ctx) => {
  const {
    request: {
      body: { title, detail },
    },
  } = ctx;
  const newNote = await Note.create({ title, detail, authorId: 1 });
  if (newNote) {
    ctx.body = newNote;
  } else {
    ctx.body = "oops";
  }
});

router.put("/notes/:noteId", validateNoteIdParams(), validateBody(NOTE_PUT_REQUEST_SCHEMA), async (ctx) => {
  const {
    params: { noteId },
    request: {
      body: { title, detail },
    },
  } = ctx;
  const updatedValues = {};
  if (title) {
    updatedValues.title = title;
  }
  if (detail) {
    updatedValues.detail = detail;
  }
  const [isUpdate, updatedNote] = await Note.update(updatedValues, { where: { id: noteId }, returning: true });
  if (isUpdate) {
    ctx.body = updatedNote;
  } else {
    ctx.notFound({ message: `note with id ${noteId} not found!` });
  }
});

router.delete("/notes/:noteId", validateNoteIdParams(), async (ctx) => {
  const { noteId } = ctx.params;
  // TODO delete from cache
  const isDeleted = await Note.destroy({ where: { id: noteId } });
  if (isDeleted) {
    ctx.ok({ message: `note with id ${noteId} deleted` });
  } else {
    ctx.notFound({ message: `note with id ${noteId} not found!` });
  }
});

export default router;
