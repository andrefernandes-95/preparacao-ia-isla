(() => {
 'use strict';
 const KEY='caderno-ia-v1';
 let storageAvailable=true;
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{"done":[],"last":null}');}catch{storageAvailable=false;return {done:[],last:null};}};
 let state=read();
 if(!state||!Array.isArray(state.done)) state={done:[],last:null};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{storageAvailable=false;return false;}};
 const status=text=>{const el=document.getElementById('storage-status');if(el)el.textContent=text;};
 const id=document.body.dataset.lesson;
 if(id){state.last={id,url:location.pathname,title:document.title.split(' · ')[0]};save();}
 const resume=document.getElementById('resume');
 if(resume&&state.last&&typeof state.last.url==='string'){
  const target=new URL(state.last.url,location.href);
  if(target.origin===location.origin&&target.pathname.includes('/cadeiras/')){resume.href=target.href;resume.textContent=`Retomar ${state.last.id}: ${state.last.title} ↗`;}
 }
 document.querySelectorAll('.exercise').forEach(form=>{
  form.addEventListener('submit',event=>{
   event.preventDefault();const raw=new FormData(form).get('answer');
   const value=Number(String(raw??'').trim().replace(',','.'));
   const feedback=form.querySelector('.feedback');
   if(raw===null||String(raw).trim()===''||!Number.isFinite(value)){feedback.textContent='Introduz uma resposta válida.';return;}
   const correct=Math.abs(value-Number(form.dataset.answer))<= (form.dataset.kind==='choice'?0:0.01);
   feedback.textContent=correct?'Correto. Compara também o teu raciocínio com a resolução.':'Ainda não. Consulta a pista e verifica cada passo.';
   if(correct) form.querySelector('.solution').open=true;
  });
 });
 const complete=document.querySelector('.complete');
 const updateComplete=()=>{if(!complete)return;const done=state.done.includes(id);complete.textContent=done?'Aula estudada ✓ · Desmarcar':'Marcar aula como estudada';complete.setAttribute('aria-pressed',String(done));document.querySelector('.completion-state').textContent=storageAvailable?'Marca pessoal guardada apenas neste navegador.':'O navegador não permite guardar o progresso. A marca dura apenas nesta página.';};
 if(complete){updateComplete();complete.addEventListener('click',()=>{state.done=state.done.includes(id)?state.done.filter(x=>x!==id):[...state.done,id];save();updateComplete();});}
 document.getElementById('export-progress')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:1,...state},null,2)],{type:'application/json'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='caderno-ia-progresso.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);status('Cópia de progresso exportada.');});
 document.getElementById('import-progress')?.addEventListener('change',async event=>{try{const f=event.target.files[0];if(!f)return;if(f.size>100000)throw Error();const data=JSON.parse(await f.text());if(data.version!==1||!Array.isArray(data.done)||!data.done.every(x=>typeof x==='string'&&/^(B|M|P|I|ML|D|N|A|F)\d{2}$/.test(x)))throw Error();state={done:[...new Set(data.done)],last:null};status(save()?'Progresso importado.':'O navegador bloqueou a gravação.');}catch{status('Ficheiro inválido. Usa uma exportação deste caderno.');}event.target.value='';});
 document.getElementById('reset-progress')?.addEventListener('click',()=>{if(confirm('Limpar as marcas de estudo guardadas neste navegador?')){state={done:[],last:null};status(save()?'Progresso limpo.':'Não foi possível guardar a alteração.');}});
 const w=document.getElementById('weight'),rate=document.getElementById('rate');
 if(w&&rate){const px=x=>20+(x+7)/20*460,py=y=>155-y/100*140;document.getElementById('loss-curve').setAttribute('points',Array.from({length:101},(_,i)=>{const x=-7+i*.2;return `${px(x)},${py((x-3)**2)}`;}).join(' '));const update=()=>{const x=Number(w.value),a=Number(rate.value),grad=2*(x-3),next=x-a*grad,before=(x-3)**2,after=(next-3)**2;document.getElementById('weight-value').textContent=x.toLocaleString('pt-PT');document.getElementById('rate-value').textContent=a.toLocaleString('pt-PT');[['before-point',x,before],['after-point',next,after]].forEach(([id,x,y])=>{const c=document.getElementById(id);c.setAttribute('cx',px(x));c.setAttribute('cy',py(y));});document.getElementById('gradient-result').textContent=`Gradiente: ${grad.toFixed(2)}. Novo peso: ${next.toFixed(2)}. Perda: ${before.toFixed(2)} → ${after.toFixed(2)}. ${after<before?'O passo reduziu o erro.':after>before?'O passo aumentou o erro. Experimenta uma taxa menor.':'A perda manteve-se.'}`;};w.addEventListener('input',update);rate.addEventListener('input',update);update();}
})();
