import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=process.cwd();
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>['.git','node_modules','.venv','_site'].includes(x.name)?[]:x.isDirectory()?walk(path.join(d,x.name)):[path.join(d,x.name)]);
const files=walk(root), html=files.filter(f=>f.endsWith('.html'));
const manifest=JSON.parse(fs.readFileSync('manifest.json','utf8'));
assert.equal(manifest.lessons.length,38);assert.equal(new Set(manifest.lessons.map(l=>l.id)).size,38);
let links=0;
for(const file of html){const src=fs.readFileSync(file,'utf8');assert(src.includes('lang="pt-PT"'),file);assert(src.includes('name="viewport"'),file);const ids=[...src.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`IDs duplicados: ${file}`);
 for(const m of src.matchAll(/(?:href|src)="([^"]+)"/g)){const u=m[1];if(/^(https?:|data:|mailto:)/.test(u))continue;assert(!u.startsWith('/'),`URL absoluta incompatível com subpasta: ${u}`);const [p,hash]=u.split('#');const target=p?path.resolve(path.dirname(file),decodeURIComponent(p)):file;assert(fs.existsSync(target),`Link inexistente: ${file} → ${u}`);if(hash&&target.endsWith('.html'))assert(fs.readFileSync(target,'utf8').includes(`id="${hash}"`),`Âncora inexistente: ${u}`);links++;}
}
for(const l of manifest.lessons){const src=fs.readFileSync(l.url,'utf8');assert.equal((src.match(/class="exercise"/g)||[]).length,['B01','B02','B03','B04','B05','B06','M01','M02','M03'].includes(l.id) ? 7 : 3,l.id);assert(src.includes('EXEMPLO RESOLVIDO A'));assert(src.includes('EXEMPLO RESOLVIDO B'));assert(fs.statSync(l.url).size<50000,`Aula demasiado grande: ${l.id}`);}
assert(fs.statSync('index.html').size<16000,'Índice demasiado grande');assert(!fs.readFileSync('index.html','utf8').includes('class="exercise"'));
new vm.Script(fs.readFileSync('assets/site.js','utf8'));
// Verificações de cálculos independentes dos validadores da interface.
assert.equal([1,2].reduce((s,x,i)=>s+x*[3,4][i],0),11);
assert.equal((Math.abs(120-100)+Math.abs(170-200))/2,25);
assert(Math.abs((0-.1*(2*(0-3)))-.6)<1e-9);
assert.equal((.9+.6+.3)/3,.6);
for(let x=-2;x<=8;x+=.1)for(let a=0;a<=1.5;a+=.05){const next=x-a*2*(x-3);assert(next>=-7.00001&&next<=13.00001);}
console.log(`OK: ${html.length} páginas HTML, ${links} ligações locais, 38 aulas, exercícios por aula e cálculos de referência.`);
