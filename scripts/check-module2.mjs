import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {lessons} from '../content/lessons.mjs';
import '../content/bases-module2.mjs';
const b3=lessons.find(l=>l.id==='B03');
const answers=b3.questions.map(q=>q.a);
assert.deepEqual(answers,[3*2+1,2**3,1,(22-10)/(4-1),50/5,Math.log2(40/5),3]);
assert.equal((2*answers[6]+1)**2,49);
const selected=lessons.filter(l=>['B03','B04'].includes(l.id)&&l.complete);
const forms=selected.flatMap(l=>l.questions.map(q=>({dataset:{answer:String(q.a),kind:q.options?'choice':'number'},raw:String(q.a).replace('.',','),feedback:{},solution:{},addEventListener(t,fn){this.submit=fn;},querySelector(s){return s==='.feedback'?this.feedback:this.solution;}})));
vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),{document:{body:{dataset:{}},getElementById:()=>null,querySelectorAll:()=>forms,querySelector:()=>null},localStorage:{getItem:()=>null},FormData:class{constructor(f){this.f=f;}get(){return this.f.raw;}}});
for(const form of forms){
 form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Correto'));assert(form.solution.open);
 form.raw=String(Number(form.dataset.answer)+10);form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Ainda'));
 form.raw='';form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Introduz'));
}
for(const l of selected)vm.runInNewContext(l.code,{console:{log(){},table(){}}});
console.log(`Módulo 2: ${selected.length} aula(s) completa(s), cálculos, código e ${forms.length} exercícios validados.`);
