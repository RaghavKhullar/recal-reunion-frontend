import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { Title, Text } from "@mantine/core";

const UserLogin: React.FC = () => {
    return (
        <>
        <div style={{display : "flex", justifyContent : "center", alignItems : "center", height : "80%"}}>
            <div style={{textAlign : "center"}}>
            <Title style={{fontFamily : "'Bebas Neue', sans-serif", fontSize : "4rem"}}>WELCOME</Title>
            <Text style={{fontFamily : "'Bebas Neue', sans-serif", fontSize : "1.5rem", marginBottom : "2rem"}}>Log in the easy way</Text>
            <a href={getGoogleUrl(false)} style={{backgroundColor : "black", color : "white", padding : "0.5rem 4rem", borderRadius : "0.5rem"}}> Sign in with Google</a>
            </div>
           
        </div>
            
            
        </>
    );
};

export default UserLogin;