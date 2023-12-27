import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function ProjectTopNav({ title, id }) {
  return (
    <div className="">
      <span className="text-gray-500 text-sm">
        Projects /<Link to={`/projects/${id}`}>{title}</Link>
      </span>
    </div>
  );
}
