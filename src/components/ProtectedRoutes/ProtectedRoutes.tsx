import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector, adminSelector } from "../../redux/reducer";
import { showNotification } from "../../helpers/helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = (props: any) => {
  const navigate = useNavigate();
  const { children, type } = props;
  const {
    loggedIn,
    isFetching,
    isProfileUpdated,
  } =
    type === "user"
      ? useSelector(userSelector)
      : useSelector(adminSelector);
  useEffect(() => {
    if (!isFetching) {
      if (loggedIn) {
        if (type == "user") {
          if (!isProfileUpdated) {
            // navigate to update profile
            return;
          }
        }
      } else {
        showNotification("Warning", "You are not signed in!", "warning");
        navigate("/login");
      }
    }
    else {
      showNotification("Warning", "You are not signed in!", "warning");
      navigate("/login");
    }
  }, [loggedIn, isFetching, isProfileUpdated, children]);

  return children;
};

export default ProtectedRoute;
