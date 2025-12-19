'use client';

import { useState, useEffect, useRef } from 'react';
import { MonsterKey, Monster, Skill, Item, UserProfile, BattleLog, MONSTERS, GOD_MESSAGES_TEMPLATE, MBTI_TITLES } from "./data";

import Onboarding from "./components/Onboarding";
import Lobby from "./components/Lobby";
import Battle from "./components/Battle";
import Shop from "./components/Shop";
import Victory from "./components/Victory";
import Profile from "./components/Profile";
import Splash from "./components/Splash";
import Consolation from "./components/Consolation";
import DailyDecree from "./components/DailyDecree"; // 🆕 1. 컴포넌트 추가

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  // 🆕 2. DAILY_DECREE 화면 추가
  const [screen, setScreen] = useState<'ONBOARDING' | 'LOBBY' | 'BATTLE' | 'VICTORY' | 'SHOP' | 'PROFILE' | 'CONSOLATION' | 'DAILY_DECREE'>('ONBOARDING');

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '', age: '', gender: '', mbti: '', isMarried: '', location: '', hobby: '', food: '', weakTime: '', points: 500, inventory: [], logs: []
  });

  const [currentTag, setCurrentTag] = useState<Monster | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [godMsg, setGodMsg] = useState<string>('');
  const [showLight, setShowLight] = useState<boolean>(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isInitialized) return;
    if (bgmRef.current) { bgmRef.current.pause(); bgmRef.current = null; }
    let src = '';
    // DAILY_DECREE도 로비 음악과 동일하게 평화로운 BGM
    if (screen === 'LOBBY' || screen === 'SHOP' || screen === 'PROFILE' || screen === 'CONSOLATION' || screen === 'DAILY_DECREE') src = '/audio/village.mp3';
    else if (screen === 'BATTLE') src = '/audio/battle.mp3';
    else if (screen === 'VICTORY') src = '/audio/victory_choir.mp3';
    else if (screen === 'ONBOARDING') src = '/audio/village.mp3';

    if (src) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch((e) => console.log("Audio play failed:", e));
      bgmRef.current = audio;
    }
    return () => { if (bgmRef.current) bgmRef.current.pause(); };
  }, [screen, isInitialized]);

  const playSfx = (type: 'attack' | 'click' | 'buy') => {
    if (!isInitialized) return;
    const audio = new Audio('/audio/attack.mp3');
    audio.volume = 0.8;
    audio.play();
  };

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
        points: parsed.points ?? 500,
        inventory: parsed.inventory ?? [],
        logs: parsed.logs ?? []
      });
      // 화면 전환은 handleStartApp 등에서 결정
    } else {
      setScreen('ONBOARDING');
    }
  }, []);

  useEffect(() => {
    if (userProfile.name) localStorage.setItem('kingdom_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // 🆕 3. 오늘 접속했는지 확인하는 함수
  const checkDailyVisit = () => {
    const today = new Date().toDateString(); // 예: "Fri Dec 19 2025"
    const lastVisit = localStorage.getItem('kingdom_last_visit');

    if (lastVisit !== today) {
      // 오늘 처음 방문임 -> 칙령 보여주기
      setScreen('DAILY_DECREE');
      localStorage.setItem('kingdom_last_visit', today); // 방문 기록 저장
    } else {
      // 이미 방문했음 -> 로비로
      setScreen('LOBBY');
    }
  };

  const handleStartApp = () => {
    setIsInitialized(true);
    const audio = new Audio('/audio/village.mp3');
    audio.volume = 0;
    audio.play().then(() => audio.pause());

    // 데이터가 없으면 온보딩, 있으면 날짜 체크해서 칙령 or 로비
    const savedData = localStorage.getItem('kingdom_user_profile');
    if (!savedData) {
      setScreen('ONBOARDING');
    } else {
      checkDailyVisit(); // 🆕 여기서 분기 처리
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

  const handleSkillAttack = (skill: Skill) => {
    playSfx('attack');
    setSelectedSkill(skill);
    addBattleLog('WIN', skill.name);
    const rewardPoints = currentTag ? currentTag.reward : 50;
    setUserProfile(prev => ({ ...prev, points: prev.points + rewardPoints }));

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

  const handleRetreat = () => {
    addBattleLog('RUN');
    setScreen('CONSOLATION');
  };

  const handleBuyItem = (item: Item) => {
    if (userProfile.points < item.price) return alert("포인트 부족!");
    if (userProfile.inventory.includes(item.id)) return;
    if (confirm("구매하시겠습니까?")) {
      playSfx('buy');
      setUserProfile(prev => ({ ...prev, points: prev.points - item.price, inventory: [...prev.inventory, item.id] }));
    }
  };

  const userTitle = userProfile.mbti ? MBTI_TITLES[userProfile.mbti] : '용감한';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-8 font-sans overflow-hidden relative">
      <div className="w-full h-[100dvh] md:h-[850px] md:max-w-[420px] bg-black md:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-slate-900 z-10">

        <div className="absolute top-0 w-full h-8 z-50 flex justify-between items-center px-6 pt-2 mix-blend-difference text-white">
          <span className="text-[10px] font-bold">9:41</span>
        </div>

        {!isInitialized ? (
          <Splash onStart={handleStartApp} />
        ) : (
          <>
            {screen !== 'ONBOARDING' && screen !== 'CONSOLATION' && screen !== 'DAILY_DECREE' && (
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
                  🪙 {userProfile.points.toLocaleString()}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 h-full">
              {screen === 'ONBOARDING' && <Onboarding userProfile={userProfile} onChange={handleInputChange} onSetWeakTime={(t) => setUserProfile(p => ({ ...p, weakTime: t }))} onSave={() => { if (!userProfile.name) return alert("이름을 입력해주세요!"); setScreen('DAILY_DECREE'); /* 서약 직후에도 칙령 보여주기 */ }} />}

              {screen === 'LOBBY' && <Lobby userProfile={userProfile} onEncounter={handleEncounter} onOpenShop={() => setScreen('SHOP')} onOpenProfile={() => setScreen('PROFILE')} onReset={() => { localStorage.removeItem('kingdom_user_profile'); localStorage.removeItem('kingdom_last_visit'); setScreen('ONBOARDING'); }} />}

              {screen === 'SHOP' && <Shop userProfile={userProfile} userPoints={userProfile.points} inventory={userProfile.inventory} onBuy={handleBuyItem} onClose={() => setScreen('LOBBY')} />}
              {screen === 'PROFILE' && <Profile userProfile={userProfile} onClose={() => setScreen('LOBBY')} />}
              {screen === 'BATTLE' && currentTag && <Battle monster={currentTag} onSkillAttack={handleSkillAttack} onRetreat={handleRetreat} playSfx={playSfx} />}
              {screen === 'VICTORY' && <Victory godMsg={godMsg} selectedSkill={selectedSkill} showLight={showLight} onReset={() => { setScreen('LOBBY'); setShowLight(false); setSelectedSkill(null); }} />}
              {screen === 'CONSOLATION' && <Consolation userProfile={userProfile} onClose={() => setScreen('LOBBY')} />}

              {/* 🆕 4. 칙령 화면 렌더링 */}
              {screen === 'DAILY_DECREE' && <DailyDecree onClose={() => setScreen('LOBBY')} />}
            </div>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-white/50 rounded-full z-[101] pointer-events-none mix-blend-difference"></div>
      </div>
    </div>
  );
}