const SF={pages:{},db:{},charts:[],lang:localStorage.getItem('studyflow_language')=='en'?'en':'vi',f:{q:'',sub:'',st:'',pri:''}};
const D={tasks:[],classes:[],goals:[],sessions:[],settings:{theme:'light',notify:1,alert:1,sound:1,focus:25,short:5,long:15,week:1,daily:120,name:''}};
SF.day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toLocaleDateString('sv')};
SF.save=()=>{try{for(const k in SF.db)localStorage.setItem('studyflow_'+k,JSON.stringify(SF.db[k]))}catch{SF.toast('err',1)}};
SF.load=()=>{for(const k in D){let v;try{v=JSON.parse(localStorage.getItem('studyflow_'+k))}catch{}
SF.db[k]=Array.isArray(D[k])?(Array.isArray(v)?v:[]):{...D[k],...(v&&typeof v=='object'&&!Array.isArray(v)?v:{})}}
if(!localStorage.getItem('studyflow_seeded')){SF.db.tasks=[{id:1,title:'Bài tập Toán chương 3',sub:'math',desc:'',due:SF.day(1),est:60,pri:'high',done:0},{id:2,title:'Đọc Ngữ văn',sub:'lit',desc:'',due:SF.day(0),est:30,pri:'med',done:0},{id:3,title:'Từ vựng Tiếng Anh',sub:'eng',desc:'',due:SF.day(4),est:20,pri:'low',done:0}];SF.save();localStorage.setItem('studyflow_seeded',1)}};
