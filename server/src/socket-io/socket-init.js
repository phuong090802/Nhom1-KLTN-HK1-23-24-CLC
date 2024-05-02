import auth from './namespaces/auth.js';
import main from './namespaces/main.js';

export default function socketIO(io) {
  // main namespace
  main(io);

  // auth namespace
  auth(io);
}
