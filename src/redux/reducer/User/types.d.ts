interface OldRem {
	email: string;
	image: string | null;
	content: string;
}

interface IProfile {
	_id: string;
	name: string;
	email: string;
	dateOfBirth: Date;
	department: string;
	image: string | null;
	linkedin: string | null;
	instagram: string | null;
	x: string | null;
	facebook: string | null;
}

interface IUser {
	user?: IProfile;
	oldRem?: OldRem;
	writtenByUser: MemoryState;
	writtenForUser: MemoryState;
}

interface UserState {
	loggedIn: boolean;
	isFetching: boolean;
	isProfileUpdated: boolean;
	isFetchingSearch: boolean;
	isFetchingOtherUser: boolean;
	isOtherUserFetched: boolean;
	currentUser: IUser;
	otherUser: IUser;
}

interface APIError {
	message: string;
}

interface GetUserDetailsResponse {
	user: IProfile;
	oldRem?: OldRem
}