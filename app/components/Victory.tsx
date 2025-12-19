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
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const videoList = [
            '/video/victory1.mp4'
        ];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        <div className="absolute inset-0 z-[100] w-full h-full bg-black animate-fade-in">

            {/* [Layer 1] 배경 (고정) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {videoSrc && (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                <div className={`absolute inset-0 bg-yellow-100/40 backdrop-blur-[2px] transition-opacity duration-1000 ${showLight ? 'opacity-100' : 'opacity-0'}`} />
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0,white_20deg,transparent_40deg)] animate-spin-slow opacity-60 mix-blend-overlay" />
                <div className="absolute top-10 left-10 text-4xl animate-fall-1 drop-shadow-md">✨</div>
                <div className="absolute top-20 right-10 text-3xl animate-fall-2 drop-shadow-md">🎉</div>
            </div>

            {/* [Layer 2] 스크롤 영역 */}
            <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar">

                {/* [핵심 수정] 
                    1. justify-center 삭제: 좁은 화면에서 위아래가 잘리는 주범입니다. 삭제하면 위에서부터 차례대로 나옵니다.
                    2. py-12: 위아래 여백을 적당히 줘서 답답하지 않게 합니다.
                */}
                <div className="w-full min-h-full flex flex-col items-center py-12 px-6">

                    <div className="text-6xl mb-4 animate-bounce filter drop-shadow-xl flex-shrink-0">👼</div>

                    <h2 className="text-4xl font-black text-yellow-600 mb-2 tracking-tight drop-shadow-sm stroke-white text-center flex-shrink-0">
                        VICTORY!
                    </h2>

                    {selectedSkill && (
                        <div className="mb-6 bg-blue-600/90 text-white px-4 py-1.5 rounded-full text-xs font-bold border border-blue-400 shadow-lg animate-pulse text-center flex-shrink-0">
                            🗡️ {selectedSkill.name}으로 승리!
                        </div>
                    )}

                    {/* 카드 영역 */}
                    <div className="w-full max-w-sm bg-white/20 backdrop-blur p-6 rounded-[1rem] shadow-2xl border-2 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300 flex-shrink-0 mb-8">
                        <div className="text-2xl mb-3 text-center">💌</div>
                        <p className="text-base font-medium text-slate-800 leading-relaxed text-center break-keep drop-shadow-sm">
                            "{godMsg}"
                        </p>
                        <div className="mt-4 border-t border-slate-200/50 pt-3 text-center flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-500">FROM. HEAVEN</span>
                            <span className="text-xs font-bold text-yellow-700 bg-yellow-200/80 px-2 py-0.5 rounded-lg shadow-sm">
                                +POINT!
                            </span>
                        </div>
                    </div>

                    {/* 버튼 영역 (이제 아래에 확실히 보입니다) */}
                    <div className="pb-8 flex-shrink-0">
                        <button
                            onClick={onReset}
                            className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold shadow-xl shadow-slate-900/30 active:scale-95 transition-all flex items-center gap-2 hover:bg-slate-800"
                        >
                            <span>기쁨으로 복귀</span>
                            <span className="bg-slate-700 text-[10px] px-2 py-0.5 rounded-full">Enter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}