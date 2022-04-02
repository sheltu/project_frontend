import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Check } from "tabler-icons-react";
import { logout, reset } from "../features/auth/auth.slice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      showNotification({
        color: "green",
        title: "Logged Out",
        icon: <Check />,
      });
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <h1>HOME</h1>
      <Button onClick={onLogout}>Log out</Button>
    </div>
  );
};
export default Home;
