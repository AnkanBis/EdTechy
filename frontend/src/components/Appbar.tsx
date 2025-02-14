// import { Button } from "./Button"

// import { Button } from "./Button"

export const Appbar = () => {
    return (
        <div className="border-b flex items-center px-10 py-4">
            {/* Left Side: EdTech Platform + Menu Items */}
            <div className="flex items-center gap-6 font-bold text-2xl">
                <span>EdTech Platform</span>
                <div className="flex gap-6 text-lg font-normal">
                    <div>Colleges</div>
                    <div>Programs</div>
                    <div>Scholarships</div>
                </div>
            </div>
        </div>
    )
}
