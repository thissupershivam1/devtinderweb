import { useSelector } from "react-redux";


const Navbar = () => {
  const { users } = useSelector((state) => state.user);
  const isUserPresent = users && Object.keys(users).length > 0;
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex-none gap-2">
      {isUserPresent && (
  <div className="flex items-center gap-3 mx-5">
   <span className="text-white font-semibold text-base">
  Welcome, {users.user.firstName} {users.user.lastName}
</span>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={
              users.profilePhoto ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li><a className="justify-between">Profile</a></li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Navbar;
