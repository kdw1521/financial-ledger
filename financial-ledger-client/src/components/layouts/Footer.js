import {OverlayTrigger, Tooltip} from "react-bootstrap"

function Footer() {
    return (
        <div className="footer">
            <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                    <Tooltip id="tooltip-right">
                        <em> 2021. Kim Do Wan</em>
                    </Tooltip>
                }
                >
                    <em>©</em>
            </OverlayTrigger>
            
        </div>
    )
}

export default Footer