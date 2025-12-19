'use client';

import { useState, useEffect } from 'react';
import { UserProfile, MonsterKey, MONSTERS, SHOP_ITEMS } from "../data";

interface Props {
    userProfile: UserProfile;
    onEncounter: (key: string) => void;
    onOpenShop: () => void;
    onOpenProfile: () => void;
    onReset: () => void;
}

export default function Lobby({ userProfile, onEncounter, onOpenShop, onOpenProfile, onReset }: Props) {
    const [videoSrc, setVideoSrc] = useState('');

    // 🆕 위기 경보 상태 관리
    const [isCrisisTime, setIsCrisisTime] = useState(false);
    const [greetingMsg, setGreetingMsg] = useState('');

    // 1. 랜덤 비디오 설정
    useEffect(() => {
        const videoList = ['/video/lobby1.mp4', '/video/lobby2.mp4', '/video/lobby3.mp4', '/video/lobby4.mp4'];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    // 2. 🆕 시간 체크 및 멘트 설정 로직
    useEffect(() => {
        const now = new Date();
        const hour = now.getHours(); // 0 ~ 23

        // 사용자가 설정한 '약한 시간' 가져오기 (예: '🌞 출근', '🌙 밤')
        const weakTime = userProfile.weakTime || '';

        let isDanger = false;
        let msg = `평안한 하루 되세요, ${userProfile.name} 용사님!`; // 기본 멘트

        // 시간대별 로직 (단순화)
        if (weakTime.includes('출근')) {
            if (hour >= 7 && hour <= 9) { // 아침 7~9시
                isDanger = true;
                msg = "🚨 출근길 인파 속입니다! 짜증 몬스터를 경계하세요!";
            } else {
                msg = "내일 출근길을 위해 미리 기도로 무장하세요.";
            }
        }
        else if (weakTime.includes('식후')) {
            if (hour >= 13 && hour <= 15) { // 오후 1~3시
                isDanger = true;
                msg = "🚨 나른한 식곤증 시간! 게으름 곰이 노리고 있어요!";
            } else {
                msg = "점심 먹고 졸릴 때가 가장 위험한 거 아시죠?";
            }
        }
        else if (weakTime.includes('밤')) {
            if (hour >= 21 || hour <= 2) { // 밤 9시 ~ 새벽 2시
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

            {/* 배경 비디오 */}
            <div className="sticky top-0 w-full h-[850px] z-0 overflow-hidden">
                {videoSrc && (
                    <video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[20%] opacity-80">
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>

                {/* 🆕 위기 시간일 때 붉은 기운 추가 */}
                {isCrisisTime && <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>}
            </div>

            <div className="absolute inset-0 z-10 p-6 pb-24 overflow-y-auto no-scrollbar">

                {/* 프로필 버튼 */}
                <button onClick={onOpenProfile} className="w-full mb-6 bg-white/80 p-4 rounded-3xl border border-white/50 text-left backdrop-blur-md shadow-sm hover:bg-white transition-all active:scale-95 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl bg-blue-50 p-2 rounded-2xl">🛡️</span>
                        <div>
                            <p className="text-xs text-slate-500 font-bold">WARRIOR RECORD</p>
                            <p className="text-slate-800 font-bold group-hover:text-blue-600 transition-colors">내 전투 기록 보기 &gt;</p>
                        </div>
                    </div>
                </button>

                {/* 🆕 상태 메시지 카드 (위기 시 디자인 변경) */}
                <div className={`mb-6 p-6 rounded-3xl border text-center backdrop-blur-md shadow-sm transition-all ${isCrisisTime ? 'bg-red-50/90 border-red-200' : 'bg-white/70 border-white/40'}`}>
                    <p className={`text-xs font-bold mb-3 ${isCrisisTime ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                        {isCrisisTime ? '⚠️ CRISIS ALERT (경계 태세)' : 'CURRENT STATUS'}
                    </p>

                    <h3 className={`text-lg font-black leading-snug break-keep ${isCrisisTime ? 'text-red-700' : 'text-slate-800'}`}>
                        "{greetingMsg}"
                    </h3>

                    <div className="mt-4 flex justify-center gap-2 items-center">
                        {/* 장비 아이콘들 */}
                        <div className="flex gap-1">
                            {userProfile.inventory.map(itemId => {
                                const item = SHOP_ITEMS.find(i => i.id === itemId);
                                return item ? <span key={itemId} className="text-2xl drop-shadow-sm">{item.emoji}</span> : null;
                            })}
                            {userProfile.inventory.length === 0 && <span className="text-xs text-slate-400">장비 없음</span>}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button onClick={onOpenShop} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all flex items-center gap-2">
                            <span>🛍️ 하늘 상점</span>
                        </button>
                    </div>
                </div>

                {/* 몬스터 선택 */}
                <p className="text-slate-700 font-bold text-lg mb-4 ml-2 drop-shadow-sm">전투 지역 선택</p>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(MONSTERS).map((key) => {
                        const m = MONSTERS[key as MonsterKey];
                        return (
                            <button key={key} onClick={() => onEncounter(key)} className={`aspect-square rounded-3xl p-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-90 shadow-sm border border-white/50 backdrop-blur-md bg-white/80 hover:bg-white`}>
                                <span className="text-5xl filter drop-shadow-sm">{m.emoji}</span>
                                <span className={`text-sm font-bold ${m.color}`}>{m.name}</span>
                                <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">+{m.reward} P</span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onReset} className="text-xs text-slate-600 underline p-4 rounded-full hover:bg-white/50 transition-colors">초기화 (Reset)</button>
                </div>
            </div>
        </div>
    );
}