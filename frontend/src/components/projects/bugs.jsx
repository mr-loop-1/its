import react from 'react';
import BugsList from './bugsList';

export default function Bugs() {
  const project = {
    id: 123,
    title: 'asdhjn',
    members: [
      {
        id: 4132,
        name: 'asdjk',
        role: 'asd',
      },
    ],
    bugs: [
      {
        id: 1234,
        title: 'asdffa',
        priority: 'hadbskn',
        progress: 'sadbks',
        assignedTo: {
          id: 13241,
          name: 'asdbasd',
        },
        commits: {
          open: '#712sad38',
        },
      },
    ],
    createdAt: 'asdjnjas',
  };

  return (
    <>
      <div className="pl-[480px]">
        <header>
          <span className="text-gray-500 text-sm">
            Projects / {project.title}
          </span>
          <h1 className="text-3xl">Bugs</h1>
        </header>
        <div id="info" className="rounded-md my-10 p-5 bg-zinc-100 mr-[30px]">
          no. of bugs= 16
          <br /> no. of members = 14 <br />
          no. of bugs resolved
        </div>
        <div id="info" className="rounded-md my-10 p-5 bg-zinc-100 mr-[30px]">
          no. of bugs= 16
          <br /> no. of members = 14 <br />
          no. of bugs resolved
        </div>
        <div id="info" className="rounded-md my-10 p-5 bg-zinc-100 mr-[30px]">
          <BugsList bugs={project.bugs} />
        </div>
      </div>
    </>
  );
}
