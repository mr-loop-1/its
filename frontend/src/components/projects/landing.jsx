import clsx from 'clsx';
import react from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage({ length }) {
  return (
    <div
      className={clsx(
        'ml-72 lg:ml-[22rem]',
        !/^\/projects?[^/]*$/.test(location.pathname) && 'hidden',
      )}
    >
      <Card className="w-[95%] md:w-96 mx-auto my-auto">
        <CardHeader>
          <span className="text-2xl font-bold leading-tight text-fuchsia-900">
            projects
          </span>
          <div className="text-4xl font-bold leading-tight break-words text-center">
            you are watching {length} projects
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
