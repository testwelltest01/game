'use client';

import { useState, useEffect } from 'react';

interface Props {
    onStart: () => void;
}

export default function Splash({ onStart }: Props) {
    // 🆕 배경 비디오 상태
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const videoList = [
            '/video/start.mp4'
        ];
        setVideoSrc(videoList[Math.floor(Math.random() * videoList.length)]);
    }, []);

    return (
        <div
            onClick={onStart}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden cursor-pointer animate-fade-in"
        >
            {/* 🆕 1. 배경 비디오 레이어 */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {videoSrc && (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover grayscale-[30%] opacity-60"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* 흰색 글씨가 잘 보이도록 어두운 막을 씌움 */}
                <div className="absolute inset-0 bg-black/1 backdrop-blur-[1px]"></div>
            </div>

            {/* 2. 메인 텍스트 (z-10) */}
            <div className="relative z-10 text-center animate-bounce">
                <span className="text-6xl mb-4 block drop-shadow-lg">⚔️</span>
                <h1 className="text-3xl font-black text-white drop-shadow-xl mb-2">
                    Kingdom<br />Guardian
                </h1>
                <p className="text-white/90 text-sm font-bold blink-text drop-shadow-md">
                    화면을 터치해서 시작하세요
                </p>
            </div>

            <style jsx>{`
        .blink-text {
          animation: blink 1.5s infinite;
        }
        @keyframes blink {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}