'use client';

import { useState, useEffect } from 'react';
import { Skill } from "../data";

interface Props {
    godMsg: string;
    selectedSkill: Skill | null;
    showLight: boolean;
    onReset: () => void;
}

export default function Victory({ godMsg, selectedSkill, showLight, onReset }: Props) {
    // 🆕 배경 비디오 상태 관리
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const videoList = [
            '/video/victory1.mp4'
        ];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden animate-fade-in">

            {/* 🆕 1. 배경 비디오 레이어 */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {videoSrc && (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80" // 승리 화면은 좀 더 밝게
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 🆕 2. 황금빛 승리 분위기 오버레이 */}
                <div className={`absolute inset-0 bg-yellow-100/40 backdrop-blur-[2px] transition-opacity duration-1000 ${showLight ? 'opacity-100' : 'opacity-0'}`} />

                {/* 후광 효과 (기존 유지) */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0,white_20deg,transparent_40deg)] animate-spin-slow opacity-60 mix-blend-overlay" />
            </div>

            {/* --- 실제 콘텐츠 (z-10) --- */}
            <div className="relative z-10 w-full px-8 flex flex-col items-center h-full justify-center">

                <div className="text-6xl mb-6 animate-bounce filter drop-shadow-xl">👼</div>

                <h2 className="text-5xl font-black text-yellow-600 mb-2 tracking-tight drop-shadow-sm stroke-white">
                    VICTORY!
                </h2>

                {/* 어떤 말씀으로 이겼는지 표시 */}
                {selectedSkill && (
                    <div className="mb-8 bg-blue-600/90 text-white px-5 py-2 rounded-full text-sm font-bold border border-blue-400 shadow-lg animate-pulse">
                        🗡️ {selectedSkill.name}으로 승리!
                    </div>
                )}

                {/* 하나님 메시지 카드 */}
                <div className="w-full bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border-2 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="text-3xl mb-4 text-center">💌</div>
                    <p className="text-lg font-medium text-slate-800 leading-relaxed text-center break-keep drop-shadow-sm">
                        "{godMsg}"
                    </p>
                    <div className="mt-6 border-t border-slate-200/50 pt-4 text-center flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">FROM. HEAVEN</span>
                        <span className="text-sm font-bold text-yellow-700 bg-yellow-200/80 px-3 py-1 rounded-lg shadow-sm">
                            +POINT!
                        </span>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="mt-12 px-10 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl shadow-slate-900/30 active:scale-95 transition-all flex items-center gap-2 hover:bg-slate-800"
                >
                    <span>기쁨으로 복귀</span>
                    <span className="bg-slate-700 text-[10px] px-2 py-0.5 rounded-full">Enter</span>
                </button>
            </div>

            {/* 축하 효과 (기존 유지) */}
            <div className="absolute top-10 left-10 text-4xl animate-fall-1 drop-shadow-md">✨</div>
            <div className="absolute top-20 right-10 text-3xl animate-fall-2 drop-shadow-md">🎉</div>
        </div>
    );
}