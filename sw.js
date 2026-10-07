const CACHE="viacontrol-menu-v1";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=="GET"||u.origin!==location.origin)return;
 const p=u.pathname;
 if(!(p==="/"||p.endsWith("/index.html")&&p.split("/").length<=2||p.endsWith("manifest.webmanifest")&&p.split("/").length<=2||/^\/icon-(192|512)\.png$/.test(p)))return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
