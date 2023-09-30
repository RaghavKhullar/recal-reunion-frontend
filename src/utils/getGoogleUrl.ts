// export const getGoogleUrl = () => {
//     const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  
//     const options = {
//       client_id: import.meta.env.GOOGLE_CLIENT_ID,
//       redirect_uri: import.meta.env.GOOGLE_REDIRECT_URI,
//       access_type: "offline",
//       response_type: "code",
//       prompt: "consent",
//       scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//       ].join(" "),
//       state:"pass-through value",
//     };
  
//     const qs = new URLSearchParams(options);
  
//     return `${rootUrl}?${qs.toString()}`;
// };