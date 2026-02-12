'use client';

interface ScoreCircleProps {
    score: number;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
}

export default function ScoreCircle({ score, size = 'md', label }: ScoreCircleProps) {
    const sizes = {
        sm: { width: 60, stroke: 4, fontSize: 'text-sm' },
        md: { width: 80, stroke: 6, fontSize: 'text-lg' },
        lg: { width: 120, stroke: 8, fontSize: 'text-2xl' },
    };

    const { width, stroke, fontSize } = sizes[size];
    const radius = (width - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (score: number) => {
        if (score >= 80) return '#10b981'; // green
        if (score >= 60) return '#3b82f6'; // blue
        if (score >= 40) return '#f59e0b'; // yellow
        return '#ef4444'; // red
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width, height: width }}>
                <svg className="transform -rotate-90" width={width} height={width}>
                    {/* Background circle */}
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth={stroke}
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={stroke}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-bold ${fontSize}`} style={{ color }}>
                        {score}
                    </span>
                </div>
            </div>
            {label && (
                <span className="mt-2 text-sm font-medium text-secondary-600">{label}</span>
            )}
        </div>
    );
}
