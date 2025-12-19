'use client';

import { useState, useEffect } from 'react';
import { UserProfile, SITUATIONS, UNLOCKABLE_ITEMS } from "../data";

interface Props {
    userProfile: UserProfile;
    onEncounter: (key: string) => void;
    onOpenProfile: () => void;
}

export default function Lobby({ userProfile, onEncounter, onOpenProfile }: Props) {
    const [videoSrc, setVideoSrc] = useState('');
    const [isCrisisTime, setIsCrisisTime] = useState(false);
    const [greetingMsg, setGreetingMsg] = useState('');

    useEffect(() => {
        const videoList = ['/video/lobby1.mp4', '/video/lobby2.mp4', '/video/lobby3.mp4', '/video/lobby4.mp4'];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();
        const weakTime = userProfile.weakTime || '';

        let isDanger = false;
        let msg = `평안한 하루 되세요, ${userProfile.name} 용사님!`;

        if (weakTime.includes('출근')) {
            if (hour >= 7 && hour <= 9) {
                isDanger = true;
                msg = "🚨 출근길 인파 속입니다! 짜증 몬스터를 경계하세요!";
            } else {
                msg = "내일 출근길을 위해 미리 기도로 무장하세요.";
            }
        }
        else if (weakTime.includes('식후')) {
            if (hour >= 13 && hour <= 15) {
                isDanger = true;
                msg = "🚨 나른한 식곤증 시간! 게으름 곰이 노리고 있어요!";
            } else {
                msg = "점심 먹고 졸릴 때가 가장 위험한 거 아시죠?";
            }
        }
        else if (weakTime.includes('밤')) {
            if (hour >= 21 || hour <= 2) {
                isDanger = true;
                msg = "🚨 밤이 깊었습니다. 센치해진 감성을 틈탄 공격 주의!";
            } else {
                msg = "오늘 밤은 평안하게 잠들 수 있기를 바랍니다.";
            }
        }

        setIsCrisisTime(isDanger);
        setGreetingMsg(msg);
    }, [userProfile]);

    return (
        <div className="w-full min-h-full relative animate-fade-in">

            <div className="sticky top-0 w-full h-[850px] z-0 overflow-hidden">
                {videoSrc && (
                    <video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[20%] opacity-80">
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
                {isCrisisTime && <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>}
            </div>

            <div className="absolute inset-0 z-10 p-6 pb-24 overflow-y-auto no-scrollbar">

                {/* 프로필 버튼 (이것만 남김) */}
                <button onClick={onOpenProfile} className="w-full mb-6 bg-white/80 p-4 rounded-3xl border border-white/50 text-left backdrop-blur-md shadow-sm hover:bg-white transition-all active:scale-95 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl bg-blue-50 p-2 rounded-2xl">🛡️</span>
                        <div>
                            <p className="text-xs text-slate-500 font-bold">WARRIOR RECORD</p>
                            <p className="text-slate-800 font-bold group-hover:text-blue-600 transition-colors">내 전투 기록 보기 &gt;</p>
                        </div>
                    </div>
                </button>

                {/* 상태 메시지 카드 */}
                <div className={`mb-6 p-6 rounded-3xl border text-center backdrop-blur-md shadow-sm transition-all ${isCrisisTime ? 'bg-red-50/90 border-red-200' : 'bg-white/70 border-white/40'}`}>
                    <p className={`text-xs font-bold mb-3 ${isCrisisTime ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                        {isCrisisTime ? '⚠️ CRISIS ALERT (경계 태세)' : 'CURRENT STATUS'}
                    </p>

                    <h3 className={`text-lg font-black leading-snug break-keep ${isCrisisTime ? 'text-red-700' : 'text-slate-800'}`}>
                        "{greetingMsg}"
                    </h3>

                    {/* 아이템 미리보기 */}
                    <div className="mt-4 flex justify-center gap-2 items-center">
                        <div className="flex gap-1">
                            {userProfile.inventory.map(itemId => {
                                const item = UNLOCKABLE_ITEMS.find(i => i.id === itemId);
                                return item ? <span key={itemId} className="text-2xl drop-shadow-sm" title={item.name}>{item.emoji}</span> : null;
                            })}
                            {userProfile.inventory.length === 0 && <span className="text-xs text-slate-400">장비 없음</span>}
                        </div>
                    </div>
                </div>

                {/* 몬스터 선택 */}
                <p className="text-slate-700 font-bold text-lg mb-4 ml-2 drop-shadow-sm">
                    지금 겪고 있는 마음의 전쟁은?
                </p>
                <div className="grid grid-cols-1 gap-3 pb-8"> {/* 1단 리스트로 변경하여 텍스트 가독성 확보 */}
                    {SITUATIONS.map((situation) => (
                        <button
                            key={situation.id}
                            onClick={() => onEncounter(situation.monsterKey)}
                            className="w-full bg-white/80 hover:bg-white backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm text-left transition-all active:scale-95 group"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-slate-800 font-bold text-sm leading-relaxed group-hover:text-blue-700">
                                    {situation.label}
                                </span>
                                <span className="text-slate-400 text-xs">선택 &gt;</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}