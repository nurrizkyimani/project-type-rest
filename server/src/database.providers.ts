import { createConnection } from 'typeorm';

export const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: async () =>
			await createConnection({
				type: 'postgres',
				host: 'ec2-54-236-169-55.compute-1.amazonaws.com',
				port: 5432,
				username: 'pdzobfdljfjsqj',
				password: '72e6f410ea7c81e16b28e21d0fd56200400b681d1f2a549d1bfd2145010a2f25',
				database: 'd54e24h4bcaom0',
				entities: [ __dirname + '/../**/*.entity{.ts,.js}' ],
				synchronize: true,
				ssl: true,
				extra: {
					ssl: {
						rejectUnauthorized: false
					}
				}
			})
	}
];
