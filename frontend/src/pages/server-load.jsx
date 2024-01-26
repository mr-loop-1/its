import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function ServerLoad() {
  return (
    <div className="z-50 absolute h-screen w-screen bg-orange-600 text-white font-bold flex items-center justify-center">
      <span className="text-xl">
        Server spins up in 30sec...
        <ReloadIcon className="animate-spin w-10 h-10" />
      </span>
    </div>
  );
}
