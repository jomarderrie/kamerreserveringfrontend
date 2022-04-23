import {Link} from "react-router-dom";
import {StyledRouterLink} from "../styled/globals/StyledRouterLink";

export default function ErrorPage() {
    return <div>
        <h1>404 - Not Found!</h1>
        <StyledRouterLink activeClassName={"none"} to="/">Go Home</StyledRouterLink>
    </div>
}
