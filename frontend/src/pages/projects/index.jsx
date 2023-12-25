import react from 'react';
import ProjectListBar from '../../components/listbars/projectListBar';

export default function Project() {
  const contents = [
    {
      id: '123',
      title: 'ASD',
      role: 'member',
    },
  ];

  retun(<ProjectListBarar contents={contents} />);
}
