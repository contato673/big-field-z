(()=>{
 if(!matchMedia('(pointer:coarse)').matches&&!navigator.maxTouchPoints)return;
 const el=id=>document.getElementById(id), top=el('tcTop'),log=el('log'),messages=[];
 const panel=document.createElement('dialog');panel.id='fieldPanel';
 panel.innerHTML='<header><h2></h2><button>Voltar</button></header><section></section><div id="fieldTools"></div>';
 document.body.append(panel);
 const content=panel.querySelector('section'),tools=el('fieldTools');
 panel.querySelector('button').onclick=()=>panel.close();
 const journal=make('Diário'),more=make('Ações');
 function make(label){const b=document.createElement('button');b.className='hudMenu';b.textContent=label;top.append(b);return b}
 const extras=[...el('tc').querySelectorAll('.tb')].filter(b=>!['atk','gas','brake','use','shove','bag','pause'].includes(b.dataset.k));
 extras.forEach(b=>{
  tools.append(b);
  b.addEventListener('pointerup',()=>{if(panel.open)panel.close()});
 });
 const labels={atk:'Atacar',use:'Interagir',gas:'Acelerar',brake:'Frear',swap:'Trocar arma',board:'Barricar',unboard:'Remover tábuas',horn:'Buzinar'};
 for(const b of document.querySelectorAll('[data-k]'))if(labels[b.dataset.k])b.textContent=labels[b.dataset.k];
 function line(tag,text){const e=document.createElement(tag);e.textContent=text;content.append(e)}
 function render(){
  content.replaceChildren();
  for(const [id,label] of [['quest','Missão principal'],['tut','Primeiros passos'],['task','Tarefa'],['surv','Resgate'],['sideL','Objetivos próximos']]){
   const node=el(id);if(node&&!node.hidden&&node.textContent.trim()){line('h3',label);line('p',node.textContent)}
  }
  line('h3','Condição');line('p',[...el('vitals').querySelectorAll('.bar')].map(b=>b.querySelector('span').textContent+' '+b.querySelector('b').textContent).join(' · '));
  line('p',el('clock').textContent);
  if(messages.length){line('h3','Rádio e avisos');for(const m of messages.slice(-12).reverse())line('p',m)}
 }
 new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.textContent.trim())messages.push(n.textContent.trim());if(messages.length>30)messages.splice(0,messages.length-30)}).observe(log,{childList:true});
 function open(isJournal){content.hidden=!isJournal;tools.hidden=isJournal;tools.style.display=isJournal?'none':'';panel.querySelector('h2').textContent=isJournal?'Diário de sobrevivência':'Ações';if(isJournal)render();panel.showModal();panel.scrollTop=0}
 journal.onclick=()=>open(true);more.onclick=()=>open(false);
})();
