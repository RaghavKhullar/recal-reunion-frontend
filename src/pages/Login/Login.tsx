import { useSelector } from "react-redux";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { Title, Text } from "@mantine/core";
import { userSelector } from "../../redux/reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../../redux/actions";
import { useAppDispatch } from "../../redux/store/hooks";

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loggedIn } = useSelector(userSelector);

  const fetchUserDetails = async () => {
    const loginDispatch = await dispatch(getCurrentUser());
    if (getCurrentUser.fulfilled.match(loginDispatch)) {
      if (loginDispatch.payload.status === 200) {
        navigate("/home");
        return;
      }
    }
    // if loggedIn in state is true, but actually user is not loggedin
    await dispatch(logoutUser());
  };
  useEffect(() => {
    if (loggedIn) {
      fetchUserDetails();
    }
  }, [loggedIn]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
        className="flex-col md:flex-row"
      >
        <div className="flex justify-center items-center w-full h-1/2 md:w-1/2 md:h-full">
          <img
            className="h-full"
            src="/assets/images/login-bg.png"
            alt="poster"
          />
        </div>
        <div
          className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col justify-center items-center"
          style={{ textAlign: "center" }}
        >
          <Title
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem" }}
          >
            WELCOME
          </Title>
          <Text
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            Log in the easy way
          </Text>
          <a
            href={getGoogleUrl(false)}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "0.5rem 4rem",
              borderRadius: "0.5rem",
            }}
          >
            {" "}
            Sign in with Google
          </a>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
