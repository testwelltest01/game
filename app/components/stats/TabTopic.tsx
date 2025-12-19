// components/stats/TabTopic.tsx
import React from 'react';

export default function TabTopic({ data }: { data: any }) {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* 1. 고난별 승률 */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2"><span>⚔️</span> 고난 주제별 승률 (내림차순)</h3>
                {data.monsterWinRates.length === 0 ? <p className="text-center text-slate-400 text-xs py-8">기록 없음</p> : (
                    <div className="space-y-3">
                        {data.monsterWinRates.map((m: any) => (
                            <div key={m.name} className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs font-bold mb-0.5 px-1">
                                    <span className="text-slate-700 flex items-center gap-1"><span>{m.emoji}</span> {m.name}</span>
                                    <span className={`${m.rate >= 80 ? 'text-blue-600' : 'text-slate-500'}`}>{m.rate}% ({m.count}전)</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${m.rate >= 80 ? 'bg-blue-500' : m.rate >= 50 ? 'bg-blue-400' : 'bg-slate-300'}`} style={{ width: `${m.rate}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 2. TOP 3 말씀 */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2"><span>📖</span> 승리의 말씀 TOP 3</h3>
                {data.topSkills.length === 0 ? <p className="text-center text-slate-400 text-xs py-8">기록 없음</p> : (
                    <div className="space-y-3">
                        {data.topSkills.map((s: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-black shadow-sm ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-700'}`}>{idx + 1}</div>
                                <div><p className="text-xs font-bold text-slate-800 line-clamp-1">{s.name}</p><p className="text-[10px] text-slate-500">{s.count}회 승리</p></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. 빈출 고난 */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2"><span>🚨</span> 기간별 최다 출몰 고난</h3>
                <div className="grid grid-cols-3 gap-2">
                    {[{ l: '이번 주', d: data.frequentHardships.week }, { l: '이번 달', d: data.frequentHardships.month }, { l: '올해', d: data.frequentHardships.year }].map((p: any, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-red-50 p-3 rounded-2xl border border-red-100 text-center">
                            <span className="text-[10px] text-slate-400 font-bold mb-2">{p.l}</span>
                            <span className="text-3xl mb-1 filter drop-shadow-sm">{p.d.emoji}</span>
                            <span className="text-[10px] font-bold text-slate-800 line-clamp-1 px-1">{p.d.name}</span>
                            {p.d.count > 0 && <span className="text-[9px] text-red-400 font-bold mt-1">{p.d.count}회</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}