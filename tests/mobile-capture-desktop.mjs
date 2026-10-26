import {chromium}from '@playwright/test';import fs from 'node:fs/promises';import path from 'node:path';
const base=process.argv[2]||'http://localhost:3138';const dir=process.env.MOBILE_EVIDENCE_DIR||'C:/Users/LENOVO/tinto-mobile-evidence';
const b=await chromium.launch();
try{const context=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:'light'});
for(const route of ['/','/producto','/agendar']){const p=await context.newPage();await p.goto(base+route,{waitUntil:'networkidle'});await p.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}window.scrollTo(0,0);await Promise.all([...document.images].map(i=>Promise.race([i.decode().catch(()=>{}),new Promise(r=>setTimeout(r,1500))])));});const name=route.slice(1)||'inicio';const target=path.join(dir,'before',`${name}-1440.png`);await fs.copyFile(target,path.join(dir,'before',`${name}-1440-initial.png`));await p.screenshot({path:target,fullPage:true,animations:'disabled'});console.log('Referencia actualizada:',route);await p.close();}
}finally{await b.close();}
