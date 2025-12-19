'use client';

import { useState, useEffect } from 'react';
import { Monster, Skill } from "../data";

interface Props {
    monster: Monster;
    onSkillAttack: (skill: Skill) => void;
    onRetreat: () => void;
    // 🆕 취소 함수 추가
    onCancel: () => void;
    playSfx: (type: 'attack' | 'click') => void;
}

export default function Battle({ monster, onSkillAttack, onRetreat, onCancel, playSfx }: Props) {
    const [videoSrc, setVideoSrc] = useState('');
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const videoList = ['/video/lobby1.mp4', '/video/lobby2.mp4', '/video/lobby3.mp4', '/video/lobby4.mp4'];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    const handleStartBattle = () => {
        playSfx('click');
        setShowIntro(false);
    };

    return (
        <div className="absolute inset-0 h-full w-full bg-black z-50">
            {/* 배경 레이어 */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {videoSrc && (
                    <video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[50%] opacity-80">
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                <div className="absolute inset-0 bg-red-900/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)"></div>
            </div>

            {/* 1. 영적 실체 드러내기 (Intro Overlay) */}
            {showIntro ? (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 animate-fade-in text-center">

                    {/* 🆕 닫기(취소) 버튼: 우측 상단 */}
                    <button
                        onClick={onCancel}
                        className="absolute top-6 right-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[60]"
                    >
                        <span className="text-2xl font-bold">✕</span>
                    </button>

                    <div className="bg-black/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-red-500/30 shadow-2xl max-w-sm w-full relative">
                        <p className="text-red-400 font-black tracking-widest text-xs mb-4 animate-pulse">
                            🚨 SPIRITUAL ALERT
                        </p>

                        <h3 className="text-white text-lg font-bold mb-2">당신을 괴롭히는 것의<br />진짜 정체는...</h3>

                        <div className="my-6 transform hover:scale-110 transition-transform duration-300">
                            <div className="text-7xl mb-2 filter drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                                {monster.emoji}
                            </div>
                            <h2 className={`text-2xl font-black ${monster.color} drop-shadow-md`}>
                                {monster.name}
                            </h2>
                        </div>

                        <div className="bg-red-950/50 p-4 rounded-xl border border-red-500/20 mb-8">
                            <p className="text-red-200 text-xs font-bold mb-1">[마귀의 속삭임]</p>
                            <p className="text-white/90 text-sm font-medium leading-relaxed break-keep">
                                "{monster.scheme}"
                            </p>
                        </div>

                        {/* 선택의 갈림길 */}
                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={handleStartBattle}
                                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-900/50 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span>⚔️ 말씀으로 대적하기</span>
                            </button>

                            <button
                                onClick={onRetreat}
                                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white/70 rounded-xl font-bold text-sm border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span>🏃 전략적 후퇴 (도망가기)</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* 2. 메인 전투 화면 */
                <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar animate-bounce-in">
                    <div className="w-full min-h-full flex flex-col p-6 pb-20">
                        <div className="flex-shrink-0 flex flex-col items-center justify-center pt-12 mb-4">
                            <div className="bg-red-600 px-4 py-1 rounded-full text-xs font-bold text-white mb-6 shadow-lg">
                                ⚠️ BATTLE START
                            </div>
                            <div className="text-[9rem] filter drop-shadow-2xl animate-pulse cursor-pointer transform" onClick={() => playSfx('attack')}>
                                {monster.emoji}
                            </div>
                            <h2 className="text-3xl font-black text-white mt-8 mb-2 drop-shadow-lg stroke-black">
                                {monster.name}
                            </h2>
                        </div>

                        {/* 스킬 목록 영역 */}
                        <div className="w-full pb-4 flex-shrink-0">
                            <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                                <p className="text-center text-white/80 text-xs font-bold mb-4">
                                    ▼ 선포할 말씀을 선택하세요!
                                </p>
                                <div className="space-y-3">
                                    {monster.skills.map((skill, index) => (
                                        <button
                                            key={index}
                                            onClick={() => onSkillAttack(skill)}
                                            className="w-full bg-white/90 hover:bg-white border-b-4 border-slate-200 hover:border-blue-500 p-4 rounded-2xl shadow-lg active:scale-95 text-left group transition-all"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl">🗡️</span>
                                                <span className="font-bold text-slate-900 group-hover:text-blue-700">
                                                    {skill.name}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-700 font-medium leading-relaxed break-keep mb-2">
                                                "{skill.verse}"
                                            </p>
                                            <div className="text-xs text-slate-500 font-bold bg-slate-100 inline-block px-2 py-1 rounded">
                                                {skill.ref}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-10 w-full flex-shrink-0"></div>
                    </div>
                </div>
            )}
        </div>
    );
}