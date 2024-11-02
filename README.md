# Woof 
Woof is a website that contains style guides and information about how to design each element of the Daily Bruin newspaper. It will be used by the Design section to teach new designers how to design the paper and keep designs consistent over time.

# Technology Stack

MongoDB and JavaScript on the backend 

### File Structure 
- pages 
-> mongodb+srv://woof:<db_password>@cluster0.awg9zpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


## Daily Bruin Design
![Woof Image](./public/Woof_HomePage.png)

Visit the <a href="https://www.figma.com/design/bQuRZ1C2EDqgNmCYui8iqE/woof?node-id=0-1&node-type=canvas">Figma</a> to see more about the Design of Woof. 
To see the requirements guide, visit <a href="https://docs.google.com/document/d/1S7moCvya6fsls2iWeL_YoR239hYyv1JbMTDSRk3CNsk/edit?tab=t.0">doc</a>

# MongoDB and Mongoose with Next.js

This example shows how you can use a MongoDB database to support your Next.js application.

**Pet** is an application that allows users to add their pets' information (e.g., name, owner's name, diet, age, dislikes, likes, and photo). They can also delete it or edit it anytime.

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-mongodb-mongoose with-mongodb-mongoose-app
```

```bash
yarn create next-app --example with-mongodb-mongoose with-mongodb-mongoose-app
```

```bash
pnpm create next-app --example with-mongodb-mongoose with-mongodb-mongoose-app
```

## Configuration

### Step 1. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string you got from step 1.

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).


#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/import/git?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.



# Docker

Development 
Configured the docker file 



`docker build -t woof .`
- builds a docker image based on the dockerfile in the root directory with a tag called woof 

docker does need the docker daemon (host) running. This is required by docker in order to create containers from the image template that was just built 
the docker daemon in this case is the docker desktop app. 

`docker run --name woof_contain -p 3000:3000 woof:latest`
- runs a docker container based on the image we just created with the previous `docker build` command. 
- the -d tag runs the container in detached mode (container runs in the background, allowing you to still use the terminal)
- the -p option maps the port 3000 on the docker host to port 3000 on the container. 
- `woof:latest` is the name of the docker image to use for the container, latest specifies the latest version of the image. 
- `--name woof_contain` is to name the container woof_contain
- to build up a new container 

# stopping the container from running 
`docker stop <container_name>` 


`docker start <container_name>`
- to start an existing container 
