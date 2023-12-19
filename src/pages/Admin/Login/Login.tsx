import { useSelector } from "react-redux";
import { getGoogleUrl } from "../../../utils/getGoogleUrl";
import { Title, Text } from "@mantine/core";
import { adminSelector } from "../../../redux/reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDetails, logoutAdmin } from "../../../redux/actions";
import { useAppDispatch } from "../../../redux/store/hooks";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector(adminSelector);
  const dispatch = useAppDispatch();
  const fetchAdminDetails = async () => {
    const loginDispatch = await dispatch(getAdminDetails());
    if (getAdminDetails.fulfilled.match(loginDispatch)) {
      if (loginDispatch.payload.status === 200) {
        navigate("/admin/home");
        return;
      }
    }
    // if loggedIn in state is true, but actually admin is not loggedin
    await dispatch(logoutAdmin());
  };
  useEffect(() => {
    if (loggedIn) fetchAdminDetails();
  }, [loggedIn]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem" }}
          >
            WELCOME Admin
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
            href={getGoogleUrl(true)}
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

export default AdminLogin;
