# JDRAI Backend API

Backend application for JDRAI project.

---

## Requirements

For development, you will need Node.js and Docker installed in your environment.

### Node

- #### Node installation on Windows

  Visit the [official Node.js website](https://nodejs.org/) and download the installer. Ensure that `git` is available in your PATH, as `npm` might require it (You can download git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can easily install nodejs and npm with apt. Run the following commands:

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find detailed installation instructions on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

After a successful installation, you should be able to run the following commands.

    $ node --version
    v14.17.5

    $ npm --version
    6.14.14

To update `npm`, you can use `npm` itself. After running the following command, restart the command line.

    $ npm install npm -g

### Docker installation

To run the database for this project, you'll need Docker. Install Docker by following the instructions on the [official Docker website](https://www.docker.com/).

---

## Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory:

   ```bash
   $ cd jdrai-api
   ```

3. Clone the .env.dist file into a .env file:

   ```bash
   $ cp .env.dist .env
   ```

   This command will create a .env file with the same content as .env.dist.

4. Install the project dependencies:

   ```bash
   $ npm install
   ```

## Running the Database

To run the database for the backend, use Docker Compose. Run the following command:

```bash
$ docker-compose up jdrai-db
```

## Running the Project

Once the database is running, you can start the backend server with the following command:

```bash
$ npm run dev
```

This will start the backend server and expose it at `http://localhost:3000`.

## Learn More

For more details about Node.js, check the following resources:

- [Node.js Documentation](https://nodejs.org/en/docs/) - Learn about Node.js features and API.

For Docker, refer to:

- [Docker Documentation](https://docs.docker.com/) - Learn about Docker and containerization.
