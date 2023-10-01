import { getUserDetails } from "../utils/getAdminDetails";

const AdminHome: React.FC = () => {
    return (
        <>
           <h1>Hi Admin</h1>
           <button onClick={() => console.log(getUserDetails())}> Get User Details </button><br/>
        </>
    )
};

export { AdminHome };