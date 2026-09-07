import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {lessons} from '../content/lessons.mjs';
import '../content/bases-module3.mjs';
const b5=lessons.find(l=>l.id==='B05');
assert.deepEqual(b5.questions.map(q=>q.a),[0,3,(100+110+390)/3,1,1,1,0]);
assert(b5.extra.includes('./.venv/Scripts/python.exe'));
assert(!b5.extra.includes('.venvScriptspython'));
const selected=lessons.filter(l=>['B05','B06'].includes(l.id)&&l.complete);
const forms=selected.flatMap(l=>l.questions.map(q=>({dataset:{answer:String(q.a),kind:q.options?'choice':'number'},raw:String(q.a).replace('.',','),feedback:{},solution:{},addEventListener(t,fn){this.submit=fn;},querySelector(s){return s==='.feedback'?this.feedback:this.solution;}})));
vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),{document:{body:{dataset:{}},getElementById:()=>null,querySelectorAll:()=>forms,querySelector:()=>null},localStorage:{getItem:()=>null},FormData:class{constructor(f){this.f=f;}get(){return this.f.raw;}}});
for(const form of forms){form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Correto'));form.raw=String(Number(form.dataset.answer)+10);form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Ainda'));form.raw='';form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Introduz'));}
console.log(`Módulo 3: ${selected.length} aula(s) e ${forms.length} exercícios validados.`);
