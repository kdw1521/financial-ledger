import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {Button, Stack} from "react-bootstrap";
import {GoogleLogin} from 'react-google-login';
import axios from "axios";
import { LOGIN_URL } from "shared/action/url";

const clientId = process.env.REACT_APP_CLIENT_ID;


function Social() {

    const onGoogleSuccess = async (e) => {
        const { profileObj : { email, name } } = e;

        const result = await axios.post(LOGIN_URL, {
            email,
            name
        })
        console.log(result.data);


    }

    const onGoogleFailure = async (error) => {
        console.log(error);
    }
    
    const onSocialClick = async (e) => {
        console.log(clientId);
        const provider = "서버 작업 후 진행";
        window.confirm(provider);
    }

    return (
        <>
            <Stack gap={3} className="col-md-2 mx-auto">
                <GoogleLogin 
                    clientId={clientId}
                    responseType={"id_token"}
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure} 
                    className="mt-5"
                />
                <Button variant="outline-dark" onClick={onSocialClick} name="naver">
                    Continue with Naver (naver image 추가예정)
                </Button>
                <Button variant="outline-dark" onClick={onSocialClick} name="kakao">
                    Continue with Kakao (kakao image 추가예정)
                </Button>
            </Stack>
        </>
    )
}

export default Social;