import react from 'react';
import { Link } from 'react-router-dom';

export default function BugsList({ bugs }) {
  return (
    <>
      <h1>latest updates</h1>
      {/* <table className="w-full"> */}

      {bugs.map((bug) => {
        return (
          <Link to={`/bugs/${bug.id}`}>
            <div className="w-full flex">
              <span className="mr-auto">{bug.title}</span>
              <span className="ml-auto">{bug.commits.open}</span>|||
              <span className="">{bug.priority}</span>
            </div>
          </Link>
        );
      })}
      {/* </table> */}
    </>
  );
}
