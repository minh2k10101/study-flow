const $=s=>document.querySelector(s);
SF.esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
SF.ico=n=>`<i data-lucide="${n}"></i>`;
const P=[['dashboard','layout-dashboard'],['tasks','list-checks'],['timetable','calendar-days'],['focus','timer'],['analytics','chart-column'],['goals','target'],['settings','settings']];
SF.render=()=>{const p=P.some(x=>x[0]==location.hash.slice(1))?location.hash.slice(1):'dashboard';
document.documentElement.dataset.theme=SF.db.settings.theme;SF.charts.forEach(c=>c.destroy());SF.charts=[];
$('#nav').innerHTML=P.map(x=>`<a href="#${x[0]}" class="${x[0]==p?'on':''}">${SF.ico(x[1])}<span>${SF.t(x[0])}</span></a>`).join('');
$('#title').textContent=SF.t(p);$('#langSel').value=SF.lang;SF.pages[p]($('#view'));document.body.classList.remove('open');window.lucide&&lucide.createIcons()};
SF.modal=(title,fields,v,ok)=>{const m=$('#modal');m.hidden=0;
m.innerHTML=`<form class="box"><h3>${title}</h3>${fields.map(f=>`<label>${SF.t(f.k)}${f.o?`<select name="${f.k}">${f.o.map(o=>`<option value="${o[0]}" ${o[0]==v[f.k]?'selected':''}>${o[1]}</option>`).join('')}</select>`:f.x?`<textarea name="${f.k}">${SF.esc(v[f.k])}</textarea>`:`<input name="${f.k}" type="${f.y||'text'}" value="${SF.esc(v[f.k])}">`}</label>`).join('')}<div class="row"><button type="button" id="mx">${SF.t('cancel')}</button><button class="pri">${SF.t('save')}</button></div></form>`;
$('#mx').onclick=()=>m.hidden=1;
m.firstChild.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));for(const f of fields)if(f.r&&!String(d[f.k]).trim())return SF.toast('req',1);
const bad=ok(d);if(typeof bad=='string')return SF.toast(bad,1);m.hidden=1;SF.save();SF.toast('ok');SF.render()}};
SF.ask=(msg,fn,lbl='del')=>{const m=$('#modal');m.hidden=0;m.innerHTML=`<div class="box"><p>${msg}</p><div class="row"><button id="mx">${SF.t('cancel')}</button><button class="pri danger" id="my">${SF.t(lbl)}</button></div></div>`;
$('#mx').onclick=()=>m.hidden=1;$('#my').onclick=()=>{m.hidden=1;fn();SF.save();SF.render()}};
SF.toast=(k,force)=>{if(!force&&!SF.db.settings.notify)return;const e=document.createElement('div');e.className='toast';e.textContent=SF.t(k);$('#toasts').append(e);setTimeout(()=>e.remove(),2800)};
SF.pages.dashboard=r=>{const T=SF.db.tasks,d=T.filter(x=>x.done).length,td=SF.day(0),n=SF.db.settings.name,pc=T.length?Math.round(d/T.length*100):0,
st=(k,v)=>`<div class="card st"><small>${SF.t(k)}</small><b>${v}</b></div>`,soon=T.filter(x=>!x.done&&['today','soon'].includes(SF.dl(x.due)[0])).length;
r.innerHTML=`<div class="bar"><div class="gr"><h2>${SF.t('hi')}${n?', '+SF.esc(n):''}!</h2><small>${SF.fmt(td)}</small></div><button class="pri" onclick="SF.taskForm()">${SF.ico('plus')}${SF.t('add')}</button></div>
<div class="g4">${st('total',T.length)}${st('done',d)}${st('pending',T.length-d)}${st('soon',soon)}</div><div class="card" style="margin-top:16px"><h3>${SF.t('progress')}: ${pc}%</h3><div class="pb"><i style="width:${pc}%"></i></div></div>
<div class="g2"><div class="card"><h3>${SF.t('week')}</h3><div class="cv"><canvas id="cw"></canvas></div></div><div class="card"><h3>${SF.t('tips')}</h3><ul>${SF.sug().map(s=>`<li>${SF.esc(s)}</li>`).join('')}</ul></div></div>
<div class="card"><h3>${SF.t('todayT')}</h3>${T.filter(x=>x.due==td).map(SF.row).join('')||`<p class="mt">${SF.t('empty')}</p>`}</div>`;
SF.mk('cw','bar',SF.wk(),SF.last7().map(x=>T.filter(t=>t.doneAt==x).length),SF.t('done'))};
SF.load();
$('#langSel').onchange=e=>SF.setLang(e.target.value);
$('#themeBtn').onclick=()=>{const s=SF.db.settings;s.theme=s.theme=='dark'?'light':'dark';SF.save();SF.render()};
$('#collapse').onclick=()=>document.body.classList.toggle('mini');
$('#menu').onclick=()=>document.body.classList.toggle('open');
addEventListener('hashchange',SF.render);SF.render();
const od=SF.db.tasks.filter(x=>!x.done&&['over','today'].includes(SF.dl(x.due)[0])).length;
if(od&&SF.db.settings.alert)SF.toast(SF.t('alertMsg').replace('{n}',od));
