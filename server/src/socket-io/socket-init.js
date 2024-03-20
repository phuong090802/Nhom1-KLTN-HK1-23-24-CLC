import auth from './namespaces/auth.js';
import main from './namespaces/main.js';

import admin from './namespaces/based-roles/admin.js';
import departmentHead from './namespaces/based-roles/department-head.js';
import message from './namespaces/based-schemas/message.js';

export default function socketIO(io) {
  // main namespace
  main(io);

  // auth namespace
  auth(io);

  //#region based-roles

  // admin namespace
  admin(io);

  // department-head namespace
  departmentHead(io);

  // counsellor namespace

  //#endregion

  //#region based-schema
  message(io);
  //#endregion
}
