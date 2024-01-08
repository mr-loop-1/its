# Issue Tracking System with git (its-git)

A full stack application using MongoDb, ReactJs and NodeJs which is a **new and innovative** approach to how bug trackers are used in the software development world.

## Inspiration
During my SWE internship, I discovered that a lot of bugs that dev teams encounter are already solved some time earlier in the same project too. My reading habit then took me to these
recently introduced [fine-grained access tokens](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/) by Github and came up the idea to do this project. These tokens allow repo
restricted access.

This app is supposed to benefit internal issue tracking more than quality analysis round as the inspiration and approach is to benefit developers in avoiding repetitive bugs.

## What is new
Reporting a bug has the option to choose a commit at which the bug was enountered. This is supposed to be the latest commit of any branch. While closing the bug, we can also specify at which commit the 
bug no longer exists.

## Things I learnt

A lot of previous projects were only backend or frontend is from an open source skeleton or html templating.

My first *full* stack app in its true sense and it taught me a lot. including jwt, access and roles, guards, odm and the deep features of react. While working with atlas trigger, I got a deep understanding
of mongodb's bson and json format.

## Deployment
currently using Vercel, MongoDb Atlas and Render. Will migrate shortly to AWS EB and Lambda for backend.

### Why the app resets every 5 minutes
To showcase correctly its working, I created three accounts as sample. I am yet to make these specific ones as readable only and hence they can be edited. Plus, as people will inspect the app, the database
may enter paid threshold. For these reasons, I have employed a **MongoDb Atlas Trigger** to restore to my desired dataset.
