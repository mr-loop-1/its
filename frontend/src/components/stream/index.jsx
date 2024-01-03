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

export default function Stream({ stream, bugId }) {
  return (
    <div className="mt-5">
      <span className="text-sm text-gray-600 font-semibold">
        created at 24 Nov 2024
      </span>
      {stream.map((content) => {
        return <StreamItem streamItem={content} />;
      })}
      <Accordion type="single" collapsible className="w-full h-fit mt-10">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-gray-200 rounded-md px-5 py-2">
            Add Comment
          </AccordionTrigger>
          <AccordionContent className="p-2">
            {/* Yes. It adheres to the WAI-ARIA design pattern. */}
            <Comment bugId={bugId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
