import { getGoogleUrl } from "../utils/getGoogleUrl";

const AdminLogin: React.FC = () => {
	return (
		<>
			<a href={getGoogleUrl(true)}> Sign in with Google 🚀</a>
			<br />
		</>
	);
};

export { AdminLogin };
