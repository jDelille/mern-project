export type User = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	picturePath: string;
	followers: string[];
	following: string[];
	specialties: string[];
	location: string;
	bio: string;
	viewedProfile: number;
	impressions: number;
};
