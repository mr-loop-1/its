import react, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from 'api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './../../app/reducers/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardDescription } from '@/components/ui/card';

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { error },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      dispatch(setUser(res));
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/projects');
    } catch (err) {
      console.log('🚀 ~ file: login.jsx:27 ~ onSubmit ~ err:', err);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                    px-6 py-10 sm:px-10 sm:py-6 
                    bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <Card className="w-fit px-2 py-1 mt-4">
            <CardDescription>
              sample users
              <ul>
                <li>
                  <img src="/profile/0.svg" className="w-6 h-6 inline mt-2" />
                  <span className="ml-2">
                    abd1@gmail.com : password1 : Abdul Samad
                  </span>
                </li>
                <li>
                  <img src="/profile/8.svg" className="w-6 h-6 inline mt-2" />
                  <span className="ml-2">
                    abd2@gmail.com : password2 : Michael
                  </span>
                </li>
                <li>
                  <img src="/profile/3.svg" className="w-6 h-6 inline mt-2" />
                  <span className="ml-2">
                    abd3@gmail.com : password3 : Daniel
                  </span>
                </li>
              </ul>
            </CardDescription>
          </Card>

          <form
            className="mt-10"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              {...register('email')}
            />

            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              className="block w-full py-3 px-1 mt-2 mb-4
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              {...register('password')}
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to="/register" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
