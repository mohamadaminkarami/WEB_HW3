import * as yup from "yup";

const NOTE_PUT_REQUEST_SCHEMA = yup
  .object()
  .shape({ title: yup.string(), detail: yup.string() })
  .test("empty-test", "body cannot be empty", (body) => body.title || body.detail);
export default NOTE_PUT_REQUEST_SCHEMA;
