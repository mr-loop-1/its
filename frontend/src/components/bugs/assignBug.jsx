import react, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '../ui/button';
import { ToastAction } from '../ui/toast';

export default function AssignBug({ bugId, projectUsers, currentAssigned }) {
  console.log(
    '🚀 ~ file: assignBug.jsx:18 ~ AssignBug ~ currentAssigned:',
    currentAssigned,
  );
  console.log(
    '🚀 ~ file: assignBug.jsx:18 ~ AssignBug ~ projectUsers:',
    projectUsers,
  );
  const user = useSelector((state) => state.auth.userInfo);
  const [assigned, setAssign] = useState(currentAssigned.name);
  const { toast } = useToast();

  //   console.log(currentAssigned.name);

  const handleAssign = (newAssigned) => {
    try {
      const data = {
        author: user.name,
        oldUser: {
          name: currentAssigned.name,
          slug: currentAssigned.slug,
        },
        newUser: {
          name: projectUsers[newAssigned].name,
          sulg: projectUsers[newAssigned].slug,
        },
        timestamp: new Date(),
      };
      console.log('🚀 ~ file: assignBug.jsx:44 ~ handleAssign ~ data:', data);

      //* api call using bugId and all

      setAssign(() => data.newUser.name);

      toast({
        title: 'Assignment changed successfully',
      });

      console.log('here.....................');
    } catch (err) {
      console.log(err);
      toast({
        title: '!!! some error occured',
      });
    }
  };

  return (
    <>
      <Select
        onValueChange={handleAssign}
        value={assigned}
        defaultValue={currentAssigned.name}
      >
        <SelectTrigger className="w-[400px]">
          {currentAssigned.name}
          {/* <SelectValue placeholder={currentAssigned.name}/> */}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="NORMAL">Medium</SelectItem>
          <SelectItem value="SEVERE">Severe</SelectItem> */}
            {projectUsers
              // .filter((user) => user.id !== currentAssigned.id)
              .map((user, idx) => {
                return <SelectItem value={idx}>{user.name}</SelectItem>;
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
