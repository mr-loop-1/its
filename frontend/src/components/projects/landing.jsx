import clsx from 'clsx';
import react from 'react';

export default function LandingPage() {
  return (
    <div
      className={clsx(
        'ml-72 lg:ml-[22rem]',
        !/^\/projects?[^/]*$/.test(location.pathname) && 'hidden',
      )}
    >
      no
      problemasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
  );
}
