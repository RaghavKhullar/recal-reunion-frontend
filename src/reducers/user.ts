import { SIGN_UP_SUCCESS, LOGIN_SUCCESS } from "../actions/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function postReducer(state: any = null, action: any) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				userDetails: action.payload.user,
				oldRem: action.payload.oldRem
			};
		default:
			return state;
	}
}
