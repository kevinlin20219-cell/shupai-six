import {advancedScene} from './playful-ui.mjs?v=polish8b';
export const unitChallenges={
 position:['连续平移','方向互换','多段路线与比例'],
 multiply:['先加后乘','运算律与连算','剩余量的几分之几'],
 divide:['先求原数再求倒数','连续除法','两次变化还原'],
 negative:['温度连续变化','数轴多次移动'],
 circle:['由周长反求面积','圆环面积','扇形所占分率'],
 sports:['直道与弯道综合','外道距离与圈数'],
 percent:['分组百分率','连续涨降','优惠后逆推原价'],
 water:['节水与循环利用','变化基准连续转换'],
 review:['逆向解方框','最不利情况反推']
};
export function advancedContents(units,skills,record,icon,mascot){
 const progress=Object.values(record.advancedSkills||{}),solved=progress.reduce((n,s)=>n+s.independent+s.assisted,0),lit=progress.filter(s=>s.independent>=3).length;
 return `<main class="home-main advanced-main"><section class="advanced-hero"><span class="eyebrow">${icon('spark',17)} 人教版六上 · 进阶挑战</span><h1>把思考，再推进一拍<span>✦</span></h1><p>先找数量关系，再一步步求解。<br>分数连算、连续百分率、圆环与跑道，等你来挑战。</p><div class="advanced-badges"><span>26 个进阶知识点</span><span>${units.length} 个单元全覆盖</span><span>可以随时看提示</span></div><button class="button advanced-button" data-action="start" data-scope="mixed" data-difficulty="advanced">开始进阶混合练习 ${icon('play',20)}</button><small>每轮 ${record.settings.count} 题 · 无需抢答 · 认真想，比做得快更重要</small>${advancedScene(mascot)}</section><div class="advanced-progress"><span><b>${solved}</b> 道进阶题已完成</span><span><b>${lit} / ${skills.length}</b> 进阶知识点已点亮</span></div><section class="units-section advanced-units"><div class="section-heading"><div><span class="section-kicker">CHOOSE YOUR CHALLENGE</span><h2>选一章，试试更深的思考</h2></div></div><div class="unit-grid">${units.map(u=>{const ss=skills.filter(s=>s.unit===u.id),done=ss.filter(s=>(record.advancedSkills?.[s.id]?.independent||0)>=3).length;return `<article class="unit-card advanced-unit ${u.color}"><div class="unit-card-top"><span class="unit-icon">${icon(u.icon,25)}</span><span class="unit-number">${u.activity?'综合实践':'CHAPTER '+u.number}</span><span class="advanced-tag">进阶</span></div><h3>${u.title}</h3><ul class="challenge-list">${unitChallenges[u.id].map(t=>`<li>${t}</li>`).join('')}</ul><div class="unit-card-foot"><span>${done} / ${ss.length} 进阶知识点已点亮</span></div><button class="button advanced-button full" data-action="start" data-scope="${u.id}" data-difficulty="advanced" aria-label="${u.title}·进阶练习">开始本章进阶 ${icon('arrow',17)}</button></article>`;}).join('')}</div></section><p class="advanced-note">进阶与基础的掌握情况分别记录。提示或重试后完成会记为辅助完成，错题仍可在“我的记录”中继续复习。</p></main>`;
}
