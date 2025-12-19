'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from "../data";

interface Props {
    userProfile: UserProfile;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSetWeakTime: (time: string) => void;
    onSave: () => void;
}

export default function Onboarding({ userProfile, onChange, onSetWeakTime, onSave }: Props) {
    // 🆕 배경 비디오 상태 복구
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const videoList = ['/video/lobby1.mp4', '/video/lobby2.mp4', '/video/lobby3.mp4', '/video/lobby4.mp4'];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    // 유효성 검사 함수 (기존 유지)
    const handleStartClick = () => {
        // 1. 빈칸 체크
        if (
            !userProfile.name || !userProfile.age || !userProfile.gender || !userProfile.mbti ||
            !userProfile.isMarried || !userProfile.location || !userProfile.hobby ||
            !userProfile.food || !userProfile.weakTime
        ) {
            alert("모든 빈칸을 빠짐없이 채워주세요!");
            return;
        }

        // 2. 이름 한글 체크
        const nameRegex = /^[가-힣]+$/;
        if (!nameRegex.test(userProfile.name)) {
            alert("이름은 한글로만 입력해주세요. (자음/모음 단독 불가)");
            return;
        }

        // 3. 나이 범위 체크
        const ageNum = parseInt(userProfile.age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum >= 100) {
            alert("나이는 1세 이상 100세 미만의 숫자만 입력 가능합니다.");
            return;
        }

        onSave();
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-white">

            {/* 🆕 1. 배경 비디오 레이어 (복구됨) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {videoSrc && (
                    <video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[20%] opacity-50">
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 글씨 잘 보이게 흰색 막 추가 */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            </div>

            {/* 2. 입력 폼 콘텐츠 (스크롤 가능) */}
            <div className="absolute inset-0 z-10 p-6 pb-24 overflow-y-auto no-scrollbar animate-fade-in">
                <div className="text-center mt-8 mb-8">
                    <span className="text-4xl">📝</span>
                    <h2 className="text-2xl font-black text-slate-800 mt-2">용사 등록 서약서</h2>
                    <p className="text-xs text-slate-600 font-bold mt-1">Kingdom Guardian 입단을 환영합니다.</p>
                </div>

                <div className="space-y-5">

                    {/* 이름 입력 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">이름 (한글)</label>
                        <input
                            name="name"
                            value={userProfile.name}
                            onChange={onChange}
                            placeholder="홍길동"
                            className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-slate-800 shadow-sm backdrop-blur-sm"
                        />
                    </div>

                    {/* 나이 & 성별 */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">나이 (숫자)</label>
                            <input
                                name="age"
                                type="number"
                                value={userProfile.age}
                                onChange={onChange}
                                placeholder="25"
                                className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 shadow-sm backdrop-blur-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">성별</label>
                            <select name="gender" value={userProfile.gender} onChange={onChange} className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 appearance-none shadow-sm backdrop-blur-sm">
                                <option value="">선택</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </select>
                        </div>
                    </div>

                    {/* MBTI & 결혼 여부 */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">MBTI</label>
                            <select name="mbti" value={userProfile.mbti} onChange={onChange} className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                                <option value="">선택</option>
                                <option value="ISTJ">ISTJ</option> <option value="ISFJ">ISFJ</option> <option value="INFJ">INFJ</option> <option value="INTJ">INTJ</option>
                                <option value="ISTP">ISTP</option> <option value="ISFP">ISFP</option> <option value="INFP">INFP</option> <option value="INTP">INTP</option>
                                <option value="ESTP">ESTP</option> <option value="ESFP">ESFP</option> <option value="ENFP">ENFP</option> <option value="ENTP">ENTP</option>
                                <option value="ESTJ">ESTJ</option> <option value="ESFJ">ESFJ</option> <option value="ENFJ">ENFJ</option> <option value="ENTJ">ENTJ</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">결혼 여부</label>
                            <select name="isMarried" value={userProfile.isMarried} onChange={onChange} className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                                <option value="">선택</option>
                                <option value="single">미혼</option>
                                <option value="married">기혼</option>
                            </select>
                        </div>
                    </div>

                    {/* 거주지 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">사는 곳 (동네)</label>
                        <input name="location" value={userProfile.location} onChange={onChange} placeholder="서울시 강남구" className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 shadow-sm backdrop-blur-sm" />
                    </div>

                    {/* 취미 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">취미</label>
                        <input name="hobby" value={userProfile.hobby} onChange={onChange} placeholder="독서, 등산 등" className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 shadow-sm backdrop-blur-sm" />
                    </div>

                    {/* 좋아하는 음식 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">좋아하는 음식</label>
                        <input name="food" value={userProfile.food} onChange={onChange} placeholder="떡볶이, 치킨 등" className="w-full bg-white/80 p-4 rounded-2xl border border-white/50 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 shadow-sm backdrop-blur-sm" />
                    </div>

                    {/* 가장 약한 시간 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2 ml-1">가장 마음이 약해지는 시간은?</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['🌞 출근/아침', '🍚 식후/오후', '🌙 퇴근/밤'].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => onSetWeakTime(time)}
                                    className={`py-3 rounded-xl text-xs font-bold border transition-all shadow-sm ${userProfile.weakTime === time
                                            ? 'bg-blue-600 text-white border-blue-600 transform scale-105'
                                            : 'bg-white/80 text-slate-600 border-white/50 hover:bg-white'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={handleStartClick}
                        className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <span>입단 서약 완료</span>
                        <span>👉</span>
                    </button>
                </div>
            </div>
        </div>
    );
}