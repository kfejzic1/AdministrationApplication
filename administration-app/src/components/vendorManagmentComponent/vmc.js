import { useNavigate } from "react-router-dom";

export default function MainHeader() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className='nav-logo' onClick={handleClick}>
      Vendor Management
    </div>
  );
};
