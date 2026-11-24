const C='rutina-v2';
const FILES=['./','./index.html','./estudio.html','./schedule.json','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='rutina-state').map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
const pad=n=>String(n).padStart(2,'0');
function arNow(){const d=new Date(Date.now()-3*3600*1000);return {f:`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`,wd:d.getUTCDay(),m:d.getUTCHours()*60+d.getUTCMinutes()};}
async function getJSON(u){try{const r=await fetch(u,{cache:'no-store'});if(r.ok)return await r.json();}catch(e){}try{const c=await caches.open(C);const r=await c.match(u);if(r)return await r.json();}catch(e){}return null;}
const EMO={fam:'👨‍👧',trn:'💪',stu:'📊',lg:'📦',voc:'📖',eng:'🇬🇧',wk:'🚶',fr:'🌿',wrk:'💼',pl:'🗓️'};
self.addEventListener('push',e=>{e.waitUntil((async()=>{
  const sch=await getJSON('./schedule.json');const n=arNow();
  let it=null;
  if(sch){const cand=(sch.days[String(n.wd)]||[]).filter(x=>x.chk).map(x=>{const[h,m]=x.a.split(':').map(Number);return {x,diff:n.m-(h*60+m)};}).filter(r=>r.diff>=-2&&r.diff<=20).sort((a,b)=>a.diff-b.diff);
    it=cand[0]&&cand[0].x;}
  let st={};try{const c=await caches.open('rutina-state');const r=await c.match('./state.json');if(r)st=await r.json();}catch(x){}
  const key=it&&(n.f+':'+it.k);
  const done=key&&st[key];
  const title=it?(done?'✔ ¡Hecho! '+it.t:(EMO[it.c]||'⏰')+' '+it.t):'⏰ Mi rutina';
  const body=it?(done?'Ya lo marcaste como completado. ¡Seguí así!':(it.n?it.n+' · ':'')+it.a+' a '+it.b+'. Tocá para marcarlo al terminar.'):'Tenés una tarea esperándote.';
  await self.registration.showNotification(title,{body,icon:'icon-192.png',badge:'icon-192.png',tag:key||'rutina',renotify:true,data:{url:'./'}});
})());});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil((async()=>{const cs=await clients.matchAll({type:'window',includeUncontrolled:true});for(const c of cs){if('focus' in c)return c.focus();}return clients.openWindow('./');})());});
