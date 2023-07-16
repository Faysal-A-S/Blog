import { useSelector } from "react-redux";

const IsLogin = () => {
  const { user } = useSelector((state) => state.authUser);
  if (user.email && user.token && user.name) {
    return true;
  }
  return false;
};

export default IsLogin;
