// import { Appbar } from "../components/Appbar"

import {  useNavigate } from "react-router-dom";
import { Button } from "../components/Button";


export const LandingPage = () => {
    return (
        <div>
            <Appbar />
            <div className="w-screen h-screen">
                {/* Section 1: Main Heading */}
                <div className="flex justify-center pt-16 h-96">
                    <header className="text-6xl font-sans font-bold">
                        Make your Dream College a reality
                    </header>
                </div>

                {/* Section 2: Testimonials */}
                <div className="flex flex-col items-center pt-16">
                    <header className="text-6xl font-sans font-bold text-center">
                        What Others Say About Us
                    </header>

                    {/* Centered Cards */}
                    <div className="flex justify-center gap-6 mt-10">
                        <Card heading="Kunal Kushwaha" para="StudySync revolutionized my classroom! Engaging content and teacher resources make learning enjoyable. Highly recommended for educators" />
                        <Card heading="Harkirat Singh" para="StudySync revolutionized my classroom! Engaging content and teacher resources make learning enjoyable. Highly recommended for educators" />
                        <Card heading="Piyush Garg" para="StudySync revolutionized my classroom! Engaging content and teacher resources make learning enjoyable. Highly recommended for educators" />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface CardProps {
    heading: string;
    para: string;
}

function Card({ heading, para }: CardProps) {
    return (
        <div

            className="block max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow-sm hover:bg-orange-400 text-white "
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  ">
                {heading}
            </h5>
            <p className="font-normal text-gray-700 ">
                {para}
            </p>
        </div>
    );
}


const Appbar = () => {
    const navigate = useNavigate();



    return (
        <div className="border-b flex items-center justify-between ">
            {/* Left Side: EdTech Platform + Menu Items */}
            <div className="flex items-center gap-4 pl-11">
                <span className="font-bold text-xl">EdTech Platform</span>
                <div className="flex gap-4 text-base font-normal">
                    <div>Colleges</div>
                    <div>Programs</div>
                    <div>Scholarships</div>
                </div>
            </div>

            {/* Right Side: Login Button */}
            <div className="pr-11">
                <Button value="Login" onClick={() => navigate("/signup")} />
            </div>
        </div>

    );
};

