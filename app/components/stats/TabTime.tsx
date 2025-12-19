// components/stats/TabTime.tsx
import React from 'react';

// 공통 차트 컴포넌트
const LineChart = ({ data }: { data: { label: string, rate: number, hasData: boolean }[] }) => {
    if (!data.some(d => d.hasData)) return <div className="h-24 flex items-center justify-center text-slate-400 text-xs">데이터 부족</div>;
    const getPoints = () => {
        const count = data.length;
        const stepX = count > 1 ? 300 / (count - 1) : 150;
        return data.map((d, idx) => d.hasData ? `${25 + (idx * stepX)},${125 - d.rate}` : null).filter(p => p).join(' ');
    };
    return (
        <div className="relative w-full aspect-[2/1] select-none">
            <svg viewBox="0 0 350 150" className="w-full h-full overflow-visible">
                {[25, 75, 125].map(y => <line key={y} x1="25" y1={y} x2="325" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray={y !== 125 ? "4" : ""} />)}
                <polyline points={getPoints()} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((d, idx) => {
                    const x = 25 + (idx * (data.length > 1 ? 300 / (data.length - 1) : 150));
                    return (
                        <g key={idx}>
                            <text x={x} y="145" textAnchor="middle" fontSize={data.length > 10 ? "8" : "10"} fill={d.hasData ? "#64748b" : "#cbd5e1"} fontWeight="bold">{d.label}</text>
                            {d.hasData && <circle cx={x} cy={125 - d.rate} r="3" fill="white" stroke="#3b82f6" strokeWidth="2" />}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default function TabTime({ data }: { data: any }) {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-2 flex items-center gap-2"><span>📊</span> 요일별 승률</h3>
                <LineChart data={data.weeklyStats} />
            </div>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-2 flex items-center gap-2"><span>📅</span> 일별 승률 (최근 7일)</h3>
                <LineChart data={data.dailyStats} />
            </div>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-2 flex items-center gap-2"><span>🗓️</span> 월별 승률</h3>
                <LineChart data={data.monthlyStats} />
            </div>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-2 flex items-center gap-2"><span>🚩</span> 연도별 승률</h3>
                <LineChart data={data.yearlyStats} />
            </div>
        </div>
    );
}