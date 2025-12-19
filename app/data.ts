// app/data.ts

// 🆕 MonsterKey 확장 (기존 5개 + 신규 5개)
export type MonsterKey =
    'money' | 'people' | 'future' | 'anger' | 'lazy' |
    'complaint' | 'indifference' | 'distraction' | 'judgment' | 'arrogance';

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
    unlockScore: number;
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

export interface UserProfile {
    name: string;
    age: string;
    gender: string;
    mbti: string;
    isMarried: string;
    location: string;
    hobby: string;
    food: string;
    weakTime: string;
    points: number;
    inventory: string[];
    logs: BattleLog[];
}

export interface Monster {
    name: string;
    emoji: string;
    color: string;
    bg: string;
    reward: number;
    scheme: string; // 🆕 몬스터가 인간을 무너뜨리는 논리/거짓말
    skills: Skill[];
}

export const MBTI_TITLES: Record<string, string> = {
    ISTJ: '빈틈없는 원칙주의', ISFJ: '성실한 수호자', INFJ: '통찰력 있는', INTJ: '치밀한 전략가',
    ISTP: '만능 재주꾼', ISFP: '호기심 많은', INFP: '열정적인 중보자', INTP: '논리적인 사색가',
    ESTP: '모험을 즐기는', ESFP: '자유로운 영혼', ENFP: '재기발랄한 활동가', ENTP: '뜨거운 논쟁가',
    ESTJ: '엄격한 관리자', ESFJ: '사교적인 외교관', ENFJ: '정의로운 지도자', ENTJ: '대담한 통솔자'
};


