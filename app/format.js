export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function money(n){return '$'+Number(n||0).toLocaleString('en-US',{minimumFractionDigits:Number(n||0)%1?2:0,maximumFractionDigits:2})}
export function timeLeft(iso){const d=new Date(iso).getTime()-Date.now(); if(!Number.isFinite(d)||d<=0)return {label:'Ended',ended:true}; const h=Math.floor(d/36e5), days=Math.floor(h/24); return {label:days?`${days}d ${h%24}h left`:`${h}h ${Math.floor(d/6e4)%60}m left`,ended:false}}
export const dateFmt=iso=>new Date(iso).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});
export const pct=m=>m==null?'—':(Number(m)/10000).toFixed(2)+'%'; export const bytesFmt=n=>n==null?'—':(n<1024?`${n} B`:n<1048576?`${Math.round(n/1024)} KB`:`${(n/1048576).toFixed(1)} MB`);

export function imageUrl(s){try{const u=new URL(s,"https://make.fun");return u.origin==="https://make.fun"?esc(u.href):""}catch{return ""}}
export function linkUrl(s){try{const u=new URL(s);return u.protocol==='http:'||u.protocol==='https:'?esc(u.href):'#'}catch{return '#'}}
