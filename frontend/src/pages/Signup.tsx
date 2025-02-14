import { Appbar } from "../components/Appbar"
import { SignupCard } from "../components/SignupCard"

export const Signup = () => {
    return (
        <div>
            <Appbar/>
            <SignupCard type="signup" />
        </div>
    )
}
