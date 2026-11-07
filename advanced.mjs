const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const rational=(n,d=1)=>{const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return d===1?String(n):`${n}/${d}`;};
const F=(n,d)=>`<span class="fraction"><span>${n}</span><span>${d}</span></span>`;
const decimal=(n,d=100)=>String(Math.round(n/d*1000000)/1000000);
export function generateAdvanced(skill,rng=Math.random){
 const int=(a,b)=>a+Math.floor(rng()*(b-a+1)),pick=a=>a[int(0,a.length-1)];
 const q={skill:skill.id,unit:skill.unit,title:skill.title,difficulty:'advanced'};
 let a,b,c,d,e,f,n,p,r,x,y;
 switch(skill.id){
 case 'coordinates':{
  x=int(1,4);y=int(1,4);a=int(2,5);b=int(2,4);c=int(1,a-1);d=int(1,b-1);const endX=x+a-c,endY=y+b-d;
  q.challenge='连续平移';q.prompt=`棋子原在(${x},${y})。先向右移${a}格、向上移${b}格，再向左移${c}格、向下移${d}格。现在的有序数对是？`;
  q.answer=`(${endX},${endY})`;q.options=[q.answer,`(${endX+c},${endY})`,`(${endX},${endY+d})`,`(${endX+c},${endY+d})`];
  q.hint='横向移动改变列，纵向移动改变行；分别计算两次移动的净变化。';q.explanation=`列：${x}+${a}−${c}=${endX}；行：${y}+${b}−${d}=${endY}。所以位置是${q.answer}。`;break;
 }
 case 'direction':{
  a=pick([20,25,30,35,55,60,65,70]);const horizontal=pick(['东','西']),vertical=pick(['北','南']);
  q.challenge='方向互换';q.prompt=`同一条射线的方向写成“${horizontal}偏${vertical}${a}°”，如果改从正${vertical}方向描述，应写成什么？`;
  q.answer=`${vertical}偏${horizontal}${90-a}°`;q.options=[q.answer,`${vertical}偏${horizontal}${a}°`,`${vertical}偏${horizontal}${180-a}°`,`${horizontal}偏${vertical}${90-a}°`];
  q.hint='相邻两个正方向夹角是90°，从另一端描述时两个偏角之和为90°。';q.explanation=`正${horizontal}和正${vertical}相差90°。新偏角=90°−${a}°=${90-a}°，所以是${q.answer}。`;break;
 }
 case 'distance':
  a=pick([100,200,250,500]);b=int(2,6);c=int(3,8);q.challenge='路线与比例';q.prompt=`图上每厘米表示${a}米。博物馆在学校西面${b}厘米，图书馆在学校东面${c}厘米。由学校先到博物馆，再到图书馆，共走多少米？`;
  q.answer=a*(2*b+c);q.suffix='米';q.hint='第二段要经过学校。先求两段图上路程之和，再换算实际距离。';q.explanation=`图上共走${b}+(${b}+${c})=${2*b+c}厘米。实际路程=${2*b+c}×${a}=${q.answer}米。`;break;
 case 'multiply-integer':
  b=pick([3,4,5,6]);d=pick([3,4,5]);n=b*d*int(4,12);a=int(1,b-1);c=int(1,d-1);q.challenge='连续求分率';q.prompt=`一个数是${n}。先求它的${a}/${b}，再求所得结果的${c}/${d}，最后得到多少？`;
  q.answer=rational(n*a*c,b*d);q.hint='第二个分率的单位“1”已经变了，要连续乘两个分率。';q.explanation=`先求${n}×${a}/${b}=${n*a/b}，再乘${c}/${d}。合并列式：${n}×${a}/${b}×${c}/${d}=${q.answer}。`;break;
 case 'multiply-fractions':
  b=pick([3,4,5,6,8]);d=pick([4,5,6,7,9]);f=pick([5,6,7,8]);a=int(1,b-1);c=int(1,d-1);e=int(1,f-1);q.challenge='先加后乘';q.prompt='先算括号，再乘分数。结果可以用分数或精确小数填写。';q.math=`(${F(a,b)} <i>＋</i> ${F(c,d)}) <i>×</i> ${F(e,f)}`;
  q.answer=rational((a*d+c*b)*e,b*d*f);q.hint='先通分求和，再与括号外的分数相乘；可以边计算边约分。';q.explanation=`括号内=(${a}×${d}+${c}×${b})/(${b}×${d})=${rational(a*d+c*b,b*d)}。再乘${e}/${f}，得到${q.answer}。`;break;
 case 'multiply-decimal':
  a=pick([4,6,8,12,15,24]);c=pick([3,4,5,6]);b=int(1,c-1);e=pick([4,5,6,8]);d=int(1,e-1);q.challenge='小数分数连算';q.prompt='把小数化成分数，再依次计算。';q.math=`${a/10} <i>×</i> ${F(b,c)} <i>÷</i> ${F(d,e)}`;
  q.answer=rational(a*b*e,10*c*d);q.hint='小数写成十分之几，除以分数转化成乘倒数，再统一约分。';q.explanation=`${a/10}=${a}/10，原式=${a}/10×${b}/${c}×${e}/${d}=${q.answer}。`;break;
 case 'multiply-mixed':
  b=pick([3,4,5,6,8]);a=int(1,b-1);d=int(2,5);e=d+int(1,4);c=d*int(3,12);q.challenge='运算律与除法';q.prompt='观察相同的乘数，用运算律简便计算。';q.math=`(${F(a,b)} <i>×</i> ${c} <i>＋</i> ${F(b-a,b)} <i>×</i> ${c}) <i>÷</i> ${F(d,e)}`;
  q.answer=rational(c*e,d);q.hint='先把相同乘数提出来，两个分数的和为1；最后再处理除法。';q.explanation=`括号内=(${a}/${b}+${b-a}/${b})×${c}=1×${c}=${c}。再算${c}÷(${d}/${e})=${c}×${e}/${d}=${q.answer}。`;break;
 case 'multiply-application':
  b=pick([3,4,5,6]);d=pick([3,4,5]);n=b*d*int(4,12);a=int(1,b-1);c=int(1,d-1);q.challenge='剩余量的几分之几';q.prompt=`一箱水果有${n}千克，第一天卖出总量的${a}/${b}，第二天卖出剩余水果的${c}/${d}。两天后还剩多少千克？`;
  q.answer=rational(n*(b-a)*(d-c),b*d);q.suffix='千克';q.hint='两天的单位“1”不同。第一天剩总量的1−分率；第二天再对剩余量求“剩下的几分之几”。';q.explanation=`第一天剩${n}×(1−${a}/${b})=${n*(b-a)/b}千克。两天后剩${n*(b-a)/b}×(1−${c}/${d})=${q.answer}千克。`;break;
 case 'reciprocal':
  b=pick([3,4,5,6,8]);a=int(1,b-1);d=pick([4,5,6,7,9]);c=int(1,d-1);q.challenge='先求原数再求倒数';q.prompt=`一个数的${a}/${b}是${c}/${d}，这个数的倒数是多少？`;
  q.answer=rational(a*d,b*c);q.hint='先用已知部分量除以对应分率求原数，再求原数的倒数。';q.explanation=`原数=${c}/${d}÷(${a}/${b})=${rational(b*c,a*d)}，因此倒数是${q.answer}。`;break;
 case 'divide-fractions':
  b=pick([3,4,5,6]);d=pick([4,5,6,7]);f=pick([5,6,7,8]);a=int(1,b-1);c=int(1,d-1);e=int(1,f-1);q.challenge='连续除法';q.prompt='连续除以两个分数，注意运算顺序。';q.math=`${F(a,b)} <i>÷</i> ${F(c,d)} <i>÷</i> ${F(e,f)}`;
  q.answer=rational(a*d*f,b*c*e);q.hint='同一级运算从左到右；两个除数都要分别转化成倒数。';q.explanation=`原式=${a}/${b}×${d}/${c}×${f}/${e}=${q.answer}。不能先把后两个分数相除。`;break;
 case 'divide-application':
  b=pick([3,4,5,6,8]);a=int(1,b-1);n=b*int(10,30);r=n*(b-a)/b;c=int(1,Math.floor(r/2));q.challenge='还原两次变化';q.prompt=`一条绳子先用去全长的${a}/${b}，又用去${c}米，最后剩${r-c}米。绳子原来长多少米？`;
  q.answer=n;q.suffix='米';q.hint='先加回第二次用去的米数，再除以第一次剩余部分对应的分率。';q.explanation=`第一次剩${c}+${r-c}=${r}米，占全长的1−${a}/${b}=${b-a}/${b}。原长=${r}÷(${b-a}/${b})=${n}米。`;break;
 case 'negative-life':
  a=int(5,20);b=int(8,25);c=int(4,18);q.challenge='温度连续变化';q.prompt=`早晨气温−${a}℃，中午上升${b}℃，夜间又下降${c}℃。夜间气温是多少摄氏度？`;
  q.answer=-a+b-c;q.suffix='℃';q.hint='以早晨温度为起点，上升加、下降减，注意跨过0℃。';q.explanation=`夜间气温=−${a}+${b}−${c}=${q.answer}℃。温度变化量不能直接当成最终温度。`;break;
 case 'negative-zero':
  a=int(3,15);b=int(2,12);c=int(1,10);n=-a+b-c;q.challenge='数轴两次移动';q.prompt=`数轴上A表示−${a}，B在A右侧${b}个单位，C又在B左侧${c}个单位。C表示哪个数？`;
  q.answer=String(n);q.options=[String(n),String(n+2*c),String(n-2*b),String(n+2*c+2*a)];q.hint='右移增加，左移减少；从A开始依次计算位置。';q.explanation=`B表示−${a}+${b}=${-a+b}，C表示${-a+b}−${c}=${n}。`;break;
 case 'radius-diameter':
  r=int(3,30);n=628*r;q.challenge='由周长反求面积';q.prompt=`一个圆的周长是${decimal(n)}厘米，它的面积是多少平方厘米？（π取3.14）`;
  q.answer=rational(314*r*r,100);q.suffix='平方厘米';q.hint='先用周长÷(2π)求半径，再代入面积公式。';q.explanation=`半径=${decimal(n)}÷(2×3.14)=${r}厘米。面积=3.14×${r}×${r}=${decimal(314*r*r)}平方厘米。`;break;
 case 'circle-length':
  d=int(6,24);a=int(1,5);q.challenge='花坛外沿周长';q.prompt=`圆形花坛直径${d}米，四周铺一条宽${a}米的小路。小路外沿的周长是多少米？（π取3.14）`;
  q.answer=rational(314*(d+2*a),100);q.suffix='米';q.hint='小路在直径两端各增加一个路宽，外沿直径=原直径+2×路宽。';q.explanation=`外沿直径=${d}+2×${a}=${d+2*a}米。周长=3.14×${d+2*a}=${decimal(314*(d+2*a))}米。`;break;
 case 'circle-area':
  a=int(2,10);r=a+int(1,6);q.challenge='圆环面积';q.prompt=`一个圆环的外圆半径是${r}厘米，内圆半径是${a}厘米。圆环面积是多少平方厘米？（π取3.14）`;
  q.answer=rational(314*(r*r-a*a),100);q.suffix='平方厘米';q.hint='用外圆面积减去内圆面积；先分别平方，不能把半径差直接平方。';q.explanation=`圆环面积=3.14×(${r}²−${a}²)=3.14×(${r*r}−${a*a})=${decimal(314*(r*r-a*a))}平方厘米。`;break;
 case 'sector':
  r=6*int(1,4);a=pick([60,90,120,150,180,240,270]);q.challenge='扇形所占分率';q.prompt=`扇形的半径是${r}厘米，圆心角${a}°。它的面积是多少平方厘米？（π取3.14）`;
  q.answer=rational(314*r*r*a,36000);q.suffix='平方厘米';q.hint='扇形占整圆的“圆心角÷360°”，先求整圆面积，再乘这个分率。';q.explanation=`整圆面积=3.14×${r}²=${decimal(314*r*r)}。扇形占${a}/360=${rational(a,360)}，面积=${decimal(314*r*r)}×${a}/360=${decimal(314*r*r*a,36000)}平方厘米。`;break;
 case 'track':
  a=int(40,100);r=int(10,30);b=int(1,4);c=int(2,5);q.challenge='直道与弯道综合';q.prompt=`跑道每圈有两段各长${a}米的直道，两段弯道合成一个圆。内道弯道半径${r}米，外道半径多${b}米。沿外道跑${c}圈，共多少米？（π取3.14）`;
  q.answer=rational((200*a+628*(r+b))*c,100);q.suffix='米';q.hint='先求外道半径。每圈路程=两段直道+一个整圆的周长，再乘圈数。';q.explanation=`外道半径=${r}+${b}=${r+b}米。每圈=2×${a}+2×3.14×${r+b}=${decimal(200*a+628*(r+b))}米。${c}圈共${decimal((200*a+628*(r+b))*c)}米。`;break;
 case 'percent-convert':
  b=pick([10,20,25,50]);a=int(2,b-1);c=int(1,Math.min(2*a-1,2*(b-a)));q.challenge='分率差化百分数';q.prompt=`同一桶水，甲用了全桶的${a}/${b}，乙用了全桶的${c}/${2*b}。甲比乙多用的水占全桶的百分之几？`;
  q.answer=rational((2*a-c)*100,2*b);q.suffix='%';q.hint='比较基准是全桶，先通分作差，再把分数化成百分数。';q.explanation=`甲比乙多用${a}/${b}−${c}/${2*b}=${rational(2*a-c,2*b)}。占全桶的${decimal((2*a-c)*100,2*b)}%。`;break;
 case 'percent-part':
  n=pick([200,400,600]);p=pick([20,30,40,50,60,70,80]);a=pick([25,40,50,60,75]);b=pick([20,30,40,50,60,70,80]);q.challenge='分组百分率';q.prompt=`学校有${n}名学生，男生占${p}%。男生的${a}%、女生的${b}%参加社团，一共有多少人参加？`;
  q.answer=rational(n*(p*a+(100-p)*b),10000);q.suffix='人';q.hint='男生和女生人数分别是两组百分率的单位“1”，应分别求人数再相加。';q.explanation=`男生${n*p/100}人，女生${n*(100-p)/100}人。参加人数=${n*p/100}×${a}%+${n*(100-p)/100}×${b}%=${q.answer}人。`;break;
 case 'percent-change':
  n=pick([100,200,300,400,500,800]);p=pick([10,15,20,25,30]);a=pick([10,15,20,25,30]);q.challenge='连续涨降';q.prompt=`一件商品原价${n}元，先涨价${p}%，再按涨价后的价格降价${a}%。现在售价是多少元？`;
  q.answer=rational(n*(100+p)*(100-a),10000);q.suffix='元';q.hint='降价的基准已经是涨价后的价格，不能把两个百分率直接相减。';q.explanation=`涨价后=${n}×(1+${p}%)=${n*(100+p)/100}元。现价=${n*(100+p)/100}×(1−${a}%)=${decimal(n*(100+p)*(100-a),10000)}元。`;break;
 case 'percent-original':
  n=pick([100,200,300,400,500,800]);p=pick([60,70,75,80,85,90]);a=int(1,10)*5;b=n*p/100-a;q.challenge='优惠后逆推原价';q.prompt=`一件商品按原价的${p}%出售，再减${a}元，实际支付${b}元。商品原价是多少元？`;
  q.answer=n;q.suffix='元';q.hint='先把最后减去的钱加回来，得到原价对应的百分之几，再除以百分率。';q.explanation=`按原价${p}%的价格=${b}+${a}=${b+a}元。原价=${b+a}÷${p}%=${n}元。`;break;
 case 'water-save':
  n=pick([200,300,400,500,600,800]);p=pick([10,15,20,25,30,40]);a=int(1,3)*10;d=int(7,30);q.challenge='节水与循环利用';q.prompt=`原来每天用水${n}升。改造后总用水需求减少${p}%，每天还用${a}升回收水替代自来水。${d}天共需自来水多少升？`;
  q.answer=rational((n*(100-p)-100*a)*d,100);q.suffix='升';q.hint='先求改造后的每天总需求，再减回收水，最后乘天数。';q.explanation=`每天总需求=${n}×(1−${p}%)=${n*(100-p)/100}升。每天自来水=${n*(100-p)/100}−${a}=${n*(100-p)/100-a}升，${d}天共${q.answer}升。`;break;
 case 'water-data':
  n=pick([400,600,800,1000]);p=pick([20,25,30,40]);a=pick([5,10,15,20]);b=n*(100-p)/100;q.challenge='变化基准连续转换';q.prompt=`上月用水${n}升，本月用水${b}升，下月计划比本月再节约${a}%。下月计划用水比上月减少百分之几？`;
  q.answer=rational(10000-(100-p)*(100-a),100);q.suffix='%';q.hint='先算下月计划量，再与上月比较。两个“节约百分率”的基准不同。';q.explanation=`下月计划=${b}×(1−${a}%)=${decimal(b*(100-a))}升。比上月减少(${n}−${decimal(b*(100-a))})÷${n}×100%=${decimal(10000-(100-p)*(100-a))}%。`;break;
 case 'connections':
  b=pick([3,4,5,6,8]);a=int(1,b-1);x=b*int(3,12);c=int(2,15);d=int(2,6);e=x*a/b+c;q.challenge='逆向解方框';q.mathKind='equation';q.prompt='按运算的相反顺序，求方框中的数。';q.math=`(□ <i>×</i> ${F(a,b)} <i>＋</i> ${c}) <i>÷</i> ${d} <i>＝</i> ${F(e,d)}`;
  q.answer=x;q.hint='先两边乘除数，再减去加数，最后除以已知分数。';q.explanation=`先乘${d}得到${e}；再减${c}得到${e-c}；所以□=${e-c}÷(${a}/${b})=${x}。`;break;
 case 'pigeonhole':
  a=int(3,8);b=int(1,4);c=b+int(2,6);q.challenge='最不利情况反推';q.prompt=`${a}个笔筒原来各有${b}支笔。至少再放入多少支笔，才能保证无论怎样放，总有一个笔筒达到${c}支？`;
  q.answer=a*(c-1-b)+1;q.suffix='支';q.hint='先想怎样放还能让每个笔筒最多只有目标数减1支，然后再多放1支。';q.explanation=`每筒最多再放${c}−1−${b}=${c-1-b}支而不达到目标。${a}筒共可再放${a*(c-1-b)}支，再多1支就一定达到${c}支，所以至少${q.answer}支。`;break;
 default:throw new Error('No advanced template: '+skill.id);
 }
 if(q.options)for(let i=q.options.length-1;i>0;i--){const j=int(0,i);[q.options[i],q.options[j]]=[q.options[j],q.options[i]];}
 q.id='advanced:'+skill.id+':'+JSON.stringify([q.prompt,q.math,q.answer]);return q;
}
