import * as yup from "yup";

const NOTE_PUT_REQUEST_SCHEMA = yup.object().shape({ title: yup.string(), detail: yup.string() });
export default NOTE_PUT_REQUEST_SCHEMA;
