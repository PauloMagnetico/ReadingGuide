function feedbackBar() {
    return (
        <div className="flex flex-wrap w-full border-2">
            <div className="flex-1 border bg-yellow-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">Start</div>
            <div className="flex-1 border bg-green-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">M3</div>
            <div className="flex-1 border bg-blue-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">E3</div>
            <div className="flex-1 border bg-red-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">M4</div>
            <div className="flex-1 border bg-gray-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">E4</div>
            <div className="flex-1 border bg-yellow-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">M5</div>
            <div className="flex-1 border bg-green-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">E5</div>
            <div className="flex-1 border bg-blue-200 flex justify-center items-center hover:shadow-lg hover:font-bold hover:scale-110 transition-transform">M6</div>
        </div>
    );
}

export default feedbackBar;