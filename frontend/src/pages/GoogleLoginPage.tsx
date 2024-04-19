import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useEffect } from "react";

const GoogleLoginPage: React.FC = () => {
  const { getUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then(() => navigate("/workspace/dayview"))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div> google login...</div>
    </>
  );
};

export default GoogleLoginPage;
