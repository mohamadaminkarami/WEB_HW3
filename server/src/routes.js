import Router from "@koa/router";
import validateNoteIdParams from "./validators/validate-note-id-params";
import { User, Note } from "./database/models";
import validateBody from "./validators/validate-body";
import { NOTE_POST_REQUEST_SCHEMA, NOTE_PUT_REQUEST_SCHEMA, USER_REGISTER_AND_LOGIN_REQUEST_BODY } from "./validators/schemas";
import createJwtToken from "./utils/create-jwt-token";
import isAuthenticated from "./validators/is-authenticated";
import hasPermission from "./validators/has-permission";

const router = new Router();

router.post("/user/login", validateBody(USER_REGISTER_AND_LOGIN_REQUEST_BODY), async (ctx) => {
  const {
    request: {
      body: { username, password },
    },
  } = ctx;

  const user = await User.findOne({ where: { username } });
  if (await user?.isValidPassword(password)) {
    ctx.body = { message: "you have logged in successfully", token: createJwtToken(user) };
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
    const newUser = await User.create({ username, password, isSuperuser: true });
    ctx.body = { message: "user has been created successfully", token: createJwtToken(newUser) };
  } catch (error) {
    ctx.badRequest({ errors: error.errors.map((err) => err.message) });
  }
});

router.get("/notes", isAuthenticated(), async (ctx) => {
  const {
    user: { userId },
  } = ctx;
  ctx.body = await Note.findAll({ where: { authorId: userId } });
});

router.get("/notes/:noteId", isAuthenticated(), validateNoteIdParams(), async (ctx) => {
  const { noteId, user } = ctx.params;
  // TODO implement caching
  const note = await Note.findByPk(noteId);
  if (note) {
    if (hasPermission(user, note)) {
      ctx.body = note;
    } else {
      ctx.forbidden({ message: "you have no permission" });
    }
  } else {
    ctx.notFound({ message: `note with id ${noteId} not found!` });
  }
});

router.post("/notes/new", isAuthenticated(), validateBody(NOTE_POST_REQUEST_SCHEMA), async (ctx) => {
  const {
    user: { userId },
    request: {
      body: { title, detail },
    },
  } = ctx;
  const newNote = await Note.create({ title, detail, authorId: userId });
  if (newNote) {
    ctx.body = newNote;
  } else {
    ctx.body = "oops";
  }
});

router.put("/notes/:noteId", isAuthenticated(), validateNoteIdParams(), validateBody(NOTE_PUT_REQUEST_SCHEMA), async (ctx) => {
  const {
    params: { noteId },
    user: { userId },
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
  const [isUpdate, updatedNote] = await Note.update(updatedValues, { where: { id: noteId, authorId: userId }, returning: true });
  if (isUpdate) {
    ctx.body = updatedNote;
  } else {
    ctx.notFound({ message: `note with id ${noteId} not found!` });
    ctx.body = "hi";
  }
});

router.delete("/notes/:noteId", isAuthenticated(), validateNoteIdParams(), async (ctx) => {
  const {
    noteId,
    user: { userId },
  } = ctx.params;
  // TODO delete from cache
  const isDeleted = await Note.destroy({ where: { id: noteId, authorId: userId } });
  if (isDeleted) {
    ctx.ok({ message: `note with id ${noteId} deleted` });
  } else {
    ctx.notFound({ message: `note with id ${noteId} not found!` });
  }
});

export default router;
