import { SIGN_UP_SUCCESS, LOGIN_SUCCESS } from "./types";

export const loginSuccess = (data: {
  name: string;
  email: string;
}) => {
	return {
		type: LOGIN_SUCCESS,
		payload: data,
	};
};

