'use client';

import { useState, useEffect } from 'react';
import { UserProfile, UNLOCKABLE_ITEMS } from "../data";

interface Props {
    userProfile: UserProfile;
    onClose: () => void;
    onReset: () => void;
    onOpenStats: () => void;
}

export default function Profile({ userProfile, onClose, onReset, onOpenStats }: Props) {
    // 🆕 배경 비디오 상태 추가
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const videoList = ['/video/lobby1.mp4', '/video/lobby2.mp4', '/video/lobby3.mp4', '/video/lobby4.mp4'];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(userProfile.logs.length / ITEMS_PER_PAGE);
    const currentLogs = userProfile.logs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleResetClick = () => {
        if (confirm("정말로 모든 데이터를 삭제하고 처음으로 돌아가시겠습니까?\n(삭제된 데이터는 복구할 수 없습니다.)")) {
            onReset();
        }
    };

    return (
        // [구조 변경] 최상위 div는 스크롤을 없애고 화면을 꽉 채움
        <div className="absolute inset-0 z-50 bg-black animate-slide-up">

            {/* 🆕 1. 배경 비디오 레이어 (고정) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {videoSrc && (
                    <video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[20%] opacity-50">
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 가독성을 위한 밝은 오버레이 */}
                <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-sm"></div>
            </div>

            {/* 🆕 2. 실제 콘텐츠 레이어 (스크롤 가능) */}
            <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar">

                {/* 상단 닫기 버튼 */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-200 z-20">
                    <h2 className="text-lg font-black text-slate-800">WARRIOR RECORD</h2>
                    <button onClick={onClose} className="bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200">
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-8 pb-20">
                    {/* 1. 기본 정보 카드 */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">🛡️</div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold mb-1">{userProfile.mbti} 용사</p>
                                <h3 className="text-2xl font-black text-slate-900">{userProfile.name}</h3>
                                <p className="text-sm text-slate-600">{userProfile.location} 거주 • {userProfile.age}세</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-slate-50/80 p-3 rounded-2xl">
                                <span className="block text-xs text-slate-400 font-bold">취약 시간</span>
                                <span className="font-bold text-slate-700">{userProfile.weakTime}</span>
                            </div>
                            <div className="bg-slate-50/80 p-3 rounded-2xl">
                                <span className="block text-xs text-slate-400 font-bold">좋아하는 음식</span>
                                <span className="font-bold text-slate-700">{userProfile.food}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. 보유 아이템 */}
                    <div>
                        <h3 className="text-slate-800 text-white font-bold mb-4 px-2 drop-shadow-sm">획득한 전신갑주 (Inventory)</h3>
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                            {userProfile.inventory.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {userProfile.inventory.map(itemId => {
                                        const item = UNLOCKABLE_ITEMS.find(i => i.id === itemId);
                                        if (!item) return null;
                                        return (
                                            <div key={itemId} className="flex items-center gap-4 bg-yellow-50/50 p-3 rounded-2xl border border-yellow-100">
                                                <span className="text-3xl bg-white p-2 rounded-xl shadow-sm">{item.emoji}</span>
                                                <div>
                                                    <p className="font-bold text-slate-800">{item.name}</p>
                                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-400 text-sm">
                                    <p>아직 획득한 장비가 없습니다.</p>
                                    <p className="text-xs mt-1">전투에서 승리하여 포인트를 쌓으세요!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. 전투 기록 & 통계 버튼 */}
                    <div>
                        <div className="flex justify-between items-end mb-4 px-2">
                            <h3 className="text-slate-800 font-bold text-white drop-shadow-sm">전투 기록 (Battle Logs)</h3>
                            <button
                                onClick={onOpenStats}
                                className="text-xs font-bold bg-slate-800 text-white px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-md flex items-center gap-1"
                            >
                                <span>📊</span> 통계 분석실
                            </button>
                        </div>

                        <div className="space-y-3 animate-fade-in">
                            {userProfile.logs.length === 0 && (
                                <p className="text-center text-slate-500 text-sm py-10 font-bold">기록된 전투가 없습니다.</p>
                            )}

                            {currentLogs.map((log) => (
                                <div key={log.id} className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{log.monsterEmoji}</span>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{log.monsterName}</p>
                                            <p className="text-xs text-slate-400">{log.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {log.result === 'WIN' ? (
                                            <>
                                                <span className="text-blue-600 font-black text-sm">WIN</span>
                                                <p className="text-[10px] text-blue-400 font-medium">{log.skillName}</p>
                                            </>
                                        ) : (
                                            <span className="text-slate-400 font-bold text-sm">RUN</span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* 페이징 컨트롤 */}
                            {userProfile.logs.length > 0 && (
                                <div className="flex justify-center items-center gap-4 pt-4">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-lg bg-white/50 hover:bg-white text-black font-bold border border-slate-200"
                                    >
                                        &lt; 이전
                                    </button>
                                    <span className="text-xs font-bold text-slate-500">
                                        {currentPage} / {totalPages === 0 ? 1 : totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="px-3 py-1 rounded-lg bg-white/50 hover:bg-white text-black font-bold border border-slate-200"
                                    >
                                        다음 &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. 초기화 버튼 */}
                    <div className="pt-8 border-t border-slate-200/50">
                        <button
                            onClick={handleResetClick}
                            className="w-full py-4 rounded-2xl bg-red-50/80 text-red-500 font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                        >
                            <span>🚫 모든 데이터 초기화</span>
                        </button>
                        <p className="text-center text-white text-[10px] text-slate-500 mt-2">
                            초기화 시 모든 기록과 아이템이 영구적으로 삭제됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}