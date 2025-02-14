import { ChangeEvent } from "react";

export default function DropdownInput({ onChange }: { onChange: (e: ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-black pt-4">
                Role
            </label>
            <select
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
            </select>
        </div>
    );
}
