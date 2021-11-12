import {Button, Stack} from "react-bootstrap";
import {GoogleLogin} from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import axios from "axios";
import { LOGIN_URL } from "shared/action/url";

import { faGoogle, faKaggle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const clientId = process.env.REACT_APP_CLIENT_ID;
const kakaoToken = process.env.REACT_APP_KAKAO_TOKEN;

function Social({isLogin}) {


    const socialLogin = async (userKey, name) => {
        try {
            const result = await axios.post(LOGIN_URL, {
                userKey,
                name
            })
            if (result.data.token) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("name", name)
                window.location.reload()
            }    
        } catch (err) {
            console.log(err.message)
        }
    }

    const onGoogleSuccess = async (e) => {
        const { profileObj : { name }, wa } = e;
        socialLogin(wa, name)
    }

    const onKakaoSuccess = async (e) => {
        const { properties: {nickname}, id} = e.profile
        socialLogin(id, nickname)
    }

    const onKakaoFail = async (err) => {
        console.log(err)
    }
    const onGoogleFailure = async (err) => {
        console.log(err);
    }

    return (
        <>

            <Stack gap={3} className="col-md-2 mx-auto max-width-15">
                <GoogleLogin 
                    clientId={clientId}
                    responseType={"id_token"}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} variant="outline-dark" className="mt-10">
                            <FontAwesomeIcon icon={faGoogle} className="font-color"/>
                            <span className="ml-1">Google</span>
                        </Button>
                      )}
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure} 
                />
                <KaKaoLogin
                    token={kakaoToken}
                    buttonText="KaKao"
                    onSuccess={onKakaoSuccess}
                    onFail={onKakaoFail}
                    getProfile={true}
                    render={renderProps =>( 
                        <Button onClick={renderProps.onClick} variant="outline-dark" className="mt-5">
                            <FontAwesomeIcon icon={faKaggle} className="font-color"/>
                            <span className="ml-1">Kakao</span>
                        </Button>
                    )}
                />
            </Stack>
        </>
    )
}

export default Social;