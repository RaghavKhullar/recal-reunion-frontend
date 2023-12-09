// For all the rems written by user we just return the to user, whereas in rems written for user we return from user
interface Rem {
  id: string;
  to?: IProfile;
  from?: IProfile;
  image: string | null;
  isPrivate: boolean;
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
  // This will be true when writing rem for the first time, else while updating it will be false if no new file is updated
  isFileUpdated: boolean;
}
