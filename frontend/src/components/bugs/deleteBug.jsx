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
import { TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { deleteBug } from 'api/bugs';

export default function Deletebug({ bug, setBug }) {
  const user = useSelector((state) => state.auth.userInfo);
  const [disable, setDisable] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  //   console.log(currentAssigned.name);

  const handleDelete = () => {
    setDisable(() => true);
    try {
      //* api call using bugId and user
      // toast({
      //   title: 'Deleted successfully',
      // });
      setBug(() => null);
      setTimeout(() => {
        deleteBug(localStorage.getItem('token'), bug.id);
        navigate(`/projects/${bug.project.id}`);
      }, 1000);

      //! do not update the effect in this one
    } catch (err) {
      console.log(err);
      toast({
        title: '!!! some error occured',
      });
      setDisable(() => false);
    }
  };

  return (
    <button className="ml-2" onClick={handleDelete} disabled={disable}>
      <TrashIcon
        className="w-7 h-7 text-red-700 cursor-pointer"
        // onClick={handleDelete}
      />
    </button>
  );
}
