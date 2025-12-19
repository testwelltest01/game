'use client';

import { useState, useEffect } from 'react';
import { Monster, Skill } from "../data";

interface Props {
    monster: Monster;
    onSkillAttack: (skill: Skill) => void;
    onRetreat: () => void;
    playSfx: (type: 'attack' | 'click') => void;
}

export default function Battle({ monster, onSkillAttack, onRetreat, playSfx }: Props) {
    // 🆕 배경 비디오 상태
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        // 로비와 같은 영상을 쓰지만, 분위기는 다르게 연출할 예정
        const videoList = [
            '/video/lobby1.mp4',
            '/video/lobby2.mp4',
            '/video/lobby3.mp4',
            '/video/lobby4.mp4'
        ];
        // 랜덤 선택
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        <div className="h-full relative animate-bounce-in z-50 overflow-hidden">

            {/* 🆕 1. 배경 비디오 레이어 */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {videoSrc && (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover grayscale-[50%] opacity-80" // 채도를 낮춰서 몬스터 집중
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 🆕 2. 전투 분위기 오버레이 (붉은색 필터) */}
                {/* 몬스터 고유 컬러(monster.bg) 대신 비디오 위에 붉은 막을 씌움 */}
                <div className="absolute inset-0 bg-red-900/30 backdrop-blur-[2px]"></div>

                {/* 🆕 3. 몬스터 등장 효과 (중앙 집중형 그라디언트) */}
                <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)"></div>
            </div>

            {/* --- 실제 콘텐츠 (z-10) --- */}
            <div className="relative z-10 h-full flex flex-col p-6">

                <div className="flex-shrink-0 flex flex-col items-center justify-center pt-12 mb-4">
                    <div className="bg-red-600 px-4 py-1 rounded-full text-xs font-bold text-white mb-6 shadow-lg animate-pulse">
                        ⚠️ WARNING: ENEMY APPEARED
                    </div>

                    {/* 몬스터 이모지 (크게) */}
                    <div
                        className="text-[9rem] filter drop-shadow-2xl animate-pulse cursor-pointer transform hover:scale-110 transition-transform duration-100"
                        onClick={() => playSfx('attack')}
                    >
                        {monster.emoji}
                    </div>

                    <h2 className="text-3xl font-black text-white mt-8 mb-2 drop-shadow-lg stroke-black">
                        {monster.name}
                    </h2>
                </div>

                {/* 말씀 스킬 선택 영역 */}
                <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">
                    <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                        <p className="text-center text-white/80 text-xs font-bold mb-4">
                            ▼ 사용할 말씀의 검을 선택하세요
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

                <div className="mt-auto pt-4">
                    <button
                        onClick={onRetreat}
                        className="w-full py-4 bg-black/50 text-white/70 rounded-2xl font-bold text-sm hover:bg-black/70 active:scale-95 transition-all border border-white/10 backdrop-blur-sm"
                    >
                        🏳️ 전략적 후퇴 (도망가기)
                    </button>
                </div>
            </div>
        </div>
    );
}