export class UserDTO {
	uid: string;
	displayName: string;
	email: string;
	photoURL: string;

	constructor(partial: Partial<UserDTO>) {
		Object.assign(this, partial);
	}
}

// {
//   uid: '115952357354635751095',
//   displayName: 'Indieunicreative',
//   email: 'indieunicreative@gmail.com',
//   photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Giz0LPtaKhJinMiqM566hs4N98k1hvaSNivBzYeiA',
//   providerId: 'google.com',
//   phoneNumber: undefined
// }
