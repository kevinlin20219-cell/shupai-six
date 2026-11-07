import {makeRecord,isCorrect} from './engine.mjs?v=themes13';
import {skills} from './curriculum.mjs?v=polish8b';
import {restoreRewards} from './rewards.mjs?v=polish8b';
import {cleanNotes,restoreDailySummaries} from './calendar.mjs';
const KEY='shupai-six-v1';
export function restoreRecord(raw){
 const data=JSON.parse(raw);
 if(!data||data.version!==1||!data.skills||typeof data.skills!=='object'||Array.isArray(data.skills)||!Array.isArray(data.review)||!Array.isArray(data.rounds)||!data.days||typeof data.days!=='object'||Array.isArray(data.days))throw new Error('record');
 if(!Object.values(data.skills).every(s=>s&&['independent','assisted','errors'].every(k=>Number.isFinite(s[k])&&s[k]>=0)))throw new Error('skills');
 data.advancedSkills=data.advancedSkills&&typeof data.advancedSkills==='object'&&!Array.isArray(data.advancedSkills)?Object.fromEntries(Object.entries(data.advancedSkills).filter(([id,s])=>skills.some(k=>k.id===id)&&s&&['independent','assisted','errors'].every(k=>Number.isFinite(s[k])&&s[k]>=0))):{};
 data.days=Object.fromEntries(Object.entries(data.days).filter(([k,v])=>/^\d{4}-\d{2}-\d{2}$/.test(k)&&Number.isFinite(v)&&v>=0));
 data.review=data.review.filter(q=>{
  if(q?.difficulty!==undefined&&!['basic','advanced'].includes(q.difficulty))return false;
  if(!q||typeof q.id!=='string'||!skills.some(s=>s.id===q.skill&&s.unit===q.unit)||typeof q.prompt!=='string'||typeof q.hint!=='string'||typeof q.explanation!=='string'||(q.math!==undefined&&typeof q.math!=='string')||(q.suffix!==undefined&&typeof q.suffix!=='string'))return false;
  if(q.options!==undefined&&(!Array.isArray(q.options)||q.options.length<2||q.options.length>4||!q.options.every(o=>typeof o==='string'||Number.isFinite(o))||!q.options.map(String).includes(String(q.answer))))return false;
  if(q.diagram&&!(q.diagram.type==='circle'&&Number.isFinite(q.diagram.r)&&q.diagram.r>0||q.diagram.type==='grid'&&Number.isInteger(q.diagram.x)&&q.diagram.x>=1&&q.diagram.x<=5&&Number.isInteger(q.diagram.y)&&q.diagram.y>=1&&q.diagram.y<=4))return false;
  return isCorrect(q,String(q.answer));
 }).slice(-80);
 data.rounds=data.rounds.filter(r=>r&&Number.isFinite(r.total)&&Number.isFinite(r.independent)&&Number.isFinite(r.assisted)&&Number.isFinite(r.time)&&typeof r.date==='string');
 data.dailySummaries=restoreDailySummaries(data.dailySummaries,data.rounds);data.rounds=data.rounds.slice(-100);
 data.notes=cleanNotes(data.notes);data.rewards=restoreRewards(data.rewards,data.rounds);const s=data.settings||{};data.settings={theme:s.theme==='light'?'light':'festival',audioVersion:2,sound:typeof s.sound==='boolean'?s.sound:true,motion:typeof s.motion==='boolean'?s.motion:!(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches),autoNext:typeof s.autoNext==='boolean'?s.autoNext:true,volume:Number.isFinite(s.volume)?(s.audioVersion===2||s.volume===0?Math.max(0,Math.min(1,s.volume)):Math.max(.85,Math.min(1,s.volume))):.85,count:[5,10,15].includes(s.count)?s.count:10};return data;
}
export function loadRecord(){try{const raw=localStorage.getItem(KEY);return {record:raw?restoreRecord(raw):makeRecord()};}catch{return {record:makeRecord(),recovered:true};}}
export function saveRecord(record){try{localStorage.setItem(KEY,JSON.stringify(record));return true;}catch{return false;}}
