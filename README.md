<h1 >
  Live Scores 
  <br>
</h1>

A work in progress FullStack Football Live Score Application.

## Features
- Live Score Tracking (In-Play and Complete)
- Top League Tables / Standings
- Team Search
- Top Scorers By League
- Post Match Highlights (Via YouTube API)
- Full Authentication (Signup, Login, Register, Reset)
- Live Chat (Post Match)
- Latest News 

## Live URL

<strong>www.livescores.click</strong>

## Screenshot

![](https://github.com/thomasblaymire/live-score/blob/main/home.png)


## Frontend 

- NextJS (Typescript)
- NextJS Auth (Prisma NodeJS Backend)
- React Query
- Hooks
- Cypress
- Chakra UI
- React Icons
- Socket.io
- Wretch (Fetch Util)

## Backend
- NodeJS
- Express
- Prisma
- PostgreSQL (Raleway)
- Google APIs
- Morgan 
- Zod
- Socket.io

## Infrastructure
- S3
- AWS SSL
- Route 53 Domain
- Cloudfront
- OIA
- Lambda Edge

## Future Plans
TBC....


## How To Use

The most simple way to run this application is by using Docker. 

#### Run App:
`$ docker-compose up`

This will start both the API and Client services, note the CLI is a non-service and acts as a utility for performing operations.

#### Running individual services

##### Go into relevant directory:
`$ cd live-score/api or live-score/client`

##### Install dependencies
`$ yarn`

##### Run the service
`$ yarn dev`

# Build the web app
`$ yarn build`

Please check out the package.json files for more information on additional commands.

