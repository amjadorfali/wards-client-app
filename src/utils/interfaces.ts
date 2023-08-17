import { CompareType } from 'modules/Dashboard/Pages/Monitors/AddMonitor';

export type User = CustomCognitoUser & InternalUser;
export interface CustomCognitoUser {
	/** Username is the subId of the user in cognito */
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

export interface HealthCheck {
	id: string;
	name: string;
	method: string;
	timeout: number;
	enabled: boolean;
	type: string;
	inProgress: boolean;
	interval: number;
	lastChecked: Date;
	url: string;
	locations: string[];
	createdAt: Date;
	updatedAt: Date;
	teamId: number;
	assertionId: number;
	insightsId?: string;
	metadataId?: number;

	insights?: {
		id: string;
		sslIssuedBy?: string;
		sslExpiresOn?: string;
		status: number;
		updatedAt: Date;
	};
	metadata: {
		verifySSL: boolean;
		headers: { key: string; value: string }[];
		assertions: { type: string; key: string; value: string; compareType: CompareType }[];
		requestBody: string;
		httpUserName: string;
		httpPassword: string;
		id: number;
	};
}

enum IncidentStatus {
	ONGOING = 'ONGOING',
	RESOLVED = 'RESOLVED',
	ACKNOWLEDGED = 'ACKNOWLEDGED'
}

export interface DateFilter {
	start: Date;
	end: Date;
}
