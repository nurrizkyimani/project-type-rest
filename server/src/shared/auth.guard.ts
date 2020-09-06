import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		// console.log(request.headers);

		if (!request.headers.authorization) {
			return false;
		}

		// console.log('this is request'
		// console.log('this sis header auth ' + request.headers.authorization);

		const decoded = await this.validateToken(request.headers.authorization);

		console.log(`this is decode uid : ${decoded.uid}`);

		if (decoded.status == true) {
			request.user = decoded.uid;
			return true;
		}

		return false;
	}

	async validateToken(auth_token: string) {
		try {
			if (auth_token.split(' ')[0] !== 'Bearer') {
				throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
			}

			const real_token = auth_token.split(' ')[1];

			// console.log(`real token is  ${real_token}`);

			const decodedToken = await admin.auth().verifyIdToken(real_token);
			const uid = decodedToken.uid;
			console.log(uid);

			return {
				status: true,
				uid: uid
			};
		} catch (error) {
			console.log(error);

			return {
				status: false,
				uid: error
			};
		}
	}
}
