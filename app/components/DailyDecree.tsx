'use client';

import { useState, useEffect } from 'react';
import { Decree, DAILY_DECREES } from "../data";

interface Props {
    onClose: () => void;
}

export default function DailyDecree({ onClose }: Props) {
    const [decree, setDecree] = useState<Decree | null>(null);

    useEffect(() => {
        // 랜덤으로 말씀 하나 뽑기
        const randomDecree = DAILY_DECREES[Math.floor(Math.random() * DAILY_DECREES.length)];
        setDecree(randomDecree);
    }, []);

    if (!decree) return null;

    return (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in px-6">

            {/* 왕관 아이콘 */}
            <div className="text-6xl mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">👑</div>

            <h2 className="text-2xl font-black text-yellow-500 mb-2 tracking-widest uppercase">The King's Decree</h2>
            <p className="text-slate-300 text-xs font-bold mb-8">국왕의 칙령이 도착했습니다.</p>

            {/* 칙령 카드 (양피지 느낌) */}
            <div className="w-full max-w-sm bg-[#fdfbf7] p-8 rounded-[2rem] shadow-2xl border-4 border-[#eaddcf] relative transform transition-transform hover:scale-105 duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-800 rounded-full border-4 border-[#fdfbf7] shadow-md flex items-center justify-center text-white text-xs font-bold">
                    인
                </div>

                <div className="mt-4 text-center">
                    <p className="text-lg font-serif text-slate-800 leading-relaxed word-break-keep mb-4 font-bold">
                        "{decree.verse}"
                    </p>
                    <p className="text-xs text-amber-700 font-bold mb-6 block border-b border-amber-200 pb-4 mx-10">
                        {decree.ref}
                    </p>

                    <p className="text-sm text-slate-500 italic">
                        왕의 전언:<br />
                        "<span className="text-slate-800 font-bold not-italic">{decree.message}</span>"
                    </p>
                </div>
            </div>

            <button
                onClick={onClose}
                className="mt-10 px-10 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full font-bold shadow-lg shadow-amber-900/40 active:scale-95 transition-all flex items-center gap-2"
            >
                <span>칙령 받들기 (접수)</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Enter</span>
            </button>

        </div>
    );
}