import axios from 'axios';

const App: React.FC = () => {
  const getGoogleUrl = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
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
  }
  
  const getUserDetails = async () => {
     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getDetails`,{ withCredentials: true });
     console.log(response.data);
  } 

  return (
    <>
      <a href={getGoogleUrl()}>Sign in with Google 🚀</a>
      <button onClick={() => getUserDetails()}> Get User Details </button>
    </>
  )
};

export default App;
