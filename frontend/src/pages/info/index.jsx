import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import React from 'react';

export default function Info() {
  return (
    <div className="pl-24 pt-8 flex w-full h-full md:max-h-[90%] overflow-y-scroll box-border">
      <Card className="w-[95%] md:w-96 mx-auto my-auto">
        <CardHeader>
          <span className="text-2xl font-bold leading-tight text-lime-600">
            features
          </span>
        </CardHeader>

        <CardContent className="break-words">
          <b>github integration</b>
          <br />
          <br />
          <ol>
            <li>
              1. While creating a project, a user can opt in to have github
              support
            </li>
            <li>
              2. It requires a valid Github repo homepage url and corresponding
              fine-grained or normal PAT
            </li>
          </ol>
          <br />
          <b>branch based commits</b>
          <br />
          <br />
          <ol>
            <li>
              1. The purpose of this app was to tie a particular bug to the
              current version. Mid-way I realised that different users can be on
              different branches, so create bug process accomodates for that
            </li>
          </ol>
          <br />
          <b>access levels</b>
          <br />
          <br />
          <ol>
            <li>
              <u>admin</u> -&gt; edit/delete project + make manager + all
              manager features
            </li>
            <li>
              <u>manager</u> -&gt; add/remove members + all member features
            </li>
            <li>
              <u>member</u> -&gt; create/edit/assign/delete a bug
            </li>
          </ol>
          <br />
          <b>creating and inviting</b>
          <br />
          <br />
          <ol>
            <li>
              1. the one who creates a project becomes admin and manager for
              'that project'
            </li>
            <li>2. all invited become members by default</li>
            <li>3. admin can change the manager among present members</li>
          </ol>
          <br />

          <b>mobile view</b>
          <br />
          <br />
          <ol>
            <li>
              projects and project page has differnt view layout on mobile, done
              with context
            </li>
          </ol>
          <br />
          <b>bug stream</b>
          <br />
          <br />
          <ol>
            <li>
              updates to a bug like comment, assignee change and status change
              are added to the bug stream
            </li>
          </ol>
          <br />
          <b>database reset</b>
          <br />
          <br />
          <ol>
            <li>
              1. every 5 minutes, database is reset and all chnages made are
              removed using Atlas
            </li>
            <li>
              2. the routing is so that, if a now-removed user refetches, its
              token is removed and naviagets to login
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