// 🆕 몬스터 데이터 대폭 업데이트 (말씀 풀텍스트 & 신규 카테고리 추가)
export const MONSTERS: Record<MonsterKey, Monster> = {
    // --- 기존 몬스터 (말씀 수정됨) ---
    money: {
        name: '탐욕의 뚱룡',
        emoji: '💰',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50/90',
        reward: 100,
        scheme: "네 통장의 잔고가 곧 너의 가치라고, 돈이 없으면 하나님도 널 도울 수 없다고 속삭인다.",
        skills: [
            { name: '자족의 일격', verse: '돈을 사랑하지 말고 있는 바를 족한 줄로 알라 그가 친히 말씀하시기를 내가 결코 너희를 버리지 아니하고 너희를 떠나지 아니하리라 하셨느니라', ref: '히 13:5' },
            { name: '두 주인의 심판', verse: '한 사람이 두 주인을 섬기지 못할 것이니 혹 이를 미워하고 저를 사랑하거나 혹 이를 중히 여기고 저를 경히 여김이라 너희가 하나님과 재물을 겸하여 섬기지 못하느니라', ref: '마 6:24' },
            { name: '공급의 방패', verse: '나의 하나님이 그리스도 예수 안에서 영광 가운데 그 풍성한 대로 너희 모든 쓸 것을 채우시리라', ref: '빌 4:19' }
        ]
    },
    people: {
        name: '눈치 슬라임',
        emoji: '👀',
        color: 'text-purple-600',
        bg: 'bg-purple-50/90',
        reward: 80,
        scheme: "사람들에게 인정받지 못하면 실패한 인생이라고, 거절당하는 것을 두려워하라고 위협한다.",
        skills: [
            { name: '하나님의 기쁨', verse: '이제 내가 사람들에게 좋게 하랴 하나님께 좋게 하랴 사람들에게 기쁨을 구하랴 내가 지금까지 사람들의 기쁨을 구하였다면 그리스도의 종이 아니니라', ref: '갈 1:10' },
            { name: '담대함의 외침', verse: '그러므로 우리가 담대히 말하되 주는 나를 돕는 이시니 내가 무서워하지 아니하겠노라 사람이 내게 어찌하리요 하노라', ref: '히 13:6' },
            { name: '평가의 자유', verse: '너희에게나 다른 사람에게나 판단 받는 것이 내게는 매우 작은 일이라 나도 나를 판단하지 아니하노니 다만 나를 심판하실 이는 주시니라', ref: '고전 4:3-4' }
        ]
    },
    future: {
        name: '불안의 유령',
        emoji: '🌫️',
        color: 'text-slate-600',
        bg: 'bg-slate-100/90',
        reward: 120,
        scheme: "너의 앞날은 어둡고, 아무리 노력해도 안 될 거라고, 하나님은 널 잊으셨다고 거짓말한다.",
        skills: [
            { name: '평강의 수호', verse: '아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라', ref: '빌 4:6' },
            { name: '동행의 약속', verse: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라', ref: '사 41:10' },
            { name: '내일의 맡김', verse: '그러므로 내일 일을 위하여 염려하지 말라 내일 일은 내일이 염려할 것이요 한 날의 괴로움은 그 날로 족하니라', ref: '마 6:34' }
        ]
    },
    anger: {
        name: '화염 가고일',
        emoji: '🔥',
        color: 'text-red-600',
        bg: 'bg-red-50/90',
        reward: 150,
        scheme: "네가 당한 부당함은 절대 용서해선 안 된다고, 화를 내야만 네 권리를 찾을 수 있다고 부추긴다.",
        skills: [
            { name: '온유의 물', verse: '내 사랑하는 형제들아 너희가 알지니 사람마다 듣기는 속히 하고 말하기는 더디 하며 성내기도 더디 하라', ref: '약 1:19' },
            { name: '죄의 차단', verse: '분을 내어도 죄를 짓지 말며 해가 지도록 분을 품지 말고 마귀에게 틈을 주지 말라', ref: '엡 4:26-27' },
            { name: '용서의 결단', verse: '서로 친절하게 하며 불쌍히 여기며 서로 용서하기를 하나님이 그리스도 안에서 너희를 용서하심과 같이 하라', ref: '엡 4:32' }
        ]
    },
    lazy: {
        name: '잠자는 곰',
        emoji: '💤',
        color: 'text-blue-600',
        bg: 'bg-blue-50/90',
        reward: 50,
        scheme: "오늘은 너무 피곤하니 내일부터 하자고, 지금은 그냥 아무 생각 없이 쉬는 게 최고라고 유혹한다.",
        skills: [
            { name: '주께 하듯', verse: '무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라', ref: '골 3:23' },
            { name: '깨어남의 빛', verse: '그러므로 이르시기를 잠자는 자여 깨어서 죽은 자들 가운데서 일어나라 그리스도께서 너에게 비추이시리라 하셨느니라', ref: '엡 5:14' },
            { name: '충성의 열매', verse: '지극히 작은 것에 충성된 자는 큰 것에도 충성되고 지극히 작은 것에 불의한 자는 큰 것에도 불의하니라', ref: '눅 16:10' }
        ]
    },
    complaint: {
        name: '불평의 가시덤불',
        emoji: '🌵',
        color: 'text-green-700',
        bg: 'bg-green-50/90',
        reward: 90,
        scheme: "네 상황은 최악이라고, 왜 나만 이렇게 힘드냐고 끊임없이 비교하게 만들어 감사를 빼앗는다.",
        skills: [
            { name: '범사의 감사', verse: '범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라', ref: '살전 5:18' },
            { name: '찬송의 제사', verse: '감사로 제사를 드리는 자가 나를 영화롭게 하나니 그의 행위를 옳게 하는 자에게 내가 하나님의 구원을 보이리라', ref: '시 50:23' },
            { name: '자족의 능력', verse: '나는 비천에 처할 줄도 알고 풍부에 처할 줄도 알아 모든 일 곧 배부름과 배고픔과 풍부와 궁핍에도 처할 줄 아는 일체의 비결을 배웠노라', ref: '빌 4:12' }
        ]
    },
    indifference: {
        name: '무관심의 안개',
        emoji: '😶‍🌫️',
        color: 'text-gray-500',
        bg: 'bg-gray-100/90',
        reward: 110,
        scheme: "내 코가 석 자인데 남을 신경 쓸 겨를이 어디 있냐고, 나만 잘 살면 그만이라고 마음을 닫게 한다.",
        skills: [
            { name: '사랑의 빚', verse: '피차 사랑의 빚 외에는 아무에게든지 아무 빚도 지지 말라 남을 사랑하는 자는 율법을 다 이루었느니라', ref: '롬 13:8' },
            { name: '도고의 힘', verse: '그러므로 내가 첫째로 권하노니 모든 사람을 위하여 간구와 기도와 도고와 감사를 하되', ref: '딤전 2:1' },
            { name: '나라와 제사장', verse: '너희는 택하신 족속이요 왕 같은 제사장들이요 거룩한 나라요 그의 소유가 된 백성이니', ref: '벧전 2:9' }
        ]
    },
    distraction: {
        name: '소음의 확성기',
        emoji: '📢',
        color: 'text-orange-600',
        bg: 'bg-orange-50/90',
        reward: 130,
        scheme: "말씀 읽을 시간이 어디 있냐고, 재미있는 영상 하나만 더 보고 나중에 하자고 집중력을 흩뜨린다.",
        skills: [
            { name: '꿀송이 말씀', verse: '주의 말씀의 맛이 내게 어찌 그리 단지요 내 입에 꿀보다 더하니이다', ref: '시 119:103' },
            { name: '성령의 검', verse: '하나님의 말씀은 살아 있고 활력이 있어 좌우에 날선 어떤 검보다도 예리하여 혼과 영과 및 관절과 골수를 찔러 쪼개기까지 하며', ref: '히 4:12' },
            { name: '묵상의 길', verse: '이 율법책을 네 입에서 떠나지 말게 하며 주야로 그것을 묵상하여 그 안에 기록된 대로 다 지켜 행하라 그리하면 네 길이 평탄하게 될 것이며 네가 형통하리라', ref: '수 1:8' }
        ]
    },
    judgment: {
        name: '비판의 칼날',
        emoji: '🗡️',
        color: 'text-pink-600',
        bg: 'bg-pink-50/90',
        reward: 140,
        scheme: "저 사람은 틀렸고 네가 맞다고, 너의 기준대로 판단하고 정죄하는 것이 정의라고 착각하게 한다.",
        skills: [
            { name: '비판 금지', verse: '비판을 받지 아니하려거든 비판하지 말라 너희가 비판하는 그 비판으로 너희가 비판을 받을 것이요', ref: '마 7:1-2' },
            { name: '온유한 혀', verse: '유순한 대답은 분노를 쉬게 하여도 과격한 말은 노를 격동하느니라', ref: '잠 15:1' },
            { name: '사랑의 본질', verse: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며', ref: '고전 13:4' }
        ]
    },
    arrogance: {
        name: '오만의 탑',
        emoji: '🏰',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50/90',
        reward: 150,
        scheme: "이만큼 이룬 건 다 네 능력이라고, 굳이 하나님의 도우심을 구할 필요 없다고 교만하게 만든다.",
        skills: [
            { name: '겸손의 마음', verse: '아무 일에든지 다툼이나 허영으로 하지 말고 오직 겸손한 마음으로 각각 자기보다 남을 낫게 여기고', ref: '빌 2:3' },
            { name: '섬김의 자세', verse: '인자가 온 것은 섬김을 받으려 함이 아니라 도리어 섬기려 하고 자기 목숨을 많은 사람의 대속물로 주려 함이니라', ref: '막 10:45' },
            { name: '겸손의 옷', verse: '젊은 자들아 이와 같이 장로들에게 순종하고 다 서로 겸손으로 허리를 동이라 하나님은 교만한 자를 대적하시되 겸손한 자들에게는 은혜를 주시느니라', ref: '벧전 5:5' }
        ]
    }
};

export const UNLOCKABLE_ITEMS: Item[] = [
    { id: 'belt', name: '진리의 허리띠', unlockScore: 300, emoji: '🥋', desc: '거짓을 이기는 힘' },
    { id: 'shoes', name: '평안의 신발', unlockScore: 500, emoji: '👟', desc: '어디든 가는 복음' },
    { id: 'shield', name: '믿음의 방패', unlockScore: 1000, emoji: '🛡️', desc: '불화살을 막아냄' },
    { id: 'helmet', name: '구원의 투구', unlockScore: 1500, emoji: '🪖', desc: '생각을 보호함' },
    { id: 'sword', name: '성령의 검', unlockScore: 2000, emoji: '⚔️', desc: '말씀으로 공격!' },
];



export const GOD_MESSAGES_TEMPLATE = [
    "사랑하는 {name}아, 네가 {food}을(를) 먹을 때의 기쁨보다 내가 너를 더 기뻐한단다.",
    "{location}에서 치열하게 사는 너의 모습을 내가 다 보고 있단다.",
    "네가 {hobby}에 열중할 때처럼, 나의 일에도 열심인 네가 자랑스럽구나.",
    "잘했다, 나의 충성된 용사 {name}여!",
    "오늘 네가 보여준 믿음의 결단이 천국에서 해같이 빛나는구나."
];

export interface Decree {
    verse: string;
    ref: string;
    message: string;
}

export const DAILY_DECREES: Decree[] = [
    { verse: "너희는 세상의 소금이니 소금이 만일 그 맛을 잃으면 무엇으로 짜게 하리요.", ref: "마태복음 5:13", message: "세상에 맛을 내는 용사가 되어라." },
    { verse: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라.", ref: "이사야 41:10", message: "내가 너의 등 뒤에 있다." },
    { verse: "너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라.", ref: "베드로전서 5:7", message: "짐은 내가 들 테니, 너는 걸어라." },
    { verse: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요.", ref: "이사야 40:31", message: "지치지 않는 힘을 주노라." },
    { verse: "사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라.", ref: "잠언 16:9", message: "너의 길은 내가 완벽히 알고 있다." },
];

export const SITUATIONS = [
    { id: 'money', label: "돈 문제로 불안하고 통장 보기가 겁날 때", monsterKey: 'money' },
    { id: 'people', label: "사람들의 시선과 평가가 너무 두려울 때", monsterKey: 'people' },
    { id: 'future', label: "앞날이 막막하고 미래가 걱정될 때", monsterKey: 'future' },
    { id: 'anger', label: "화가 치밀어 오르고 참을 수 없을 때", monsterKey: 'anger' },
    { id: 'lazy', label: "아무것도 하기 싫고 무기력할 때", monsterKey: 'lazy' },
    { id: 'complaint', label: "자꾸 상황 탓, 남 탓 불평이 나올 때", monsterKey: 'complaint' },
    { id: 'indifference', label: "남에게 관심 없고 나만 챙기고 싶을 때", monsterKey: 'indifference' },
    { id: 'distraction', label: "말씀보다 유튜브/SNS가 더 재밌을 때", monsterKey: 'distraction' },
    { id: 'judgment', label: "저 사람은 왜 저러나 판단하고 비난할 때", monsterKey: 'judgment' },
    { id: 'arrogance', label: "내가 남보다 낫다고 느껴질 때", monsterKey: 'arrogance' },
];