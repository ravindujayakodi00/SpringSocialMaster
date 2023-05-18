const Signup = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
        <div className="w-96">
            <h1 className="text-4xl font-bold mb-6">Sign up</h1>
            <form className="flex flex-col gap-3">
            <input
                type="text"
                placeholder="Username"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Sign up
            </button>
            </form>
        </div>
        </div>
    );
}

export default Signup;