import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email, setemailId] = useState('qq.maurya@example.com');
  const [password, setpassword] = useState('Qqqqq@1234');
  const [error,seterror]=useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL+'/login', {
        email,
        password,
      },
      {
        withCredentials:true
      }
    );
      dispatch(addUser(response.data));
      return navigate("/")

    } catch (err) {
      seterror(err?.response?.data?.error)
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form
          className="card-body"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              placeholder="email"
              className="input input-bordered"
              onChange={(e) => setemailId(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
           <p className='text-red-600'> {error}</p>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
