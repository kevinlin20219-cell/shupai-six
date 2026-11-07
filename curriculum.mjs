import {generateAdvanced} from './advanced.mjs?v=advanced5';
export const units=[
 {id:'position',number:'01',title:'确定位置',subtitle:'坐标与方向，找到你的节奏',color:'mint',icon:'pin',page:1},
 {id:'multiply',number:'02',title:'分数乘法',subtitle:'约分、计算，拍子刚刚好',color:'peach',icon:'multiply',page:16},
 {id:'divide',number:'03',title:'分数除法',subtitle:'乘上倒数，解开新挑战',color:'purple',icon:'divide',page:32},
 {id:'negative',number:'实践',title:'生活中的负数',subtitle:'零上零下，认识相反的量',color:'blue',icon:'temp',page:44,activity:true},
 {id:'circle',number:'04',title:'圆',subtitle:'半径、周长、面积转起来',color:'yellow',icon:'circle',page:48},
 {id:'sports',number:'实践',title:'体育中的数学',subtitle:'跑一圈，发现赛道的秘密',color:'peach',icon:'flag',page:74,activity:true},
 {id:'percent',number:'05',title:'百分数',subtitle:'百分之一，也有满分精彩',color:'mint',icon:'percent',page:79},
 {id:'water',number:'实践',title:'水是生命之源',subtitle:'算一算，把每滴水都用好',color:'blue',icon:'drop',page:101,activity:true},
 {id:'review',number:'06',title:'复习与关联',subtitle:'连接所学，开启综合挑战',color:'purple',icon:'spark',page:106}
];
export const skills=[
 ['coordinates','position','用有序数对确定位置'],['direction','position','用方向确定位置'],['distance','position','方向与距离'],
 ['multiply-integer','multiply','一个数乘分数'],['multiply-fractions','multiply','分数乘分数'],['multiply-decimal','multiply','小数与分数相乘'],['multiply-mixed','multiply','混合运算与运算律'],['multiply-application','multiply','求一个数的几分之几'],
 ['reciprocal','divide','倒数的认识'],['divide-fractions','divide','分数除法计算'],['divide-application','divide','已知部分求整体'],
 ['negative-life','negative','用正负数表示相反的量'],['negative-zero','negative','认识负数与0'],
 ['radius-diameter','circle','圆的半径与直径'],['circle-length','circle','圆的周长'],['circle-area','circle','圆的面积'],['sector','circle','圆与扇形的认识'],
 ['track','sports','跑道与起跑线'],
 ['percent-convert','percent','百分数与分数、小数互化'],['percent-part','percent','求一个数的百分之几'],['percent-change','percent','增加与减少百分之几'],['percent-original','percent','已知百分之几求原数'],
 ['water-save','water','节约用水'],['water-data','water','分析用水量'],
 ['connections','review','乘除法的关联'],['pigeonhole','review','简单的鸽巢问题']
].map(([id,unit,title])=>({id,unit,title}));
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
export const fraction=(n,d)=>{const g=gcd(n,d);return d/g===1?String(n/g):`${n/g}/${d/g}`;};
export const F=(n,d)=>`<span class="fraction"><span>${n}</span><span>${d}</span></span>`;
const round=n=>Math.round(n*1000000)/1000000;
export function generate(skillId,rng=Math.random,difficulty='basic'){
 const skill=skills.find(s=>s.id===skillId); if(!skill)throw new Error('Unknown skill '+skillId);
 if(difficulty==='advanced')return generateAdvanced(skill,rng);
 const int=(a,b)=>a+Math.floor(rng()*(b-a+1)); const pick=a=>a[int(0,a.length-1)];
 const q={skill:skill.id,unit:skill.unit,title:skill.title}; let a,b,c,d,n,p,r;
 switch(skillId){
 case 'coordinates':
  a=int(1,5);b=int(1,4);q.prompt='图中星星的位置，用有序数对表示是？';q.diagram={type:'grid',x:a,y:b};q.answer=`(${a},${b})`;q.options=[q.answer,`(${b},${a===b?a+1:a})`,`(${a+1},${b})`,`(${a},${b+1})`];q.hint='先看第几列，再看第几行。';q.explanation=`星星在第${a}列、第${b}行，记作 (${a},${b})。`;break;
 case 'direction':
  a=pick(['北偏东','北偏西','南偏东','南偏西']);b=pick([20,30,40,60]);q.prompt=`以北为上。从${a.startsWith('北')?'北':'南'}向${a.endsWith('东')?'东':'西'}转${b}°，这个方向怎样描述？`;q.answer=`${a}${b}°`;q.options=[q.answer,`${a.startsWith('北')?'南':'北'}偏${a.endsWith('东')?'东':'西'}${b}°`,`${a.startsWith('北')?'北':'南'}偏${a.endsWith('东')?'西':'东'}${b}°`,`${a.endsWith('东')?'东':'西'}偏${a.startsWith('北')?'北':'南'}${b}°`];q.hint='先说从哪个正方向出发，再说向哪边偏转及角度。';q.explanation=`从${a.startsWith('北')?'北':'南'}向${a.endsWith('东')?'东':'西'}偏转${b}°，就是${q.answer}。`;break;
 case 'distance':
  a=pick([100,200,250,500]);b=int(2,6);q.prompt=`地图上每厘米表示${a}米。学校在广场正东方${b}厘米处，实际距离是多少米？`;q.answer=a*b;q.suffix='米';q.hint='实际距离 = 每厘米表示的距离 × 图上厘米数。';q.explanation=`${a} × ${b} = ${q.answer}（米），方向仍为正东。`;break;
 case 'multiply-integer':
  b=pick([2,3,4,5,6,8]);a=int(2,10)*b;c=int(1,b-1);q.prompt='算一算，填入得数。';q.math=`${a} <i>×</i> ${F(c,b)}`;q.answer=a*c/b;q.hint='整数与分母先约分，再乘分子。';q.explanation=`${a} ÷ ${b} × ${c} = ${q.answer}。`;break;
 case 'multiply-fractions':
  b=pick([2,3,4,5,6,8]);d=pick([2,3,4,5,6]);a=int(1,b-1);c=int(1,d-1);q.prompt='算一算，结果可以用分数填写。';q.math=`${F(a,b)} <i>×</i> ${F(c,d)}`;q.answer=fraction(a*c,b*d);q.hint='分子相乘，分母相乘；能约分时先约分。';q.explanation=`(${a} × ${c}) / (${b} × ${d}) = ${q.answer}。`;break;
 case 'multiply-decimal':
  a=pick([.4,.6,.8,1.2,1.5,2.4]);b=pick([2,3,4,5]);c=int(1,b-1);q.prompt='小数和分数，也能一起计算。';q.math=`${a} <i>×</i> ${F(c,b)}`;q.answer=fraction(Math.round(a*10)*c,10*b);q.hint='把小数化成分数，或者先用小数除以分母。';q.explanation=`${a} = ${Math.round(a*10)}/10，所以结果是 ${q.answer}。`;break;
 case 'multiply-mixed':
  b=pick([3,4,5,6,8]);a=int(1,b-1);c=int(2,9)*b;q.prompt='试试用运算律简便计算。';q.math=`${F(a,b)} <i>×</i> ${c} <i>＋</i> ${F(b-a,b)} <i>×</i> ${c}`;q.answer=c;q.hint='把相同的乘数提出来，看看两个分数的和。';q.explanation=`(${a}/${b} + ${b-a}/${b}) × ${c} = 1 × ${c} = ${c}。`;break;
 case 'multiply-application':
  b=pick([3,4,5,6,8]);a=int(5,12)*b;c=int(1,b-1);q.prompt=`图书角有${a}本书，故事书占其中的${c}/${b}。故事书有多少本？`;q.answer=a*c/b;q.suffix='本';q.hint='把图书总数看作单位“1”，用总数乘故事书占的分率。';q.explanation=`${a} × ${c}/${b} = ${q.answer}（本）。`;break;
 case 'reciprocal':
  q.mathKind='given';
  b=int(2,9);a=int(1,b-1);q.prompt='下面这个数的倒数是多少？';q.math=F(a,b);q.answer=fraction(b,a);q.hint='乘积是1的两个数互为倒数。交换分子与分母，再约分。';q.explanation=`${a}/${b} 的倒数是 ${q.answer}，它们相乘等于1。`;break;
 case 'divide-fractions':
  b=pick([2,3,4,5,6]);d=pick([2,3,4,5,6]);a=int(1,b-1);c=int(1,d-1);q.prompt='除以一个分数，想一想怎样转化。';q.math=`${F(a,b)} <i>÷</i> ${F(c,d)}`;q.answer=fraction(a*d,b*c);q.hint='除以一个不为0的数，等于乘这个数的倒数。';q.explanation=`${a}/${b} × ${d}/${c} = ${q.answer}。`;break;
 case 'divide-application':
  b=pick([3,4,5,6,8]);a=int(6,15)*b;c=int(1,b-1);n=a*c/b;q.prompt=`一条绳子的${c}/${b}长${n}米。这条绳子原来长多少米？`;q.answer=a;q.suffix='米';q.hint='已知部分量和对应分率，整体 = 部分量 ÷ 分率。';q.explanation=`${n} ÷ (${c}/${b}) = ${a}（米）。`;break;
 case 'negative-life':
  a=int(1,20);b=pick(['零下','低于海平面','支出']);q.prompt=b==='零下'?`气温是零下${a}℃，用带符号的数表示是多少？`:b==='低于海平面'?`规定海平面为0米。低于海平面${a}米，记作多少米？`:`规定收入为正。支出${a}元，记作多少元？`;q.answer=-a;q.suffix=b==='零下'?'℃':b==='支出'?'元':'米';q.hint='与规定的正方向意义相反的量，用负数表示。';q.explanation=`这里的量用负数表示，记作 −${a}${q.suffix}。`;break;
 case 'negative-zero':
  c=int(0,2);
  if(c===0){q.prompt='下面哪句话是正确的？';q.options=['0是正数','0是负数','0既不是正数，也不是负数','负数都大于0'];q.answer=q.options[2];q.hint='0是正数与负数的分界。';q.explanation='0既不是正数，也不是负数。它可以表示一个基准，而不表示“什么都没有”。';}
  else {a=int(1,15);b=int(1,12);d=int(1,9);q.options=c===1?[String(-a),String(b),'0',String(-a-d)]:[String(-a),String(-a-b),String(-a-b-d),'0'];const largest=int(0,1)===1;q.prompt=`下面四个数中，${largest?'最大':'最小'}的数是哪一个？`;q.answer=String((largest?Math.max:Math.min)(...q.options.map(Number)));q.hint='在数轴上，越靠右的数越大；所有负数都小于0。';q.explanation=`这些数按从小到大排列：${q.options.map(Number).sort((x,y)=>x-y).join(' < ')}，所以答案是 ${q.answer}。`;}
  break;
 case 'radius-diameter':
  a=int(1,15);q.prompt=`同一个圆的半径是${a}厘米，直径是多少厘米？`;q.diagram={type:'circle',r:a,label:'r'};q.answer=a*2;q.suffix='厘米';q.hint='同一个圆里，直径等于半径的2倍。';q.explanation=`d = 2r = 2 × ${a} = ${q.answer}（厘米）。`;break;
 case 'circle-length':
  r=int(1,15);q.prompt=`圆的半径是${r}厘米，周长是多少厘米？（π取3.14）`;q.diagram={type:'circle',r,label:'r'};q.answer=round(2*3.14*r);q.suffix='厘米';q.hint='周长 C = 2πr。注意给出的是半径。';q.explanation=`C = 2 × 3.14 × ${r} = ${q.answer}（厘米）。`;break;
 case 'circle-area':
  r=int(1,15);q.prompt=`圆的半径是${r}厘米，面积是多少平方厘米？（π取3.14）`;q.diagram={type:'circle',r,label:'r'};q.answer=round(3.14*r*r);q.suffix='平方厘米';q.hint='面积 S = πr²，先算半径的平方。';q.explanation=`S = 3.14 × ${r} × ${r} = ${q.answer}（平方厘米）。`;break;
 case 'sector':
  a=pick([2,3,4,5,6,8,9,10,12,15,18,20,24,30,36]);q.prompt=`一个圆平均分成${a}个扇形，每个扇形的圆心角是多少度？`;q.answer=360/a;q.suffix='°';q.hint='整个圆的圆心角是360°。平均分成几份，就除以几。';q.explanation=`360° ÷ ${a} = ${q.answer}°。`;break;
 case 'track':
  a=int(1,4);b=int(20,60);c=int(1,3);q.prompt=`内侧圆形跑道半径${b}米，外侧半径${b+a}米。各跑${c}圈，外侧比内侧多跑多少米？（π取3.14）`;q.answer=round(2*3.14*a*c);q.suffix='米';q.hint=`每圈周长差 = 2π × 半径差，再乘圈数${c}。`;q.explanation=`2 × 3.14 × (${b+a} − ${b}) × ${c} = ${q.answer}（米）。圆形跑道各跑一圈时，外圈的起跑点要相应前移才公平。`;break;
 case 'percent-convert':
  [a,b]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[7,8],[1,10],[3,10],[1,20],[3,20],[7,20],[9,20],[11,20],[13,20],[17,20],[19,20]]);q.prompt='把这个分数化成百分数。';q.math=F(a,b);q.answer=a*100/b;q.suffix='%';q.hint='先用分子除以分母，再把小数点向右移动两位并添上%。';q.explanation=`${a}/${b} = ${a/b} = ${q.answer}%。`;break;
 case 'percent-part':
  a=pick([80,120,160,200,240,300]);p=pick([10,15,20,25,30,40,50,75]);q.prompt=`学校有${a}名学生，其中${p}%参加合唱团。参加合唱团的有多少人？`;q.answer=a*p/100;q.suffix='人';q.hint='总人数 × 对应的百分率 = 部分人数。';q.explanation=`${a} × ${p}% = ${q.answer}（人）。`;break;
 case 'percent-change':
  a=pick([80,100,120,160,200]);p=pick([10,20,25,50]);b=pick([true,false]);q.prompt=`去年种了${a}棵树，今年比去年${b?'增加':'减少'}${p}%。今年种了多少棵？`;q.answer=a*(100+(b?p:-p))/100;q.suffix='棵';q.hint=`去年是单位“1”。今年占去年的 (1 ${b?'+':'−'} ${p}%)。`;q.explanation=`${a} × (1 ${b?'+':'−'} ${p}%) = ${q.answer}（棵）。`;break;
 case 'percent-original':
  a=pick([80,120,160,200,240]);p=pick([20,25,40,50,75]);q.prompt=`已读的${a*p/100}页占一本书的${p}%。这本书一共有多少页？`;q.answer=a;q.suffix='页';q.hint='求单位“1”，用已知部分量除以对应的百分率。';q.explanation=`${a*p/100} ÷ ${p}% = ${a}（页）。`;break;
 case 'water-save':
  a=pick([200,300,400,500,600]);p=pick([10,15,20,25,30]);q.prompt=`一户人家原来每天用水${a}升，节水后减少${p}%。现在每天用水多少升？`;q.answer=a*(100-p)/100;q.suffix='升';q.hint='现在用水量占原来的 (1 − 节水百分率)。';q.explanation=`${a} × (1 − ${p}%) = ${q.answer}（升）。这些是练习用的示例数据。`;break;
 case 'water-data':
  a=pick([100,200,300,400]);p=pick([10,20,25,50]);b=a*(100-p)/100;q.prompt=`用水记录：改造前每天${a}升，改造后每天${b}升。用水量减少了百分之几？`;q.answer=p;q.suffix='%';q.hint='减少的量 ÷ 改造前的量 × 100%。';q.explanation=`(${a} − ${b}) ÷ ${a} = ${p}%。百分率的比较基准是改造前。`;break;
 case 'connections':
  q.mathKind='equation';
  a=int(2,12);b=int(2,9);q.prompt='想一想乘法和除法的关系，填写方框里的数。';q.math=`□ <i>×</i> ${F(1,b)} <i>＝</i> ${a}`;q.answer=a*b;q.hint='未知的因数 = 积 ÷ 已知的因数。';q.explanation=`□ = ${a} ÷ (1/${b}) = ${a*b}。`;break;
 case 'pigeonhole':
  a=int(2,7);b=int(2,5);n=a*b+1;q.prompt=`把${n}支笔放进${a}个笔筒，总有一个笔筒至少放了多少支笔？`;q.answer=b+1;q.suffix='支';q.hint=`先尽量平均分：每筒放${b}支后，是否还有剩余？`;q.explanation=`${n} ÷ ${a} = ${b} …… 1。余下的1支还要放进去，所以至少有一个笔筒有${b+1}支。`;break;
 }
 if(q.options) q.options=[...new Set(q.options)].sort(()=>rng()-.5);
 q.id=skillId+':'+JSON.stringify([q.prompt,q.math,q.answer,q.diagram]);return q;
}
export function makeRound(scope='mixed',count=10,rng=Math.random,difficulty='basic'){
 const exact=skills.find(s=>s.id===scope); const available=exact?[exact]:skills.filter(s=>scope==='mixed'||s.unit===scope);
 if(!available.length) throw new Error('Unknown scope');
 let order=[...available].sort(()=>rng()-.5);
 if(scope==='mixed') {
   const unitOrder=[...units].sort(()=>rng()-.5);
   order=Array.from({length:count},(_,i)=>{const options=available.filter(s=>s.unit===unitOrder[i%unitOrder.length].id);return options[Math.floor(rng()*options.length)];});
 }
 const out=[];const seen=new Set();
 for(let i=0;i<count;i++) {
  let q;
  for(let retry=0;retry<1000;retry++){
   const candidate=retry>=25&&!exact?available[(i+retry)%available.length]:order[i%order.length];
   let fallbackSeed=((i+1)*2654435761+retry*1013904223)>>>0;
   const fallback=()=>{fallbackSeed=(Math.imul(fallbackSeed,1664525)+1013904223)>>>0;return fallbackSeed/4294967296;};
   q=generate(candidate.id,retry>=25?fallback:rng,difficulty);
   if(!seen.has(q.id))break;
  }
  if(seen.has(q.id))throw new Error('Not enough unique questions');
  out.push(q);seen.add(q.id);
 }
 return out;
}
