import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
	async whoAmI(uid: string) {
		const userrecord = await admin.auth().getUser(uid);
		const endres = await userrecord.providerData[0].toJSON();
		return endres;
	}
}
