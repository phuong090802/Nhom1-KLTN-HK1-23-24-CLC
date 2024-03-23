import auth from './namespaces/auth.js';
import main from './namespaces/main.js';

import admin from './namespaces/based-roles/admin.js';
import counsellor from './namespaces/based-roles/counsellor.js';
import departmentHead from './namespaces/based-roles/department-head.js';

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
  counsellor(io);

  //#endregion

  //#region based-schema
  
  //#endregion
}
