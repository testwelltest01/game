'use client'; // useState, useEffect 사용을 위해 필요

import { useState, useEffect } from 'react';
import { UserProfile } from "../data";

interface Props {
    userProfile: UserProfile;
    onClose: () => void;
}

export default function Consolation({ userProfile, onClose }: Props) {
    // 🆕 랜덤 비디오 상태 관리
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        // 비디오 파일 목록 (public/video 폴더 안에 있어야 함)
        const videoList = [
            '/video/consolation1.mp4',
            '/video/consolation2.mp4',
            '/video/consolation3.mp4',
            '/video/consolation4.mp4'
        ];
        // 랜덤 선택
        const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
        setVideoSrc(randomVideo);
    }, []);

    return (
        // 전체 컨테이너 (기존 녹색 배경 제거 -> 검은색 베이스)
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden animate-fade-in">

            {/* 🆕 배경 비디오 레이어 (글씨보다 뒤에 위치) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {videoSrc && (
                    <video
                        key={videoSrc} // 소스가 바뀔 때마다 재로딩
                        autoPlay
                        loop
                        muted
                        playsInline
                        // 약간 흑백+투명하게 해서 차분한 느낌 주기
                        className="w-full h-full object-cover grayscale-[30%] opacity-70"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 비디오 위에 덮는 에메랄드빛 반투명 막 (가독성 확보 및 분위기 연출) */}
                <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-[3px]"></div>
            </div>

            {/* 메인 콘텐츠 (z-10으로 비디오 위에 뜸) */}
            <div className="relative z-10 w-full px-8 flex flex-col items-center h-full justify-center text-center">
                <div className="text-6xl mb-6 animate-bounce grayscale opacity-90 drop-shadow-lg">🕊️</div>

                <h2 className="text-4xl font-black text-white mb-4 drop-shadow-md">괜찮아요.</h2>

                <div className="w-full bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-emerald-200/50">
                    <p className="text-lg font-medium text-slate-700 leading-relaxed break-keep mb-4">
                        "{userProfile.name}아, 도망친 게 아니란다.<br />
                        잠시 내 품에서 숨을 고르는 거란다."
                    </p>
                    <p className="text-xs text-emerald-700 font-bold mt-2">
                        - 하나님 아버지가 -
                    </p>
                </div>

                <div className="mt-8 text-sm text-white/80 font-medium mb-8 drop-shadow">
                    지친 마음이 조금 회복되었나요?
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/30 active:scale-95 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                >
                    <span>네, 다시 일어날게요</span>
                    <span>💪</span>
                </button>
            </div>
        </div>
    );
}