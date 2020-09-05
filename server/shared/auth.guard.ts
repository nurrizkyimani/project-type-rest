import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		if (request.headers.authorization) {
			return false;
		}

		console.log(request);

		console.log(request.header.authorization);

		const decoded = this.validateToken(request.headers.authorization);
		if (decoded) {
			request.user = decoded;
			return true;
		}

		// return true;

		return false;
	}

	async validateToken(auth_token: string) {
		try {
			const decodedToken = await admin.auth().verifyIdToken(auth_token);
			let uid = decodedToken.uid;
			console.log(uid);
			return uid;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
