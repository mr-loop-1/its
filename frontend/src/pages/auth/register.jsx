import react from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from 'api/auth';

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { error },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const auth = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await registerUser(auth);
      dispatch(setUser(res));
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/projects');
    } catch {}
  };

  return (
    <div class="flex flex-col h-screen bg-gray-100">
      <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                    px-6 py-10 sm:px-10 sm:py-6 
                    bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            SignUp
          </h2>

          <form class="mt-10" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <label
              for="name"
              class="block text-xs font-semibold text-gray-600 uppercase"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="name"
              autocomplete="name"
              class="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              {...register('name')}
              required
            />

            <label
              for="email"
              class="block text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              autocomplete="email"
              class="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              {...register('email')}
            />

            <label
              for="password"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autocomplete="current-password"
              class="block w-full py-3 px-1 mt-2 mb-4
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              {...register('password')}
            />

            <button
              type="submit"
              class="w-full py-3 mt-10 bg-gray-800 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Register
            </button>

            <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to="/login" class="flex-2 underline">
                Login instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
