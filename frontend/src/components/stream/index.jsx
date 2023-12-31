import React from 'react';
import StreamItem from './addUpdate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui';
import { Button } from '../ui/button';
import Comment from './comment';

export default function Stream({ stream }) {
  return (
    <div>
      {stream.map((content) => {
        return <StreamItem streamItem={content} />;
      })}
      {stream.map((content) => {
        return <StreamItem streamItem={content} />;
      })}
      <Accordion type="single" collapsible className="w-fit h-fit">
        <AccordionItem value="item-1">
          <AccordionTrigger>Add Comment</AccordionTrigger>
          <AccordionContent>
            {/* Yes. It adheres to the WAI-ARIA design pattern. */}
            <Comment />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
