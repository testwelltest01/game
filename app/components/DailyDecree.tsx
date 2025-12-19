'use client';

import { useState, useEffect } from 'react';
import { Decree, DAILY_DECREES } from "../data";

interface Props {
    onClose: () => void;
}

export default function DailyDecree({ onClose }: Props) {
    const [decree, setDecree] = useState<Decree | null>(null);

    // 🆕 비디오 소스 상태 (단일 파일이므로 초기값 바로 지정 가능하지만, 일관성을 위해 state 사용)
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        // 1. 말씀 랜덤 뽑기
        const randomDecree = DAILY_DECREES[Math.floor(Math.random() * DAILY_DECREES.length)];
        setDecree(randomDecree);

        // 2. 🆕 배경 비디오 설정 (daily1.mp4 고정)
        setVideoSrc('/video/daily1.mp4');
    }, []);

    if (!decree) return null;

    return (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden animate-fade-in px-6">

            {/* 🆕 1. 배경 비디오 레이어 (z-0) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {videoSrc && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 말씀 카드가 잘 보이도록 배경을 살짝 어둡게 눌러줌 (검정 + 황금빛 틴트) */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-yellow-900/20 mix-blend-overlay"></div>
            </div>

            {/* 2. 실제 콘텐츠 레이어 (z-10) */}
            <div className="relative z-10 w-full flex flex-col items-center">

                {/* 왕관 아이콘 */}
                <div className="text-6xl mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">👑</div>

                <h2 className="text-2xl font-black text-yellow-400 mb-2 tracking-widest uppercase drop-shadow-md">
                    The King's Decree
                </h2>
                <p className="text-yellow-100/80 text-xs font-bold mb-8 tracking-wider">
                    국왕의 칙령이 도착했습니다.
                </p>

                {/* 칙령 카드 (양피지 느낌) */}
                <div className="w-full max-w-sm bg-[#fdfbf7] p-8 rounded-[2rem] shadow-2xl border-4 border-[#eaddcf] relative transform transition-transform hover:scale-105 duration-300">
                    {/* 인장 */}
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
                    className="mt-10 px-10 py-4 bg-gradient-to-r from-yellow-600 to-amber-700 text-white rounded-full font-bold shadow-lg shadow-amber-900/50 active:scale-95 transition-all flex items-center gap-2 border border-yellow-400/30"
                >
                    <span>칙령 받들기 (접수)</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Enter</span>
                </button>
            </div>
        </div>
    );
}