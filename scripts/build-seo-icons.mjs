import sharp from 'sharp';
import fs from 'node:fs/promises';
// Derivados del logo existente, sobre fondo crema, sin recortar el wordmark.
await fs.mkdir('public/icons', {recursive:true});
for (const [size,path] of [[32,'src/app/icon.png'],[180,'src/app/apple-icon.png'],[192,'public/icons/icon-192.png'],[512,'public/icons/icon-512.png']]) {
 const width=Math.round(size*.8);
 const logo=await sharp('public/images/tinto-logo.png').resize({width,height:width,fit:'inside'}).toBuffer();
 await sharp({create:{width:size,height:size,channels:4,background:'#fff4e6'}}).composite([{input:logo,gravity:'centre'}]).png().toFile(path);
}
