export const getGoogleUrl = (isAdmin: boolean) => {
	const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
	const options = {
		redirect_uri: isAdmin
			? import.meta.env.VITE_GOOGLE_ADMIN_REDIRECT_URI
			: import.meta.env.VITE_GOOGLE_CLIENT_REDIRECT_URI,
		client_id: isAdmin
			? import.meta.env.VITE_GOOGLE_ADMIN_ID
			: import.meta.env.VITE_GOOGLE_CLIENT_ID,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		].join(" "),
	};

	const qs = new URLSearchParams(options);

	return `${rootUrl}?${qs.toString()}`;
};
