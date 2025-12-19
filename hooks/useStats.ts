// hooks/useStats.ts
import { useMemo } from 'react';
import { BattleLog } from '../app/data';

export const useStats = (logs: BattleLog[]) => {

    // 1. 요일별
    const weeklyStats = useMemo(() => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const stats = days.map(day => ({ label: day, wins: 0, total: 0 }));
        logs.forEach(log => {
            const dayIdx = new Date(log.id).getDay();
            stats[dayIdx].total++;
            if (log.result === 'WIN') stats[dayIdx].wins++;
        });
        return stats.map(s => ({ label: s.label, rate: s.total === 0 ? 0 : Math.round((s.wins / s.total) * 100), hasData: s.total > 0 }));
    }, [logs]);

    // 2. 일별 (최근 7일)
    const dailyStats = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d;
        }).map(date => {
            const dateStr = date.toDateString();
            let wins = 0, total = 0;
            logs.forEach(log => { if (new Date(log.id).toDateString() === dateStr) { total++; if (log.result === 'WIN') wins++; } });
            return { label: `${date.getMonth() + 1}/${date.getDate()}`, rate: total === 0 ? 0 : Math.round((wins / total) * 100), hasData: total > 0 };
        });
    }, [logs]);

    // 3. 월별
    const monthlyStats = useMemo(() => {
        const stats = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, wins: 0, total: 0 }));
        logs.forEach(log => { const m = new Date(log.id).getMonth(); stats[m].total++; if (log.result === 'WIN') stats[m].wins++; });
        return stats.map(s => ({ label: `${s.month}월`, rate: s.total === 0 ? 0 : Math.round((s.wins / s.total) * 100), hasData: s.total > 0 }));
    }, [logs]);

    // 4. 연도별
    const yearlyStats = useMemo(() => {
        const map = new Map<number, { w: number, t: number }>();
        logs.forEach(log => { const y = new Date(log.id).getFullYear(); if (!map.has(y)) map.set(y, { w: 0, t: 0 }); const d = map.get(y)!; d.t++; if (log.result === 'WIN') d.w++; });
        const years = Array.from(map.keys()).sort((a, b) => a - b);
        if (years.length === 0) years.push(new Date().getFullYear());
        return years.map(y => { const d = map.get(y) || { w: 0, t: 0 }; return { label: `${y}년`, rate: d.t === 0 ? 0 : Math.round((d.w / d.t) * 100), hasData: d.t > 0 }; });
    }, [logs]);

    // 5. 몬스터별 승률
    const monsterWinRates = useMemo(() => {
        const map = new Map<string, { wins: number, total: number, emoji: string }>();
        logs.forEach(log => {
            if (!map.has(log.monsterName)) map.set(log.monsterName, { wins: 0, total: 0, emoji: log.monsterEmoji });
            const data = map.get(log.monsterName)!;
            data.total++;
            if (log.result === 'WIN') data.wins++;
        });
        return Array.from(map.entries()).map(([name, data]) => ({
            name, emoji: data.emoji, rate: data.total === 0 ? 0 : Math.round((data.wins / data.total) * 100), count: data.total
        })).sort((a, b) => b.rate - a.rate || b.count - a.count);
    }, [logs]);

    // 6. TOP 3 말씀
    const topSkills = useMemo(() => {
        const map = new Map<string, number>();
        logs.forEach(log => { if (log.result === 'WIN' && log.skillName) map.set(log.skillName, (map.get(log.skillName) || 0) + 1); });
        return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, count]) => ({ name, count }));
    }, [logs]);

    // 7. 최다 빈출 고난
    const frequentHardships = useMemo(() => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const getTop = (filtered: BattleLog[]) => {
            if (filtered.length === 0) return { name: '-', emoji: '❓', count: 0 };
            const map = new Map<string, { count: number, emoji: string }>();
            filtered.forEach(l => { const c = map.get(l.monsterName) || { count: 0, emoji: l.monsterEmoji }; map.set(l.monsterName, { count: c.count + 1, emoji: l.monsterEmoji }); });
            const sorted = Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);
            return { name: sorted[0][0], emoji: sorted[0][1].emoji, count: sorted[0][1].count };
        };
        return {
            week: getTop(logs.filter(l => new Date(l.id) >= oneWeekAgo)),
            month: getTop(logs.filter(l => { const d = new Date(l.id); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); })),
            year: getTop(logs.filter(l => new Date(l.id).getFullYear() === now.getFullYear())),
        };
    }, [logs]);

    // 요약 정보
    const totalBattles = logs.length;
    const winRate = totalBattles > 0 ? Math.round((logs.filter(l => l.result === 'WIN').length / totalBattles) * 100) : 0;

    return { weeklyStats, dailyStats, monthlyStats, yearlyStats, monsterWinRates, topSkills, frequentHardships, totalBattles, winRate };
};