import { createNexusClient } from '@bbp/nexus-sdk';
import EventSource from 'eventsource';
import express from 'express';
import { Server } from 'http';
import fetch from 'node-fetch';
import path from 'path';
import socketIO from 'socket.io';
import { v1 as uuidV1 } from 'uuid';
require('abort-controller/polyfill');

const PORT_NUMBER = 3000;
const NEXUS_URL = 'https://dev.nexus.ocp.bbp.epfl.ch/v1';
const app = express();
const http = new Server(app);
const io = socketIO(http);

app.set('port', PORT_NUMBER);

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve('index.html'));
});

io.on('connection', (socket: socketIO.Socket) => {
  console.log('a user is connected');
});

// Middleware
// Check if token is valid
io.use((socket, next) => {
  let [_, token] = socket.handshake.headers
    ? socket.handshake.headers.authorization.split(' ')
    : ['none', undefined];

  if (!token) {
    return next();
  }

  const nexus = createNexusClient({
    fetch,
    token,
    uri: NEXUS_URL,
  });
  nexus.Identity.list()
    .then(() => {
      return next();
    })
    .catch(error => {
      return next(new Error('Authentication error'));
    });
});

// helper function for building EventSource headers
function getHeaders(sockerHeaders: any) {
  const headers = {
    'Last-Event-Id': uuidV1(), // we only want the future events (uuid v1 is a timestamp uuid)
  };
  return sockerHeaders['authorization']
    ? { ...headers, Authorization: sockerHeaders['authorization'] } // setup token if present
    : headers;
}

// Orgs events
const orgsNSP = io.of('/orgs');
orgsNSP.on('connection', (socket: socketIO.Socket) => {
  const eventSourceInitDict = {
    headers: getHeaders(socket.handshake.headers),
  };

  try {
    const sse = new EventSource(
      `${NEXUS_URL}/orgs/events`,
      eventSourceInitDict,
    );

    sse.addEventListener('OrganizationCreated', (e: any) => {
      socket.emit('Created', JSON.parse(e.data));
    });

    sse.addEventListener('OrganizationUpdated', (e: any) => {
      socket.emit('Updated', JSON.parse(e.data));
    });

    sse.addEventListener('OrganizationDeprecated', (e: any) => {
      socket.emit('Deprecated', JSON.parse(e.data));
    });

    sse.onerror = error => {
      socket.error(error);
    };
  } catch (error) {
    socket.error(error);
  }
});

// Project events
const projectNSP = io.of('/projects');
projectNSP.on('connection', (socket: socketIO.Socket) => {
  const eventSourceInitDict = {
    headers: getHeaders(socket.handshake.headers),
  };

  try {
    const sse = new EventSource(
      `${NEXUS_URL}/projects/events`,
      eventSourceInitDict,
    );

    sse.addEventListener('ProjectCreated', (e: any) => {
      socket.emit('Created', JSON.parse(e.data));
    });

    sse.addEventListener('ProjectUpdated', (e: any) => {
      socket.emit('Updated', JSON.parse(e.data));
    });

    sse.addEventListener('ProjectDeprecated', (e: any) => {
      socket.emit('Deprecated', JSON.parse(e.data));
    });

    sse.onerror = error => {
      socket.error(error);
    };
  } catch (error) {
    socket.error(error);
  }
});

// Resources events
const resourceNSP = io.of('/resources');
resourceNSP.on('connection', (socket: socketIO.Socket) => {
  const { org, project } = socket.handshake.query;
  const eventSourceInitDict = {
    headers: getHeaders(socket.handshake.headers),
  };

  let url = NEXUS_URL;
  if (org) {
    url = url + '/' + org;
    if (project) {
      url = url + '/' + project;
    }
  }

  try {
    const sse = new EventSource(`${url}/events`, eventSourceInitDict);

    sse.addEventListener('Created', (e: any) => {
      socket.emit('Created', JSON.parse(e.data));
    });

    sse.addEventListener('Updated', (e: any) => {
      socket.emit('Updated', JSON.parse(e.data));
    });

    sse.addEventListener('Deprecated', (e: any) => {
      socket.emit('Deprecated', JSON.parse(e.data));
    });

    sse.onerror = error => {
      socket.error(error);
    };
  } catch (error) {
    console.log(error);
    socket.error(error);
  }
});

http.listen(3000, () => {
  console.log(`listening on ${PORT_NUMBER}`);
});
