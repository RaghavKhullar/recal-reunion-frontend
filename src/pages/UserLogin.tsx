import { getGoogleUrl } from "../utils/getGoogleUrl";

const UserLogin: React.FC = () => {
	return (
		<>
			<a href={getGoogleUrl(false)}> Sign in with Google 🚀</a>
			<br />
		</>
	);
};

export { UserLogin };
