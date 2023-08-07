export type User = CustomCognitoUser & InternalUser;
//TODO: Continue on interfaces
export interface CustomCognitoUser {
	//Username is the subId of the user in cognito
	username: string;
	attributes: {
		email: string;
		phoneNumber?: string;
	};
}

export interface InternalUser {
	teams: Team[];
}

interface Team {
	id: number;
	healthCheckUsage: number;
	uuid: string;
	name: string;
	users: InternalUser[];
	HealthCheck: HealthCheck[];
	healthCheckId: string;
	Incident: Incident[];
}

interface Incident {
	id: number;
	status: IncidentStatus;
	startedAt: Date;
	cause: string;
	assignedUser: InternalUser;
	team: Team;
	healthCheck: HealthCheck;
	userId: number;
	teamId: number;
	healthCheckId: string;
}

//TODO:Add healthcheck interface when its ready
interface HealthCheck {
	id: number;
}

enum IncidentStatus {
	ONGOING = 'ONGOING',
	RESOLVED = 'RESOLVED',
	ACKNOWLEDGED = 'ACKNOWLEDGED'
}
