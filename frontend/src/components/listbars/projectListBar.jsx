import React, { useState } from 'react';
import Dividing from './dividing';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';

export default function ProjectListBar({ contents }) {
  const [modalOpen, setModalOpen] = useState(false);

  const projectCreateModalOpen = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed bg-[rgb(244,245,247)] z-[49] h-screen w-[230px] lg:w-96 overflow-x-hidden overflow-y-auto pt-0 pb-6 px-4 border-r-[#dfe1e6] border-r border-solid left-16 top-0">
      <div className="flex mt-7 mb-5 items-center">
        <img src="/proj.svg" className="ml-3 w-10 h-10" />
        <div className="pl-2.5 pr-0 pt-[3px] pb-0">all projects</div>
      </div>
      <Dividing />
      {contents.map((project) => {
        return renderLinkItem(project);
      })}
      <button
        className="w-[80%] h-10 bg-blue-500 text-white text-lg rounded-md mx-auto"
        onClick={projectCreateModalOpen}
      >
        New Project
      </button>
      {modalOpen && <Modal isOpen={modalOpen} onClose={closeModal} />}
    </div>
  );
}

const renderLinkItem = (project) => {
  return (
    <div
      key={project.id}
      className="relative my-2 cursor-pointer active:bg-[#ebecf0] hover:text-[#0052cc] active:text-[#0052cc] hover:bg-[#ebecf0]"
    >
      <NavLink
        exact
        to={`/projects/${project.id}`}
        className={({ isActive }) =>
          [isActive ? 'text-[#0052cc] bg-[#ebecf0]' : ''].join(' ')
        }
      >
        <div className="flex items-center w-full">
          <img className="w-6 h-6" src="/folder.svg" />
          <div className="ml-4">{project.title}</div>
        </div>
      </NavLink>
    </div>
  );
};
