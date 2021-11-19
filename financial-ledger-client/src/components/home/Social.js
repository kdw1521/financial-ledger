import {Button, Stack } from "react-bootstrap";
import {GoogleLogin} from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import NaverLogin from 'react-naver-login'
import axios from "axios";

import { faGrin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LOGIN_URL } from "shared/action/url";
import naverImg from "img/naver.png"
import kakaoImg from "img/kakao.png"
import googleImg from "img/google.png"

const clientId = process.env.REACT_APP_CLIENT_ID;
const kakaoToken = process.env.REACT_APP_KAKAO_TOKEN;
const naverToken = process.env.REACT_APP_NAVER_TOKEN;
const naverCallback = process.env.REACT_APP_NAVER_CALLBACK;

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
        const { profileObj : { name, googleId } } = e;
        socialLogin(googleId, name)
    }

    const onKakaoSuccess = async (e) => {
        const { properties: {nickname}, id} = e.profile
        socialLogin(id, nickname)
    }

    const onNaverSuccess = async (e) => {
        const { id, name } = e;
        socialLogin(id, name)
    }

    const onKakaoFail = async (err) => {
        console.log(err)
    }
    const onGoogleFailure = async (err) => {
        console.log(err);
    }
    const onNaverFailure = async (err) => {
        console.log(err)
    }

    return (
        <>
                <Stack gap={3} className="col-md-2 mx-auto max-width-15 mt-10">
                    <span style={{textAlign:"center", fontSize:"1.5rem"}}>
                        <span className="font-color">완도</span> 가계부<br/>
                        환영해요! <FontAwesomeIcon icon={faGrin} />
                        </span>
                    <span style={{textAlign: "center", fontSize:"0.8rem"}} className="mt-3">
                        가계부를 이용하시려면<br/>
                        아래 중 하나로 로그인 해주세요!
                    </span>
                    <GoogleLogin 
                        clientId={clientId}
                        responseType={"id_token"}
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} variant="outline-dark" className="mt-5" >
                                <img src={googleImg} style={{width:"1.5rem", height: "1.5rem"}} alt="google img" />
                                <span className="ml-04">Google</span>
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
                                <img src={kakaoImg} style={{width:"1.5rem", height: "1.5rem"}} alt="kakao img" />
                                <span className="ml-04">Kakao</span>
                            </Button>
                        )}
                    />
                    <NaverLogin 
                        clientId={naverToken}
                        callbackUrl= {naverCallback}
                        buttonText="Naver"
                        onSuccess={onNaverSuccess}
                        onFailure={onNaverFailure}
                        getProfile={true}
                        render={renderProps =>( 
                            <Button onClick={renderProps.onClick} variant="outline-dark" className="mt-5">
                                <img src={naverImg} style={{width:"1.5rem", height: "1.5rem"}} alt="naver img" />
                                <span className="ml-04">Naver</span>
                            </Button> 
                        )}
                    />
                </Stack>
                
        </>
    )
}

export default Social;