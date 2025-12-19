'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from "../data";

interface Props {
    userProfile: UserProfile;
    onClose: () => void;
}

export default function Profile({ userProfile, onClose }: Props) {
    // 🆕 배경 비디오 상태
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const videoList = [
            '/video/lobby1.mp4',
            '/video/lobby2.mp4',
            '/video/lobby3.mp4',
            '/video/lobby4.mp4'
        ];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        <div className="w-full h-full relative animate-fade-in">

            {/* 1. 배경 비디오 레이어 */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {videoSrc && (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover grayscale-[20%] opacity-80"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 검은 글씨가 잘 보이도록 흰색 막을 씌움 */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"></div>
            </div>

            {/* 2. 콘텐츠 레이어 */}
            <div className="absolute inset-0 z-10 p-6 pb-24 flex flex-col h-full">

                {/* 헤더 */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <h2 className="text-2xl font-black text-slate-800 drop-shadow-sm">용사 활동 기록 📜</h2>
                    <button
                        onClick={onClose}
                        className="bg-white/80 hover:bg-white p-2 px-4 rounded-full text-sm font-bold shadow-sm border border-slate-200 transition-colors"
                    >
                        ✖️ 닫기
                    </button>
                </div>

                {/* 프로필 요약 카드 */}
                <div className="bg-white/80 p-6 rounded-3xl mb-6 backdrop-blur-md shadow-sm border border-white/50 text-center shrink-0">
                    <div className="text-4xl mb-2 grayscale opacity-90">🛡️</div>
                    <h3 className="text-xl font-bold text-slate-800">{userProfile.name} 용사님</h3>
                    <p className="text-slate-500 text-sm mb-4 font-medium">{userProfile.location} 수호 중</p>

                    <div className="flex justify-center gap-4 text-sm font-bold">
                        <div className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
                            승리 {userProfile.logs.filter(l => l.result === 'WIN').length}회
                        </div>
                        <div className="bg-slate-200/80 text-slate-600 px-3 py-1 rounded-lg border border-slate-300">
                            후퇴 {userProfile.logs.filter(l => l.result === 'RUN').length}회
                        </div>
                    </div>
                </div>

                {/* 기록 리스트 */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-4 space-y-3">
                    {userProfile.logs.length === 0 ? (
                        <div className="text-center text-slate-500 py-10 bg-white/50 rounded-3xl border border-white/40 backdrop-blur-sm">
                            <p className="font-bold">아직 기록된 전투가 없습니다.</p>
                            <p className="text-xs mt-2">몬스터와 싸워보세요!</p>
                        </div>
                    ) : (
                        userProfile.logs.map((log) => (
                            <div
                                key={log.id}
                                className={`p-4 rounded-2xl border flex items-center gap-3 shadow-sm backdrop-blur-md transition-all ${log.result === 'WIN'
                                    ? 'bg-white/90 border-blue-100 hover:border-blue-300'
                                    : 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <div className="text-3xl bg-slate-100 p-2 rounded-xl h-12 w-12 flex items-center justify-center shadow-inner">
                                    {log.monsterEmoji}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-800">{log.monsterName}</span>
                                        <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">{log.timestamp}</span>
                                    </div>
                                    {log.result === 'WIN' ? (
                                        <p className="text-xs text-blue-600 font-medium">
                                            ⚔️ <span className="font-bold">{log.skillName}</span>(으)로 승리!
                                        </p>
                                    ) : (
                                        <p className="text-xs text-slate-500 font-medium">🏳️ 전략적 후퇴함</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}