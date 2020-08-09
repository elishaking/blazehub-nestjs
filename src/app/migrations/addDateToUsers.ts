import * as app from 'firebase/app';
import 'firebase/database';

import { firebaseConfig } from '../config';

class AddDateToUsers {
  constructor() {
    app.initializeApp(firebaseConfig);
  }

  async up() {
    const usersSnapshot = await app
      .database()
      .ref('users')
      .once('value');

    const users = usersSnapshot.val();
    const keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const user = users[key];
      if (!user.date) {
        await usersSnapshot.ref
          .child(key)
          .child('date')
          .set(Date.now());
      }
    }
  }

  async down() {
    console.warn('Deleting column');
    console.log('Not defined yet');
  }
}

const run = new AddDateToUsers();
if (process.argv[2] === 'up')
  run
    .up()
    .then(() => {
      return app.apps[0].delete();
    })
    .then(() => {
      console.log('Done');
    });
