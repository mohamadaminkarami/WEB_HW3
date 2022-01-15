import * as yup from "yup";

const NOTE_POST_REQUEST_SCHEMA = yup.object().shape({ title: yup.string().required(), detail: yup.string().required() });

export default NOTE_POST_REQUEST_SCHEMA;
