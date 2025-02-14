import { Appbar } from "../components/Appbar"
import { SigninCard } from "../components/SigninCard"

export const Signin = () => {
    return (
        <div>
            <Appbar/>   
            <SigninCard type="signin" />
        </div>
    )
}
