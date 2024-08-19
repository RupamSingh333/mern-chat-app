import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      logout();
    }
  };

  return (
    <div className='mt-auto flex items-center space-x-2'>
      <img
        src={authUser?.profilePic}
        alt={authUser?.fullName}
        className='w-8 h-8 rounded-full'
      />
      <span className='text-white'>{authUser?.fullName}</span>
      {!loading ? (
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={handleLogout} />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  );
};

export default LogoutButton;
