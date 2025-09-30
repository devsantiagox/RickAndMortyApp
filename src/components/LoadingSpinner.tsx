interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-32 h-32'
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                {/* Outer ring */}
                <div className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full animate-spin`}></div>
                {/* Inner ring */}
                <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
            </div>
            <p className="text-gray-600 font-medium animate-pulse">{message}</p>
        </div>
    );
}
