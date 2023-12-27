import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ProjectTopNav({ title }) {
  return (
    <header>
      <span className="text-gray-500 text-sm">Projects / {title}</span>
    </header>
  );
}
