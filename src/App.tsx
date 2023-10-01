import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const App: React.FC = () => {
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {(isAdmin) ? (
        <>
          <h1>Admin</h1>
          <Link to="/admin/login"> Login </Link><br />
          <button onClick={() => {setAdmin(false);navigate("/");}}> No I am User </button>
        </>
      ) : (
        <>
          <h1>User</h1> 
          <Link to="/user/login"> Login </Link><br />
          <button onClick={() => {setAdmin(true);navigate("/");}}> No I am Admin </button>
        </>
      )}
    </>
  )
};

export default App;
