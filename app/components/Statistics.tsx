'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from "../data";
import { useStats } from "../../hooks/useStats"; // 훅 import 확인
import TabTime from "./stats/TabTime";       // 컴포넌트 import 확인
import TabTopic from "./stats/TabTopic";     // 컴포넌트 import 확인

interface Props {
    userProfile: UserProfile;
    onClose: () => void;
}

export default function Statistics({ userProfile, onClose }: Props) {
    const [videoSrc, setVideoSrc] = useState('');
    const [activeTab, setActiveTab] = useState<'TIME' | 'TOPIC'>('TIME');

    // 모든 데이터 로직은 Hook으로 위임
    const statsData = useStats(userProfile.logs);

    useEffect(() => {
        const videoList = ['/video/lobby1.mp4', '/video/lobby2.mp4', '/video/lobby3.mp4', '/video/lobby4.mp4'];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        <div className="absolute inset-0 z-[60] bg-black animate-slide-up">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {videoSrc && <video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[20%] opacity-50"><source src={videoSrc} type="video/mp4" /></video>}
                <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-sm"></div>
            </div>

            <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar">
                <div className="sticky top-0 bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-200 z-20">
                    <h2 className="text-lg font-black text-slate-800">BATTLE STATISTICS</h2>
                    <button onClick={onClose} className="bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200">✕</button>
                </div>

                <div className="p-6 space-y-6 pb-20">
                    {/* 요약 카드 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm text-center">
                            <p className="text-xs text-slate-400 font-bold mb-1">총 전투 횟수</p>
                            <p className="text-3xl font-black text-slate-800">{statsData.totalBattles}</p>
                        </div>
                        <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm text-center">
                            <p className="text-xs text-slate-400 font-bold mb-1">전체 승률</p>
                            <p className={`text-3xl font-black ${statsData.winRate >= 80 ? 'text-blue-600' : 'text-slate-800'}`}>{statsData.winRate}%</p>
                        </div>
                    </div>

                    {/* 탭 메뉴 */}
                    <div className="flex bg-slate-200 p-1 rounded-2xl">
                        <button onClick={() => setActiveTab('TIME')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'TIME' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>📈 시기별 추이</button>
                        <button onClick={() => setActiveTab('TOPIC')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'TOPIC' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>👿 고난 주제별 분석</button>
                    </div>

                    {/* 하위 컴포넌트 렌더링 */}
                    {activeTab === 'TIME' ? <TabTime data={statsData} /> : <TabTopic data={statsData} />}

                </div>
            </div>
        </div>
    );
}