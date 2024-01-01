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

  const progress = [
    {
      title: 'OPEN',
      textColor: '',
      bgColor: '',
    },
    {
      title: 'TRIAGE',
      textColor: '',
      bgColor: '',
    },
    {
      title: 'IN_PROGRESS',
      textColor: '',
      bgColor: '',
    },
    {
      title: 'REVIEW_REQUESTED',
      textColor: '',
      bgColor: '',
    },
    {
      title: 'CLOSED',
      textColor: '',
      bgColor: '',
    },
  ];

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
      console.log('🚀 ~ file: assignBug.jsx:44 ~ handleAssign ~ data:', data);

      //* api call using bugId and all
      let result = await addStreamItem(
        localStorage.getItem('token'),
        data,
        bugId,
      );
      data = {
        progress: inputs.value,
      };
      result = await editBug(localStorage.getItem('token'), data, bugId);

      toggleRefetch(() => (refetch ? false : true));

      console.log('here.....................');
    } catch (err) {
      console.log(err);
      toast({
        title: '!!! some error occured',
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="">Assigned To</div>
      <Select onValueChange={handleAssign} value={currentAssigned.name}>
        <SelectTrigger className="w-[80%] mx-auto md:ml-0 md:w-[400px]">
          <img
            src={`/profile/${currentAssigned.slug}.svg`}
            className="w-10 h-10 inline"
          />
          {currentAssigned.name}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filteredArray.map((user, idx) => {
              return (
                <SelectItem value={idx}>
                  <img
                    src={`/profile/${user.slug}.svg`}
                    className="w-8 h-8 inline"
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
