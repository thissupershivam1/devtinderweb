import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";  



const Navbar = () => {
  const user = useSelector((store) => store.user.currentUser);
  console.log("user in navbar",user)
  console.log(user?.user?.firstName)
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/logout",{},{
        withCredentials:true
      })
      dispatch(removeUser());
      return navigate("/login")
    }
    catch(err){
       console.error(err);
    }
  }
  
  const dispatch=useDispatch();
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">CodeMate</Link>
      </div>
      <div className="flex-none gap-2">
      {user && (
  <div className="flex items-center gap-3 mx-5">
   <span className="text-white font-semibold text-base">
  Welcome, {user?.user?.firstName} {user?.user?.lastName}
</span>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={
              user?.user?.photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li><Link to="/profile" className="justify-between">Profile</Link></li>
        <li> <Link to="/requests">Requests</Link></li>
        <li>
                <Link to="/connections">Connections</Link>
              </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Navbar;
