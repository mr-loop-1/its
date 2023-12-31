import React from 'react';
import { Textarea } from '../ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function StreamItem({ streamItem }) {
  // const constructStreamItem = (type, data) => {
  //     switch(type) {
  //         case "PROGRESS": {
  //             const { author, prev, now, timestamp } = body;
  //             return `
  //                 ${author} changed the status from ${prev} to ${now}
  //             `
  //         }
  //         case "ASSIGNED": {
  //             return `${author} reassigned the bug from ${prev} to ${now}`
  //         }
  //         case "PRIORITY": {
  //             return `${author} changed priority from ${prev} to ${now}`
  //         }
  //     }
  // }
  return (
    <div>
      {(streamItem.cat == 'ASSIGNED' && (
        <span>
          <img src={`/profile/${streamItem.value.author.slug}.svg`} />
          {streamItem.value.author.name} reassigned the bug from
          <img src={`/profile/${streamItem.value.oldUser.slug}.svg`} />
          {streamItem.value.oldUser.name} to
          <img src={`/profile/${streamItem.value.newUser.slug}.svg`} />
          {streamItem.value.newUser.name}
        </span>
      )) ||
        (streamItem.cat == 'COMMENT' && (
          <div className="flex flex-col">
            {/* <span>
              <img src={`/profile/${streamItem.value.author.slug}.svg`} />
              {streamItem.value.author.name}
            </span> */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <img
                    src={`/profile/${streamItem.value.author.slug}.svg`}
                    className="w-8 h-8 inline"
                  />
                  {streamItem.value.author.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={streamItem.value.comment}
                  readonly
                  className="resize-none"
                />
              </CardContent>
            </Card>
            {/* <Textarea value={streamItem.value.comment} readonly /> */}
          </div>
        ))}
    </div>
  );
}
