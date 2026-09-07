import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {lessons} from '../content/lessons.mjs';
import '../content/mathematics.mjs';
import '../content/mathematics-module1.mjs';

const m1=lessons.find(l=>l.id==='M01');
const dot=(a,b)=>a.reduce((sum,x,i)=>sum+x*b[i],0);
const norm=v=>Math.sqrt(dot(v,v));
const distance=(a,b)=>norm(a.map((x,i)=>x-b[i]));
assert.deepEqual(m1.questions.map(q=>q.a),[3,4,8,norm([6,8]),distance([1,1],[4,5]),0,dot([4,3],[15,40])+30]);
assert.deepEqual([2,-1].map((x,i)=>x+[-3,4][i]),[-1,3]);
assert.deepEqual([2,-1].map((x,i)=>x-[-3,4][i]),[5,-5]);
assert.equal(dot([2,-1],[-3,4]),-10);
assert.equal(dot([2,0],[0,-3]),0);
const python=process.platform==='win32'&&fs.existsSync('.venv/Scripts/python.exe')?'.venv/Scripts/python.exe':'python3';
const execution=spawnSync(python,['-c',m1.code],{encoding:'utf8'});
assert.equal(execution.status,0,execution.stderr);
assert(execution.stdout.includes("'previsao_ms': 200"));
const m2=lessons.find(l=>l.id==='M02');
const matmul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,x,k)=>sum+x*B[k][j],0)));
const A=[[1,2],[3,4]],B=[[5,6],[7,8]];
assert.deepEqual(matmul(A,B),[[19,22],[43,50]]);
assert.deepEqual(matmul(B,A),[[23,34],[31,46]]);
assert.deepEqual(m2.questions.map(q=>q.a),[12,5,8,30,0,43,24]);
assert.deepEqual(matmul([[1,2],[0,1]],[[2,0],[3,4]]),[[8,8],[3,4]]);
assert.deepEqual(matmul([[2,0],[3,4]],[[1,2],[0,1]]),[[2,4],[3,10]]);
assert(m2.extra.includes('(3,1)')&&m2.extra.includes('(3,3)'));

const selected=lessons.filter(l=>['M01','M02'].includes(l.id)&&l.complete);
const forms=selected.flatMap(l=>l.questions.map(q=>({dataset:{answer:String(q.a),kind:q.options?'choice':'number'},raw:String(q.a).replace('.',','),feedback:{},solution:{},addEventListener(t,fn){this.submit=fn;},querySelector(s){return s==='.feedback'?this.feedback:this.solution;}})));
vm.runInNewContext(fs.readFileSync('assets/site.js','utf8'),{document:{body:{dataset:{}},getElementById:()=>null,querySelectorAll:()=>forms,querySelector:()=>null},localStorage:{getItem:()=>null},FormData:class{constructor(form){this.form=form;}get(){return this.form.raw;}}});
for(const form of forms){form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Correto'));form.raw=String(Number(form.dataset.answer)+11);form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Ainda'));form.raw='';form.submit({preventDefault(){}});assert(form.feedback.textContent.startsWith('Introduz'));}
console.log(`Matemática M1: ${selected.length} aula(s) completa(s), ${forms.length} exercícios e cálculos validados.`);
