import {Button, Stack} from "react-bootstrap";
import {GoogleLogin} from 'react-google-login';
import axios from "axios";
import { LOGIN_URL } from "shared/action/url";
import {useHistory} from "react-router";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const clientId = process.env.REACT_APP_CLIENT_ID;


function Social({isLogin}) {

    const history = useHistory();

    const onGoogleSuccess = async (e) => {
        const { profileObj : { email, name } } = e;

        try {
            const result = await axios.post(LOGIN_URL, {
                email,
                name
            })
    
            if (result.data.token) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("name", name)
                history.push("/")
                window.location.reload()
            }    
        } catch (err) {
            console.log(err.message)
            if(err.response.status === 401) {
                alert("토큰 만기로 로그아웃 됩니다. 재로그인 해주세요!") 
                localStorage.clear()
                window.location.reload()
             }
        }
        
    }

    const onGoogleFailure = async (error) => {
        console.log(error);
    }
    
    // const onSocialClick = async (e) => {
    //     console.log(clientId);
    //     const provider = "서버 작업 후 진행";
    //     window.confirm(provider);
    // }

    return (
        <>
            <Stack gap={3} className="col-md-2 mx-auto max-width-15">
                <GoogleLogin 
                    clientId={clientId}
                    responseType={"id_token"}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} variant="outline-dark" className="mt-5">
                            <FontAwesomeIcon icon={faGoogle} />
                            <span className="ml-1">Google</span>
                        </Button>
                      )}
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure} 
                />
                {/* <Button variant="outline-dark" onClick={onSocialClick} name="naver">
                    Continue with Naver (naver image 추가예정)
                </Button>
                <Button variant="outline-dark" onClick={onSocialClick} name="kakao">
                    Continue with Kakao (kakao image 추가예정)
                </Button> */}
            </Stack>
        </>
    )
}

export default Social;