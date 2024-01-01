import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getFullDate(date) {
  const inputDate = new Date(date);

  // Convert to IST (Indian Standard Time)
  // const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5.5
  // const ISTDate = new Date(inputDate.getTime() + ISTOffset);

  // Format the date with IST time zone
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata', // IST time zone
  }).format(inputDate);

  // console.log(formattedDate);
  return formattedDate;
}
