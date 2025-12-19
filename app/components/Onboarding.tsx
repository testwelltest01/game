'use client';

import { useState, useEffect } from 'react';
import { UserProfile, MBTI_TITLES } from "../data";

interface Props {
    userProfile: UserProfile;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSetWeakTime: (time: string) => void;
    onSave: () => void;
}

export default function Onboarding({ userProfile, onChange, onSetWeakTime, onSave }: Props) {
    // 🆕 배경 비디오 상태 관리
    const [videoSrc, setVideoSrc] = useState('');
    const mbtiList = Object.keys(MBTI_TITLES);

    useEffect(() => {
        // 로비와 동일한 비디오 리스트 사용
        const videoList = [
            '/video/lobby1.mp4',
            '/video/lobby2.mp4',
            '/video/lobby3.mp4',
            '/video/lobby4.mp4'
        ];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        // 전체 컨테이너
        <div className="w-full h-full relative animate-fade-in">

            {/* 🆕 1. 배경 비디오 레이어 (z-0) */}
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
                {/* 입력폼이 잘 보이도록 흰색 반투명 막 적용 */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"></div>
            </div>

            {/* 2. 실제 콘텐츠 레이어 (z-10) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 pb-10 overflow-y-auto no-scrollbar">

                {/* 헤더 */}
                <div className="text-center mb-6 bg-white/70 p-4 rounded-3xl backdrop-blur-md shadow-sm border border-white/50 shrink-0">
                    <div className="text-6xl mb-2 animate-bounce drop-shadow-sm">📜</div>
                    <h1 className="text-2xl font-black text-amber-900 mb-1">용사의 서약</h1>
                    <p className="text-amber-800/80 text-xs font-medium">당신의 성향에 맞는 무기를 준비해드릴게요.</p>
                </div>

                {/* 입력 폼 영역 */}
                <div className="space-y-3 bg-white/70 p-5 rounded-[2rem] backdrop-blur-md shadow-lg border border-white/40 overflow-y-auto max-h-[60vh]">

                    {/* 이름 & 나이 */}
                    <div className="flex gap-2">
                        <div className="flex-[2] bg-white/60 p-1 rounded-2xl border border-amber-200/50 shadow-sm focus-within:bg-white transition-colors">
                            <input name="name" value={userProfile.name} onChange={onChange} placeholder="이름" className="w-full px-3 py-2 bg-transparent outline-none text-amber-900 placeholder-amber-900/40 font-bold text-center text-sm" />
                        </div>
                        <div className="flex-[1] bg-white/60 p-1 rounded-2xl border border-amber-200/50 shadow-sm focus-within:bg-white transition-colors">
                            <input name="age" type="number" value={userProfile.age} onChange={onChange} placeholder="나이" className="w-full px-3 py-2 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm text-center" />
                        </div>
                    </div>

                    {/* 성별 & 결혼 */}
                    <div className="grid grid-cols-2 gap-2">
                        <select name="gender" value={userProfile.gender} onChange={onChange} className="w-full px-3 py-2 bg-white/60 rounded-2xl border border-amber-200/50 text-slate-700 text-sm outline-none shadow-sm focus:bg-white transition-colors">
                            <option value="">성별 선택</option>
                            <option value="남">남성</option>
                            <option value="여">여성</option>
                        </select>
                        <select name="isMarried" value={userProfile.isMarried} onChange={onChange} className="w-full px-3 py-2 bg-white/60 rounded-2xl border border-amber-200/50 text-slate-700 text-sm outline-none shadow-sm focus:bg-white transition-colors">
                            <option value="">결혼 여부</option>
                            <option value="미혼">미혼 (싱글)</option>
                            <option value="기혼">기혼 (부부)</option>
                        </select>
                    </div>

                    {/* MBTI 선택 */}
                    <div className="bg-white/60 p-1 rounded-2xl border border-amber-200/50 shadow-sm focus-within:bg-white transition-colors">
                        <select name="mbti" value={userProfile.mbti} onChange={onChange} className="w-full px-3 py-2 bg-transparent outline-none text-slate-700 text-sm font-bold text-center">
                            <option value="">MBTI를 선택해주세요</option>
                            {mbtiList.map(type => (
                                <option key={type} value={type}>{type} ({MBTI_TITLES[type]})</option>
                            ))}
                        </select>
                    </div>

                    {/* 사는 곳 & 음식 */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/60 p-1 rounded-2xl border border-amber-200/50 shadow-sm focus-within:bg-white transition-colors">
                            <input name="location" value={userProfile.location} onChange={onChange} placeholder="사는 곳" className="w-full px-3 py-2 bg-transparent outline-none text-slate-700 placeholder-slate-500/50 text-sm text-center" />
                        </div>
                        <div className="bg-white/60 p-1 rounded-2xl border border-amber-200/50 shadow-sm focus-within:bg-white transition-colors">
                            <input name="food" value={userProfile.food} onChange={onChange} placeholder="소울푸드" className="w-full px-3 py-2 bg-transparent outline-none text-slate-700 placeholder-slate-500/50 text-sm text-center" />
                        </div>
                    </div>

                    <div className="bg-white/60 p-1 rounded-2xl border border-amber-200/50 shadow-sm focus-within:bg-white transition-colors">
                        <input name="hobby" value={userProfile.hobby} onChange={onChange} placeholder="취미 (예: 등산)" className="w-full px-3 py-2 bg-transparent outline-none text-slate-700 placeholder-slate-500/50 text-sm text-center" />
                    </div>

                    <div className="pt-2">
                        <p className="text-xs text-center text-amber-900/70 mb-2 font-bold">가장 지치는 시간은?</p>
                        <div className="flex gap-2 justify-center">
                            {['🌞 출근', '🍽️ 식후', '🌙 밤'].map((time) => (
                                <button key={time} onClick={() => onSetWeakTime(time)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 border ${userProfile.weakTime === time ? 'bg-amber-600 border-amber-600 text-white shadow-md' : 'bg-white/50 border-amber-200/30 text-amber-900 hover:bg-amber-100'}`}>
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={onSave} className="mt-6 w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-3xl font-bold text-lg shadow-xl shadow-amber-900/20 active:scale-95 transition-all backdrop-blur-sm">
                    서약 완료 🖋️
                </button>
            </div>
        </div>
    );
}