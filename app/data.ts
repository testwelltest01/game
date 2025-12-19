// app/data.ts

export type MonsterKey = 'money' | 'people' | 'future' | 'anger' | 'lazy';

export interface Skill {
    name: string;
    verse: string;
    ref: string;
}

export interface Monster {
    name: string;
    emoji: string;
    color: string;
    bg: string;
    reward: number;
    skills: Skill[];
}

export interface Item {
    id: string;
    name: string;
    price: number;
    emoji: string;
    desc: string;
}

export interface BattleLog {
    id: number;
    timestamp: string;
    monsterName: string;
    monsterEmoji: string;
    result: 'WIN' | 'RUN';
    skillName?: string;
}

// 🆕 사용자 정보 확장 (나이, 성별, MBTI, 결혼 추가)
export interface UserProfile {
    name: string;
    age: string;         // 나이
    gender: string;      // 성별 (남/여)
    mbti: string;        // MBTI
    isMarried: string;   // 결혼 여부 (기혼/미혼)
    location: string;
    hobby: string;
    food: string;
    weakTime: string;
    points: number;
    inventory: string[];
    logs: BattleLog[];
}

// 🆕 MBTI별 용사 수식어 (형용사)
export const MBTI_TITLES: Record<string, string> = {
    ISTJ: '빈틈없는 원칙주의', ISFJ: '성실한 수호자', INFJ: '통찰력 있는', INTJ: '치밀한 전략가',
    ISTP: '만능 재주꾼', ISFP: '호기심 많은', INFP: '열정적인 중보자', INTP: '논리적인 사색가',
    ESTP: '모험을 즐기는', ESFP: '자유로운 영혼', ENFP: '재기발랄한 활동가', ENTP: '뜨거운 논쟁가',
    ESTJ: '엄격한 관리자', ESFJ: '사교적인 외교관', ENFJ: '정의로운 지도자', ENTJ: '대담한 통솔자'
};

// ... (MONSTERS, SHOP_ITEMS, GOD_MESSAGES_TEMPLATE는 기존과 동일하게 유지) ...
export const MONSTERS: Record<MonsterKey, Monster> = {
    money: { name: '탐욕의 뚱룡', emoji: '💰', color: 'text-yellow-600', bg: 'bg-yellow-50/90', reward: 100, skills: [{ name: '자족의 일격', verse: '돈을 사랑하지 말고...', ref: '히 13:5' }, { name: '두 주인의 심판', verse: '너희가 하나님과 재물을...', ref: '마 6:24' }, { name: '공급의 방패', verse: '나의 하나님이...', ref: '빌 4:19' }] },
    people: { name: '눈치 슬라임', emoji: '👀', color: 'text-purple-600', bg: 'bg-purple-50/90', reward: 80, skills: [{ name: '하나님의 기쁨', verse: '내가 사람을 기쁘게...', ref: '갈 1:10' }, { name: '담대함의 외침', verse: '주는 나를 돕는 이시니...', ref: '히 13:6' }, { name: '평가의 자유', verse: '판단 받는 것이...', ref: '고전 4:3' }] },
    future: { name: '불안의 유령', emoji: '🌫️', color: 'text-slate-600', bg: 'bg-slate-100/90', reward: 120, skills: [{ name: '평강의 수호', verse: '아무 것도 염려하지 말고...', ref: '빌 4:6' }, { name: '동행의 약속', verse: '두려워하지 말라...', ref: '사 41:10' }, { name: '내일의 맡김', verse: '내일 일은 내일이...', ref: '마 6:34' }] },
    anger: { name: '화염 가고일', emoji: '🔥', color: 'text-red-600', bg: 'bg-red-50/90', reward: 150, skills: [{ name: '온유의 물', verse: '성내기도 더디 하라.', ref: '약 1:19' }, { name: '죄의 차단', verse: '분을 내어도...', ref: '엡 4:26' }, { name: '용서의 결단', verse: '서로 용서하기를...', ref: '엡 4:32' }] },
    lazy: { name: '잠자는 곰', emoji: '💤', color: 'text-blue-600', bg: 'bg-blue-50/90', reward: 50, skills: [{ name: '주께 하듯', verse: '마음을 다하여...', ref: '골 3:23' }, { name: '깨어남의 빛', verse: '잠자는 자여 깨어서...', ref: '엡 5:14' }, { name: '충성의 열매', verse: '작은 것에 충성된 자는...', ref: '눅 16:10' }] },
};

export const SHOP_ITEMS: Item[] = [
    { id: 'belt', name: '진리의 허리띠', price: 300, emoji: '🥋', desc: '거짓을 이기는 힘' },
    { id: 'shoes', name: '평안의 신발', price: 500, emoji: '👟', desc: '어디든 가는 복음' },
    { id: 'shield', name: '믿음의 방패', price: 1000, emoji: '🛡️', desc: '불화살을 막아냄' },
    { id: 'helmet', name: '구원의 투구', price: 1500, emoji: '🪖', desc: '생각을 보호함' },
    { id: 'sword', name: '성령의 검', price: 2000, emoji: '⚔️', desc: '말씀으로 공격!' },
];

export const GOD_MESSAGES_TEMPLATE = [
    "사랑하는 {name}아, 네가 {food}을(를) 먹을 때의 기쁨보다 내가 너를 더 기뻐한단다.",
    "{location}에서 치열하게 사는 너의 모습을 내가 다 보고 있단다.",
    "네가 {hobby}에 열중할 때처럼, 나의 일에도 열심인 네가 자랑스럽구나.",
    "잘했다, 나의 충성된 용사 {name}여!"
];

export interface Decree {
    verse: string;
    ref: string;
    message: string; // 왕의 코멘트
}

export const DAILY_DECREES: Decree[] = [
    { verse: "너희는 세상의 소금이니 소금이 만일 그 맛을 잃으면 무엇으로 짜게 하리요.", ref: "마태복음 5:13", message: "세상에 맛을 내는 용사가 되어라." },
    { verse: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라.", ref: "이사야 41:10", message: "내가 너의 등 뒤에 있다." },
    { verse: "너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라.", ref: "베드로전서 5:7", message: "짐은 내가 들 테니, 너는 걸어라." },
    { verse: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요.", ref: "이사야 40:31", message: "지치지 않는 힘을 주노라." },
    { verse: "사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라.", ref: "잠언 16:9", message: "너의 길은 내가 완벽히 알고 있다." },
];