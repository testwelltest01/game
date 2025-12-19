'use client';

import { useState, useEffect, useRef } from 'react';
// 🆕 1. UNLOCKABLE_ITEMS 추가 (Item은 타입으로 쓰일 수 있으니 둠)
import { MonsterKey, Monster, Skill, Item, UserProfile, BattleLog, MONSTERS, GOD_MESSAGES_TEMPLATE, MBTI_TITLES, UNLOCKABLE_ITEMS } from "./data";

import Onboarding from "./components/Onboarding";
import Lobby from "./components/Lobby";
import Battle from "./components/Battle";
// import Shop from "./components/Shop"; // 🗑️ 상점 컴포넌트 제거
import Victory from "./components/Victory";
import Profile from "./components/Profile";
import Splash from "./components/Splash";
import Consolation from "./components/Consolation";
import DailyDecree from "./components/DailyDecree";
import Statistics from "./components/Statistics";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  // Shop 화면 상태 제거 (타입 정의에서는 남겨도 상관없지만 사용하지 않음)
  const [screen, setScreen] = useState<'ONBOARDING' | 'LOBBY' | 'BATTLE' | 'VICTORY' | 'SHOP' | 'PROFILE' | 'CONSOLATION' | 'DAILY_DECREE' | 'STATISTICS'>('ONBOARDING');

  // 🆕 2. 초기 포인트 0으로 설정
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '', age: '', gender: '', mbti: '', isMarried: '', location: '', hobby: '', food: '', weakTime: '',
    points: 0, // [수정] 500 -> 0
    inventory: [], logs: []
  });

  const [currentTag, setCurrentTag] = useState<Monster | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [godMsg, setGodMsg] = useState<string>('');
  const [showLight, setShowLight] = useState<boolean>(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isInitialized) return;

    // 1. 재생해야 할 목표 음악(src) 결정
    let nextSrc = '';
    // SHOP은 이제 없지만 로직상 남겨둬도 무방
    if (['LOBBY', 'SHOP', 'PROFILE', 'CONSOLATION', 'ONBOARDING', 'STATISTICS'].includes(screen)) {
      nextSrc = '/audio/village.mp3';
    }
    else if (screen === 'BATTLE') nextSrc = '/audio/battle.mp3';
    else if (screen === 'VICTORY') nextSrc = '/audio/victory_choir.mp3';
    else if (screen === 'DAILY_DECREE') nextSrc = '/audio/daily_decree.mp3';

    // 2. 현재 재생 중인 노래와 목표 노래가 같다면 유지
    if (currentSrcRef.current === nextSrc) {
      return;
    }

    // 3. 노래가 다르다면 기존 음악 정지
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current = null;
    }

    // 4. 새로운 음악 재생
    if (nextSrc) {
      const audio = new Audio(nextSrc);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch((e) => console.log("Audio play failed:", e));

      bgmRef.current = audio;
      currentSrcRef.current = nextSrc;
    } else {
      currentSrcRef.current = null;
    }
  }, [screen, isInitialized]);

  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('kingdom_user_profile');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserProfile({
        ...parsed,
        age: parsed.age ?? '',
        gender: parsed.gender ?? '',
        mbti: parsed.mbti ?? '',
        isMarried: parsed.isMarried ?? '',
        points: parsed.points ?? 0, // 저장된 포인트 없으면 0
        inventory: parsed.inventory ?? [],
        logs: parsed.logs ?? []
      });
    } else {
      setScreen('ONBOARDING');
    }
  }, []);

  useEffect(() => {
    if (userProfile.name) localStorage.setItem('kingdom_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const playSfx = (type: 'attack' | 'click' | 'buy') => {
    const audio = new Audio('/audio/attack.mp3');
    audio.volume = 0.8;
    audio.play().catch((e) => console.log("SFX play failed:", e));
  };

  const checkDailyVisit = () => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('kingdom_last_visit');

    if (lastVisit !== today) {
      setScreen('DAILY_DECREE');
      localStorage.setItem('kingdom_last_visit', today);
    } else {
      setScreen('LOBBY');
    }
  };

  const handleStartApp = () => {
    setIsInitialized(true);
    const audio = new Audio('/audio/village.mp3');
    audio.volume = 0;
    audio.play().then(() => audio.pause());

    const savedData = localStorage.getItem('kingdom_user_profile');
    if (!savedData) {
      setScreen('ONBOARDING');
    } else {
      checkDailyVisit();
    }
  };

  const addBattleLog = (result: 'WIN' | 'RUN', skillName?: string) => {
    if (!currentTag) return;
    const now = new Date();
    const timestamp = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLog: BattleLog = { id: Date.now(), timestamp, monsterName: currentTag.name, monsterEmoji: currentTag.emoji, result, skillName };
    setUserProfile(prev => ({ ...prev, logs: [newLog, ...prev.logs] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleEncounter = (key: string) => {
    setCurrentTag(MONSTERS[key as MonsterKey]);
    setScreen('BATTLE');
  };

  // 🆕 3. 공격 승리 시: 포인트 증가 + 아이템 자동 해금 로직
  const handleSkillAttack = (skill: Skill) => {
    playSfx('attack');
    setSelectedSkill(skill);
    addBattleLog('WIN', skill.name);

    const rewardPoints = currentTag ? currentTag.reward : 50;

    setUserProfile(prev => {
      const newPoints = prev.points + rewardPoints;

      // 해금 로직: 현재 포인트보다 낮거나 같은 unlockScore를 가진 아이템 찾기
      const unlockedItems = UNLOCKABLE_ITEMS
        .filter(item => item.unlockScore <= newPoints)
        .map(item => item.id);

      // 기존 인벤토리와 합치기 (Set으로 중복 제거)
      const newInventory = Array.from(new Set([...prev.inventory, ...unlockedItems]));

      return {
        ...prev,
        points: newPoints,
        inventory: newInventory
      };
    });

    setTimeout(() => {
      setScreen('VICTORY');
      const msg = GOD_MESSAGES_TEMPLATE[Math.floor(Math.random() * GOD_MESSAGES_TEMPLATE.length)]
        .replace(/{name}/g, userProfile.name)
        .replace(/{food}/g, userProfile.food || '음식')
        .replace(/{location}/g, userProfile.location || '세상')
        .replace(/{hobby}/g, userProfile.hobby || '일');
      setGodMsg(msg);
      setTimeout(() => setShowLight(true), 100);
    }, 500);
  };

  // 🆕 4. 후퇴 시: 포인트 30점 차감 (최소 0점)
  const handleRetreat = () => {
    addBattleLog('RUN');
    setUserProfile(prev => ({
      ...prev,
      points: Math.max(0, prev.points - 30)
    }));
    setScreen('CONSOLATION');
  };

  // 🗑️ handleBuyItem 삭제 (상점 제거됨)

  const userTitle = userProfile.mbti ? MBTI_TITLES[userProfile.mbti] : '용감한';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-8 font-sans relative">
      <div className="w-full h-[100dvh] min-h-[700px] md:h-[850px] md:max-w-[420px] bg-black md:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-slate-900 z-10">

        <div className="absolute top-0 w-full h-8 z-50 flex justify-between items-center px-6 pt-2 mix-blend-difference text-white">
          <span className="text-[10px] font-bold">with Intochurch</span>
        </div>

        {!isInitialized ? (
          <Splash onStart={handleStartApp} />
        ) : (
          <>
            {/* 🆕 5. VICTORY 화면에서는 상단바 숨김 추가 */}
            {screen !== 'ONBOARDING' && screen !== 'CONSOLATION' && screen !== 'DAILY_DECREE' && screen !== 'VICTORY' && (
              <div className="w-full px-6 pt-12 pb-4 flex justify-between items-end bg-white/60 backdrop-blur-xl z-40 border-b border-white/20 sticky top-0">
                <div>
                  <span className="text-xs text-slate-600 font-bold">Kingdom Guardian</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold tracking-tighter">{userTitle} 용사</span>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-slate-900 text-lg">🛡️ {userProfile.name}</span>
                      <span className="text-xs bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">Lv.{1 + userProfile.inventory.length}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-400/90 px-3 py-1 rounded-full text-yellow-900 font-bold text-sm shadow-sm backdrop-blur-md">
                  ❤ {userProfile.points.toLocaleString()}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 h-full">
              {screen === 'ONBOARDING' && <Onboarding userProfile={userProfile} onChange={handleInputChange} onSetWeakTime={(t) => setUserProfile(p => ({ ...p, weakTime: t }))} onSave={() => { if (!userProfile.name) return alert("이름을 입력해주세요!"); setScreen('DAILY_DECREE'); }} />}

              {/* Lobby에 onOpenShop 제거 */}
              {screen === 'LOBBY' && <Lobby userProfile={userProfile} onEncounter={handleEncounter} onOpenProfile={() => setScreen('PROFILE')} />}

              {/* 🗑️ Shop 화면 렌더링 삭제 */}

              {screen === 'PROFILE' && <Profile
                userProfile={userProfile}
                onClose={() => setScreen('LOBBY')}
                onReset={() => {
                  localStorage.removeItem('kingdom_user_profile');
                  localStorage.removeItem('kingdom_last_visit');
                  setScreen('ONBOARDING');
                }}
                onOpenStats={() => setScreen('STATISTICS')}
              />}
              {screen === 'STATISTICS' && <Statistics
                userProfile={userProfile}
                onClose={() => setScreen('PROFILE')}
              />}
              {screen === 'BATTLE' && currentTag && <Battle monster={currentTag} onSkillAttack={handleSkillAttack} onRetreat={handleRetreat} playSfx={playSfx} onCancel={() => setScreen('LOBBY')} />}
              {screen === 'VICTORY' && <Victory godMsg={godMsg} selectedSkill={selectedSkill} showLight={showLight} onReset={() => { setScreen('LOBBY'); setShowLight(false); setSelectedSkill(null); }} />}
              {screen === 'CONSOLATION' && <Consolation userProfile={userProfile} onClose={() => setScreen('LOBBY')} />}

              {screen === 'DAILY_DECREE' && <DailyDecree onClose={() => setScreen('LOBBY')} />}

              {screen === 'PROFILE' && <Profile
                userProfile={userProfile}
                onClose={() => setScreen('LOBBY')}
                onReset={() => { /* ...초기화 로직... */ }}
                onOpenStats={() => setScreen('STATISTICS')}
              />}
              {screen === 'STATISTICS' && <Statistics
                userProfile={userProfile}
                onClose={() => setScreen('PROFILE')}
              />}
            </div>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-white/50 rounded-full z-[101] pointer-events-none mix-blend-difference"></div>
      </div>
    </div>
  );
}