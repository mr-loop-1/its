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
    color: 'text-white',
    bgColor: 'bg-slate-400',
  },
  {
    key: 'TRIAGE',
    title: 'TRIAGE',
    color: 'text-red-900',
    bgColor: 'bg-red-300',
  },
  {
    key: 'IN_PROGRESS',
    title: 'IN PROGRESS',
    color: 'text-blue-900',
    bgColor: 'bg-blue-300',
  },
  {
    key: 'REVIEW_REQUIRED',
    title: 'REVIEW REQUIRED',
    color: 'text-orange-900',
    bgColor: 'bg-yellow-300',
  },

  {
    key: 'CLOSED',
    title: 'CLOSED',
    color: 'text-lime-900',
    bgColor: 'bg-lime-300',
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

  const currentStatusObj = statuses.find((status) => {
    return status.key == currentStatus;
  });

  const filteredArray = statuses.filter(
    (status) => status.key !== currentStatus,
  );

  const handleChange = async (newKey) => {
    console.log(
      '🚀 ~ file: changeStatus.jsx:73 ~ handleChange ~ newKey:',
      newKey,
    );
    try {
      let data = {
        progress: filteredArray[newKey].key,
      };
      await editBug(localStorage.getItem('token'), data, bugId);
      data = {
        streamType: 'PROGRESS',
        author: {
          id: user.id,
          name: user.name,
          slug: user.slug,
        },
        prev: currentStatusObj,
        now: filteredArray[newKey],
        timestamp: new Date(),
      };
      await addStreamItem(localStorage.getItem('token'), data, bugId);

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
      {/* <div className="w-fit">status</div> */}
      <Select onValueChange={handleChange} value={currentStatusObj.title}>
        <SelectTrigger
          className={
            'mt-2 w-fit px-5 py-2 h-fit font-bold' +
            ' ' +
            currentStatusObj.bgColor +
            ' ' +
            currentStatusObj.color
          }
        >
          {
            statuses.find((status) => {
              return status.key == currentStatus;
            }).title
          }
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filteredArray.map((status, idx) => {
              return (
                <SelectItem
                  value={idx}
                  className={
                    'font-bold' + ' ' + status.bgColor + ' ' + status.color
                  }
                >
                  {status.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
