import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {lessons} from '../content/lessons.mjs';
import '../content/bases-complete.mjs';

const b1=lessons.find(l=>l.id==='B01'),b2=lessons.find(l=>l.id==='B02');
// Cálculos independentes: equivalências, taxas, soluções e substituição.
const expectedB1=[-3+8,3/4,1/2+1/4,(2/3)*(3/4),(25-20)/20*100,250*.8*1.2,Math.round(((28/80)/(18/60)-1)*10000)/100];
assert.deepEqual(b1.questions.map(q=>q.a),expectedB1);
const values=b2.questions.map(q=>q.a);
assert.equal(values[0],3*(-2)+2);
assert.equal(values[1],4-1+2);
assert.equal(-2*values[2]+5,11);
assert.equal(3*(values[3]-2)+4,13);
assert.equal(5*values[4]+2,2*values[4]+14);
assert(Math.abs((values[5]-1)/2+values[5]/3-4)<1e-10);
assert.equal(8+2*values[6],2+3.5*values[6]);
assert.equal(2-3*(4-6),8);
assert.equal((3/4)/(1/2),1.5);
assert.equal(Math.floor((18-5)/2),6);

// Exercitar o código real de validação, sem simular um teste visual de navegador.
const forms=[...b1.questions,...b2.questions].map(q=>({
 dataset:{answer:String(q.a),kind:'number'},raw:String(q.a).replace('.',','),feedback:{},solution:{},
 addEventListener(type,fn){this.submit=fn;},
 querySelector(selector){return selector==='.feedback'?this.feedback:this.solution;}
}));
const context={document:{body:{dataset:{}},getElementById:()=>null,querySelectorAll:()=>forms,querySelector:()=>null},localStorage:{getItem:()=>null},FormData:class{constructor(form){this.form=form;}get(){return this.form.raw;}}};
vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),context);
for(const form of forms){
 form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Correto'));assert(form.solution.open);
 form.raw=String(Number(form.dataset.answer)+1);form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Ainda'));
 form.raw='';form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Introduz'));
 form.raw='texto';form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Introduz'));
}
for(const lesson of [b1,b2]){
 assert.equal(lesson.questions.length,7);
 vm.runInNewContext(lesson.code,{console:{log(){}}});
}
console.log('Módulo 1: 14 respostas revistas, substituições verificadas, código e validação interativa aprovados.');
