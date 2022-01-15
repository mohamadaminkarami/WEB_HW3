import * as yup from "yup";

const USER_REGISTER_AND_LOGIN_REQUEST_BODY = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default USER_REGISTER_AND_LOGIN_REQUEST_BODY;
