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
import { addStreamItem } from 'api/stream';
import { editBug } from 'api/bugs';

export default function AssignBug({
  bugId,
  projectUsers,
  currentAssigned,
  refetch,
  toggleRefetch,
}) {
  const user = useSelector((state) => state.auth.userInfo);
  // const [assigned, setAssign] = useState(currentAssigned.name);
  const { toast } = useToast();

  const filteredArray = projectUsers.filter(
    (user) => user.id !== currentAssigned.id,
  );

  //   console.log(currentAssigned.name);

  const handleAssign = async (newAssigned) => {
    try {
      let data = {
        streamType: 'ASSIGNED',
        author: {
          id: user.id,
          name: user.name,
          slug: user.slug,
        },
        prev: {
          id: currentAssigned.id,
          name: currentAssigned.name,
          slug: currentAssigned.slug,
        },
        now: {
          id: filteredArray[newAssigned].id,
          name: filteredArray[newAssigned].name,
          slug: filteredArray[newAssigned].slug,
        },
        timestamp: new Date(),
      };
      // console.log('🚀 ~ file: assignBug.jsx:44 ~ handleAssign ~ data:', data);

      //* api call using bugId and all
      await addStreamItem(localStorage.getItem('token'), data, bugId);
      data = {
        assignedTo: filteredArray[newAssigned].id,
      };
      await editBug(localStorage.getItem('token'), data, bugId);

      toggleRefetch(() => (refetch ? false : true));

      // console.log('here.....................');
    } catch (err) {
      console.log(err);
      toast({
        title: '!!! some error occured',
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="w-fit">assigned to</div>
      <Select onValueChange={handleAssign} value={currentAssigned.name}>
        <SelectTrigger className="mt-2 w-fit px-5 py-2 h-fit">
          <img
            src={`/profile/${currentAssigned.slug}.svg`}
            className="w-7 h-7 inline"
          />
          <span className="ml-2 max-w-40">
            {currentAssigned.name}aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filteredArray.map((user, idx) => {
              return (
                <SelectItem
                  value={idx}
                  className="mt-2 w-full px-5 py-2 h-fit cursor-pointer"
                >
                  <img
                    src={`/profile/${user.slug}.svg`}
                    className="w-7 h-7 inline"
                  />
                  {user.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
