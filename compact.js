(()=>{
 const controls=document.getElementById('tc');
 if(!controls||!document.querySelector('.hudMenu'))return;
 const paths={
 'Pausa':'M8 5v14M16 5v14',
 'Mochila':'M8 7V6a4 4 0 0 1 8 0v1M5 19V11a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Zm3-5h8v4H8z',
 'Diário':'M4 4h14a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2zm4 0v16m3-11h6m-6 4h5',
 'Ações':'M4 7h7m4 0h5M4 17h2m4 0h10M11 4h4v6h-4zM6 14h4v6H6z',
 'Atacar':'m4 20 4-4m-2-3 5 5m-3-4L18 4l3-1-1 4-10 10',
 'Empurrar':'M8 13V7a1 1 0 0 1 2 0v5-8a1 1 0 0 1 2 0v8-9a1 1 0 0 1 2 0v9-6a1 1 0 0 1 2 0v7l2-3q2-2 3 0l-4 9q-2 3-5 3-4 0-6-4l-3-5q0-3 3-1z'
 };
 const bind=(button,name)=>{
 if(!button)return;
 button.setAttribute('aria-label',name);button.title=name;
 button.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24"><path d="'+paths[name]+'"/></svg>';
 };
 for(const b of controls.querySelectorAll('#tcTop button'))if(paths[b.textContent])bind(b,b.textContent);
 bind(controls.querySelector('.atk'),'Atacar');bind(controls.querySelector('.shove'),'Empurrar');
 const choices=document.createElement('div');choices.id='nearActions';controls.append(choices);
 let last='',activate;
 const primary={trader:'Negociar',surv:'Recrutar',cure:'Curar',radio:'Usar rádio',beacon:'Ativar sinal',tap:'Usar torneira',placed:'Usar',pump:'Abastecer',stair:'Usar escada',bed:'Descansar',bag:'Coletar'};
 window.drawNearby=(raw,obj,inCar,run)=>{
   activate=run;
   const kind=obj?.kind;
   const entries=[];
   for(const match of raw.matchAll(/<kbd>(E|B|X|R|Espaço|Space)<\/kbd>([^<]*)/g)){
    const k=match[1],hint=match[2];let label;
    if(k==='E')label=inCar?'Sair do carro':kind==='op'?(obj.shards?'Limpar vidro':(obj.closed?'Abrir ':'Fechar ')+(obj.k==='door'?'porta':'janela')):kind==='veh'?(obj.key||obj.wired?'Entrar':'Ligar carro'):primary[kind]||(obj?.items===null?'Vasculhar':'Abrir');
    else if(k==='B')label=kind==='veh'?'Porta-malas':hint.includes('Corrigir')?'Reparar':'Barricar';
    else if(k==='X')label=kind==='placed'?'Recolher':'Remover tábuas';
    else if(k==='R')label='Abastecer';
    else label=kind==='fence'?'Pular cerca':'Pular janela';
    entries.push([k,label]);
   }
   const signature=JSON.stringify(entries);if(signature===last)return;last=signature;choices.replaceChildren();
   for(const [key,label] of entries){
    const b=document.createElement('button');b.textContent=label;b.onclick=e=>{e.stopPropagation();activate(key==='Espaço'||key==='Space'?'Space':'Key'+key)};choices.append(b);
   }
 };
 const title=document.querySelector('#title .btns');
 const full=document.createElement('button');full.className='btn ghost';full.textContent='Tela cheia';title?.append(full);
 full.hidden=!!navigator.standalone||matchMedia('(display-mode: standalone)').matches;
 full.onclick=async()=>{
  if(document.fullscreenEnabled){try{await document.documentElement.requestFullscreen();return}catch{}}
  const help=document.createElement('dialog');help.id='installHelp';
  help.innerHTML='<h3>Jogar sem as abas do Safari</h3><p>Toque em Compartilhar, depois em Adicionar à Tela de Início. Ative Abrir como App da Web, se aparecer, e abra BIG FIELD Z pelo novo ícone.</p><button>Entendi</button>';
  document.body.append(help);help.querySelector('button').onclick=()=>help.close();help.onclose=()=>help.remove();help.showModal();
 };
})();
