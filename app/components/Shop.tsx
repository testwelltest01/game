'use client';

import { useState, useEffect } from 'react';
import { Item, SHOP_ITEMS } from "../data";

interface Props {
    userPoints: number;
    inventory: string[];
    onBuy: (item: Item) => void;
    onClose: () => void;
}

export default function Shop({ userPoints, inventory, onBuy, onClose }: Props) {
    // 🆕 배경 비디오 상태 관리
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        // 로비와 동일한 비디오 리스트 사용 (통일감)
        const videoList = [
            '/video/lobby1.mp4',
            '/video/lobby2.mp4',
            '/video/lobby3.mp4',
            '/video/lobby4.mp4'
        ];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        // 전체 컨테이너: relative로 기준점 잡기
        <div className="w-full h-full relative animate-fade-in">

            {/* 1. 배경 비디오 레이어 (z-0) */}
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
                {/* 상점은 물건을 봐야 하니까 로비보다 조금 더 진한 배경막(흰색)을 씌움 */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"></div>
            </div>

            {/* 2. 실제 콘텐츠 레이어 (z-10) */}
            <div className="absolute inset-0 z-10 p-6 pb-24 flex flex-col h-full">

                {/* 상점 헤더 */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black text-slate-800 drop-shadow-sm">하늘 상점 ☁️</h2>
                        <span className="text-xs text-slate-600 font-bold">보유 포인트: {userPoints.toLocaleString()} P</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/80 hover:bg-white p-2 px-4 rounded-full text-sm font-bold shadow-sm border border-slate-200 transition-colors"
                    >
                        ✖️ 닫기
                    </button>
                </div>

                {/* 상인 멘트 */}
                <div className="bg-white/70 p-4 rounded-2xl mb-6 backdrop-blur-md shadow-sm border border-white/50 shrink-0">
                    <p className="text-sm text-slate-700 font-bold text-center">
                        "성령의 전신갑주를 입고 승리하십시오!" 🛡️
                    </p>
                </div>

                {/* 아이템 목록 (스크롤 가능 영역) */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-3">
                    {SHOP_ITEMS.map((item) => {
                        const isOwned = inventory.includes(item.id);
                        const canBuy = userPoints >= item.price;

                        return (
                            <div
                                key={item.id}
                                className={`p-4 rounded-2xl flex items-center justify-between border shadow-sm transition-all ${isOwned
                                        ? 'bg-slate-100/90 border-slate-200 opacity-80' // 보유중
                                        : 'bg-white/90 border-white/60 hover:border-blue-300 hover:shadow-md' // 미보유
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        {item.emoji}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{item.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>

                                {isOwned ? (
                                    <span className="text-xs font-bold bg-slate-200 text-slate-500 px-3 py-1.5 rounded-lg">
                                        보유중
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => onBuy(item)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex flex-col items-center min-w-[70px] ${canBuy
                                                ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white hover:from-yellow-300 hover:to-amber-400'
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <span>구매</span>
                                        <span className="text-[10px] opacity-90 font-normal">{item.price} P</span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}