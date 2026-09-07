import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {lessons} from '../content/lessons.mjs';
import '../content/mathematics.mjs';
import '../content/mathematics-module2.mjs';

const m3=lessons.find(l=>l.id==='M03');
const union=(a,b,both)=>a+b-both;
const posterior=(prior,sensitivity,falsePositive)=>sensitivity*prior/(sensitivity*prior+falsePositive*(1-prior));
assert.deepEqual(m3.questions.map(q=>q.a),[1-.08,10/40,union(.4,.3,.1),18/90*100,.5*.4,1,Math.round(posterior(.05,.9,.1)*10000)/100]);
assert(Math.abs(posterior(.1,.8,.2)-8/26)<1e-12);
assert(Math.abs(posterior(.5,.8,.2)-.8)<1e-12);
assert.equal((15+36)/200*100,25.5);
assert(Math.abs(15/(15+36)*100-29.4117647)<1e-6);
const python=process.platform==='win32'&&fs.existsSync('.venv/Scripts/python.exe')?'.venv/Scripts/python.exe':'python3';
const execution=spawnSync(python,['-c',m3.code],{encoding:'utf8'});
assert.equal(execution.status,0,execution.stderr);
assert(execution.stdout.includes("'P(alerta)': 0.26"));

const selected=lessons.filter(l=>['M03','M04'].includes(l.id)&&l.complete);
const forms=selected.flatMap(l=>l.questions.map(q=>({dataset:{answer:String(q.a),kind:q.options?'choice':'number'},raw:String(q.a).replace('.',','),feedback:{},solution:{},addEventListener(t,fn){this.submit=fn;},querySelector(s){return s==='.feedback'?this.feedback:this.solution;}})));
vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),{document:{body:{dataset:{}},getElementById:()=>null,querySelectorAll:()=>forms,querySelector:()=>null},localStorage:{getItem:()=>null},FormData:class{constructor(form){this.form=form;}get(){return this.form.raw;}}});
for(const form of forms){form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Correto'));form.raw=String(Number(form.dataset.answer)+9);form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Ainda'));form.raw='';form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Introduz'));}
console.log(`Matemática M2: ${selected.length} aula(s) completa(s), ${forms.length} exercícios e cálculos validados.`);
