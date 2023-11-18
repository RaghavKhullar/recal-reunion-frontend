// For all the rems written by user we just return the to user, whereas in rems written for user we return from user
interface Rem {
	id: string;
	to?: IProfile;
	from?: IProfile;
	image: string | null;
	content: string;
}

interface MemoryState {
	isFetching: boolean;
	rems: Rem[];
}

interface WriteRemBody {
	file: File | undefined;
	content: string;
	to: string;
}