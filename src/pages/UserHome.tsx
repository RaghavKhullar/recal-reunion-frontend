import { getUserDetails } from "../utils/getAdminDetails";

const UserHome: React.FC = () => {
    return (
        <>
           <h1>Hi User</h1>
           <button onClick={() => console.log(getUserDetails())}> Get User Details </button><br/>
        </>
    )
};

export { UserHome };