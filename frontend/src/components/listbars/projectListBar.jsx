import React from 'react';

export default function ProjectListBar({ contents }) {
  return (
    <div className="fixed bg-[#f4f5f7] z-[49] h-screen w-[230px] lg:w-96 overflow-x-hidden overflow-y-auto pt-0 pb-6 px-4 border-r-[#dfe1e6] border-r border-solid left-16 top-0">
      {contents.map((con) => {
        return (
          <>
            <h2>{con.title}</h2>
            <h4>{con.role}</h4>
          </>
        );
      })}
    </div>
  );
}
