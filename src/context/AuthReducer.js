const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN": {
			return {
				currentUser: action.payload,
				token: action.token

			};

		}
		case "LOGOUT": {
			return {
				currentUser: null,
				token: null
			};
		}
		default:
			return state;
	}
};

export default AuthReducer;
