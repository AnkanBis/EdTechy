import { SigninType } from "@ankan_biswas/edtech-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import LabelledInput from "./LabelledInput";
import { useState } from "react";
// import DropdownInput from "./DropdownInput";

export const SigninCard = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninType>({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    async function handleSendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const { success, message, token, role } = res.data;
            if (!success) {
                setMessage(message);
                return;
            }

            // console.log("Success:", success);
            localStorage.setItem("token", token);

            if (role === "student") {
                navigate("/dashboard/student");
            } else if (role === "agent") {
                navigate("/dashboard/agent");
            } else if (role === "admin") {
                navigate("/dashboard/admin");
            } else {
                navigate("/dashboard");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                // alert(error.response.data.message)
                console.error("Response data:", error.response.data);
                setMessage(error.response.data.message);
            } else {
                console.error("Network or other error:", error.message);
                setMessage("Something went wrong. Please try again.");
            }
        }

    }

    return (
        <div className="h-screen flex justify-center items-center bg-slate-300">
            <div className="w-[400px] h-auto rounded-2xl overflow-hidden shadow-lg bg-white p-5">
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-900 pl-20">Sign in to Account</h3>
                    <div className="text-slate-600 pl-16 text-sm ">
                        {type === "signin"
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <Link
                            className="pl-2 underline"
                            to={type === "signin" ? "/signup" : "/signin"}
                        >
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                    {/* <LabelledInput label="Name" placeholder="Enter your full name" onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} /> */}

                    <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" type="password" placeholder="Enter your password" onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                    {/* <DropdownInput onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            role: e.target.value
                        }))
                    }} /> */}
                    <Button onClick={handleSendRequest} value={"Sign in"} />
                    <div className="">
                        {message && <p className="text-red-500 text-sm mt-2 pl-24">{message}</p>}

                    </div>
                </div>
            </div>
        </div>
    )
}







// interface ButtonProps {
//     onClick?: React.MouseEventHandler<HTMLButtonElement>; // Optional function type
// }

// const Button: React.FC<ButtonProps> = ({ onClick }) => {
//     return (
//         <button
//             type="button"
//             onClick={onClick}
//             className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
//                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
//         >Sign up
//         </button>
//     )
// }
