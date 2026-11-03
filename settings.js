SF.set=(k,v)=>{const r={week:[0,1],daily:[10,600]}[k]||[1,180];if(typeof v=='number'&&!(v>=r[0]&&v<=r[1])){SF.toast('req',1);return SF.render()}SF.db.settings[k]=v;SF.save();SF.render()};
SF.exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(SF.db,null,1)],{type:'application/json'}));a.download='studyflow-backup.json';a.click()};
SF.imp=e=>{const f=e.target.files[0];if(!f)return;const R=new FileReader();R.onload=()=>{try{const j=JSON.parse(R.result);for(const k in D)if(Array.isArray(D[k])!=Array.isArray(j[k]))throw 0;for(const k in D)SF.db[k]=Array.isArray(D[k])?j[k]:{...D[k],...j[k]};SF.save();SF.toast('impOk',1);SF.render()}catch{SF.toast('impErr',1)}};R.readAsText(f)};
SF.pages.settings=r=>{const S=SF.db.settings,t=SF.t,
seg=(k,o)=>`<div class="seg">${o.map(v=>`<button class="${S[k]==v[0]?'on':''}" onclick="SF.set('${k}','${v[0]}')">${v[1]}</button>`).join('')}</div>`,
tg=k=>`<label class="tg"><input type="checkbox" ${S[k]?'checked':''} onchange="SF.set('${k}',this.checked?1:0)">${t('n'+k)}</label>`,
nm=k=>`<label>${t('p'+k)}<input type="number" value="${S[k]}" onchange="SF.set('${k}',+this.value)"></label>`;
r.innerHTML=`<div class="g2"><div class="card"><h3>${t('lang')}</h3><div class="seg">${[['vi','🇻🇳 Tiếng Việt'],['en','🇬🇧 English']].map(v=>`<button class="${SF.lang==v[0]?'on':''}" onclick="SF.setLang('${v[0]}')">${v[1]}</button>`).join('')}</div>
<h3>${t('look')}</h3>${seg('theme',[['light',t('light')],['dark',t('dark')]])}<h3>${t('notif')}</h3>${tg('notify')}${tg('alert')}${tg('sound')}</div>
<div class="card"><h3>${t('prefs')}</h3><label>${t('pname')}<input value="${SF.esc(S.name)}" onchange="SF.set('name',this.value.trim())"></label>${['focus','short','long','week','daily'].map(nm).join('')}</div>
<div class="card"><h3>${t('data')}</h3><div class="bar"><button onclick="SF.exp()">${SF.ico('download')}${t('exp')}</button><label class="pri" style="padding:8px 14px;border-radius:10px;cursor:pointer;flex-direction:row;margin:0">${SF.ico('upload')}${t('imp')}<input type="file" accept=".json" hidden onchange="SF.imp(event)"></label></div>
<div class="bar"><button class="pri danger" onclick="SF.ask(SF.t('clrAsk'),()=>{for(const k in D)if(k!='settings')SF.db[k]=[]})">${t('clr')}</button><button onclick="SF.ask(SF.t('rstAsk'),()=>{SF.db.settings={...D.settings}},'reset')">${t('rst')}</button></div></div>
<div class="card"><h3>${t('about')}</h3><b>StudyFlow</b><p>${t('slogan')}</p><small>${t('ver')}</small></div></div>`};
