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
} from '../modal/select';
import { useToast } from '../ui/use-toast';

export default function AssignBug({ bugId, projectUsers, currentAssigned }) {
  const user = useSelector((state) => state.auth.userInfo);
  const [assigned, setAssign] = useState();
  const { toast } = useToast();

  const handleAssigned = (newAssigned) => {
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

      //* api call using bugId and all

      toast({
        title: 'Assignment changed successfully',
      });
    } catch (err) {
      console.log(err);
      toast({
        title: '!!! some error occured',
      });
    }
  };

  return (
    <Select
      onValueChange={handleAssign}
      value={assigned}
      defaultValue={currentAssigned.name}
      required
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Priority Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {projectUsers
            .filter((user) => user.id !== currentAssigned.id)
            .map((user) => {
              return <SelectItem>user.name</SelectItem>;
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
