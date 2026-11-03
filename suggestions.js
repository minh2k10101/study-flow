SF.sug=()=>{const P=SF.db.tasks.filter(x=>!x.done);if(!P.length)return [SF.t('sgNone')];
const sc=x=>({high:3,med:2,low:1}[x.pri])*2-Math.round((new Date(x.due)-new Date(SF.day(0)))/864e5),S=[...P].sort((a,b)=>sc(b)-sc(a)).slice(0,3),o=P.filter(x=>SF.dl(x.due)[0]=='over'),
out=[SF.t('sgTop')+S.map(x=>x.title).join(', ')];if(o.length)out.push(SF.t('sgOver')+o.map(x=>x.title).join(', '));
out.push(SF.t('sgTime').replace('{n}',Math.min(S.reduce((a,x)=>a+(+x.est||0),0),SF.db.settings.daily)));return out};
