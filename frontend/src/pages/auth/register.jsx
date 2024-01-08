import react, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from 'api/auth';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { setUser } from './../../app/reducers/auth';

export default function Register() {
  const [slug, setSlug] = useState(0);
  const [api, setApi] = useState();

  const {
    register,
    handleSubmit,
    setError,
    formState: { error },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (api)
      api.on('select', () => {
        setSlug(() => api.selectedScrollSnap());
      });
  }, [api]);

  const onSubmit = async (data) => {
    const auth = {
      name: data.name,
      email: data.email,
      password: data.password,
      slug: slug,
    };
    try {
      const res = await registerUser(auth);
      dispatch(setUser(res));
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/projects');
    } catch (err) {
      console.log('🚀 ~ file: register.jsx:51 ~ onSubmit ~ err:', err);
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
            SignUp
          </h2>

          <Carousel className="w-40 mx-auto mt-5 " setApi={setApi}>
            <CarouselContent>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
                return (
                  <CarouselItem key={idx}>
                    <Card>
                      <CardContent className="mx-auto h-20 w-20 p-0">
                        <img src={`/profile/${idx}.svg`} />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <form
            className="mt-10"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="name"
              className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              {...register('name')}
              required
            />

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
              Register
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to="/login" className="flex-2 underline">
                Login instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
