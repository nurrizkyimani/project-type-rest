import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  async whoAmI(uid: string) {
    await admin
      .auth()
      .getUser(uid)
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.

        // console.log('Successfully fetched user data:', userRecord.toJSON());

        const userRecording = userRecord.providerData[0].toJSON();
        console.log(userRecording);
        return {
          userRecording,
        };
      })
      .catch(function(error) {
        console.log('Error fetching user data:', error);
      });
  }
}
