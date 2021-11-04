import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {Button, Stack} from "react-bootstrap"

function Social() {
    
    const onSocialClick = async (e) => {
        const provider = "google 서버 작업 후 진행";
        window.confirm(provider);
    }

    return (
        <>
            <Stack gap={3} className="col-md-2 mx-auto">
                <Button variant="outline-dark" onClick={onSocialClick} name="google" className="mt-5">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </Button>
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