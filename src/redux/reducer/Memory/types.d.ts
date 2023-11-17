interface Rem {
	to: IProfile;
	from: IProfile;
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