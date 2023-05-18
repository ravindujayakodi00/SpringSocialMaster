const Login = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
        <div className="w-1/2 h-1/2 flex justify-center items-center">
            <div className="w-1/2">
            <h1 className="text-4xl font-bold">Login</h1>
            <form className="flex flex-col">
                <input
                className="border-2 border-gray-400 p-2 my-2"
                type="text"
                placeholder="Email"
                />
                <input
                className="border-2 border-gray-400 p-2 my-2"
                type="password"
                placeholder="Password"
                />
                <button className="bg-blue-500 text-white p-2 rounded">
                Login
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Login;