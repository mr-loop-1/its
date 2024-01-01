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

const statuses = [
  {
    key: 'OPEN',
    title: 'OPEN',
    color: '',
    bgColor: '',
  },
  {
    key: 'TRIAGE',
    title: 'TRIAGE',
    color: '',
    bgColor: '',
  },
  {
    key: 'IN_PROGRESS',
    title: 'IN PROGRESS',
    color: '',
    bgColor: '',
  },
  {
    key: 'REVIEW_REQUIRED',
    title: 'REVIEW REQUIRED',
    color: '',
    bgColor: '',
  },

  {
    key: 'CLOSED',
    title: 'CLOSED',
    color: '',
    bgColor: '',
  },
];

export default function ChangeProgress({
  bugId,
  currentStatus, //* in string format
  refetch,
  toggleRefetch,
}) {
  const user = useSelector((state) => state.auth.userInfo);
  const { toast } = useToast();

  const filteredArray = statuses.filter(
    (status) => status.key !== currentStatus,
  );

  const handleChange = async (newKey) => {
    try {
      let data = {
        progress: newKey,
      };
      let result = await editBug(localStorage.getItem('token'), data, bugId);

      toggleRefetch(() => (refetch ? false : true));
    } catch (err) {
      console.log(err);
      //   toast({
      //     title: '!!! some error occured',
      //   });
    }
  };

  return (
    <div className="mt-10">
      <div className="">Assigned To</div>
      <Select
        onValueChange={handleChange}
        value={
          statuses.find((status) => {
            return status.key == currentStatus;
          }).title
        }
      >
        <SelectTrigger className="w-[80%] mx-auto md:ml-0 md:w-[400px]">
          {
            statuses.find((status) => {
              return status.key == currentStatus;
            }).title
          }
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filteredArray.map((status) => {
              return <SelectItem value={status.key}>{status.title}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
