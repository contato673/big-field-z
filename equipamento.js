const equipmentIcons = {
  knife:'🔪', machete:'🗡️', axe:'🪓', sledge:'🔨', bat:'🏏', nailbat:'🏏', crowbar:'🛠️',
  pistol:'pistol', shotgun:'shotgun', rifle:'rifle', ar:'ar', rpg:'rpg',
  molotov:'🍾', cracker:'🧨', grenade:'💣', claw:'🐾', roar:'📣', pounce:'🐾'
};
const gunShapes = {
  pistol:'M2 7h19v4h-8l-2 7H6l2-8H2z',
  shotgun:'M2 14l5-5h16v2H12l-2 2H8l-4 4z',
  rifle:'M1 15l6-6h7V7h4v2h5v2h-9l-3 3H8l-5 4z',
  ar:'M1 11h5l2-3h9v1h6v2h-8l2 5-3 1-3-5-2 5-2-1 1-4-6 3z',
  rpg:'M1 13l4-4 10 1 3-3 5 4-5 4-3-3H9l-1 4H6l1-4z'
};
function equipmentSlot(id,selected,label,details){
  const safe=s=>String(s).replace(/[&"<>]/g,c=>({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[c]));
  const icon=equipmentIcons[id];
  const symbol=gunShapes[icon]
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="'+gunShapes[icon]+'"/></svg>'
    : id ? '<span aria-hidden="true">'+(icon||'◆')+'</span>' : '';
  const hint=id?safe(label+(details?' · '+details:'')):'Espaço vazio';
  return '<div class="slot'+(selected?' on':'')+'" role="img" aria-label="'+hint+'" title="'+hint+'">'+symbol+'</div>';
}
Object.assign(equipmentIcons,{
 canned:'🥫',coffee:'☕',supp:'🔇',bottle:'🔇',choke:'⚙️',red:'🎯',scope:'🔭',mag:'▥',laser:'🔴',
 bread:'🍞',chips:'🍟',choco:'🍫',apple:'🍎',mre:'🍱',water:'water',soda:'🥤',bandage:'🩹',rag:'🧻',medkit:'🧰',
 pills:'💊',antibio:'🧪',cloth:'👕',plank:'plank',nails:'nails',alcohol:'🍶',a9:'•',ashell:'▮',arifle:'▴',rocket:'🚀',
 backpack:'🎒',milpack:'🎒',trailpack:'🎒',expeditionpack:'🎒',screwdriver:'🪛',gascan:'⛽',gascanE:'🛢️',bottleE:'bottleE',veg:'🥬',seeds:'🌱',
 hoe:'⛏️',tarp:'⛺',barrel:'🪣',generator:'⚡',circuit:'📟',battery:'🔋',antenna:'📡',coin:'🪙',box:'📦',spear:'🔱'
});
const itemDrawings={
 water:'<path fill="#96dff1" d="M9 2h6v3l2 3v12q0 2-2 2H9q-2 0-2-2V8l2-3z"/><path fill="#318ca9" d="M8 11h8v6H8zM9 1h6v3H9z"/>',
 bottleE:'<path fill="none" stroke="#b5cace" stroke-width="2" d="M9 2h6v3l2 3v12q0 2-2 2H9q-2 0-2-2V8l2-3z"/>',
 plank:'<path fill="#cf9861" d="m2 15 14-12 6 6L8 21z"/><path stroke="#805232" fill="none" d="m6 16 10-9m-7 9 9-8"/>',
 nails:'<g fill="none" stroke="#c3cbd3" stroke-width="2" stroke-linecap="round"><path d="m5 5 10 13M3 7l4-3m11 1L9 21m7-17 4 2"/></g>'
};
Object.assign(equipmentIcons,{a9:'round9',ashell:'shell12',arifle:'rifleRound',q_circuit:'📟',q_battery:'🔋',q_antenna:'📡'});
for(const key of ['supp','bottle','choke','red','scope','mag','laser'])equipmentIcons['att_'+key]=equipmentIcons[key];
Object.assign(itemDrawings,{
 round9:'<path fill="#dbad61" d="M6 11q0-6 3-8 3 2 3 8v10H6z"/><path fill="#ab7949" d="M14 14q0-5 2.5-7 2.5 2 2.5 7v7h-5z"/>',
 shell12:'<rect x="7" y="3" width="10" height="18" rx="1" fill="#bf5346"/><path fill="#d4a952" d="M6 16h12v6H6z"/>',
 rifleRound:'<path fill="#c89956" d="m12 1 2 6v3l2 2v10H8V12l2-2V7z"/>'
});
function inventoryIcon(id,label){
 const icon=equipmentIcons[id];
 const drawing=itemDrawings[icon] || (gunShapes[icon] && '<path fill="currentColor" d="'+gunShapes[icon]+'"/>');
 const safe=String(label).replace(/[&"<>]/g,c=>({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[c]));
 return '<span class="itemIcon" role="img" title="'+safe+'" aria-label="'+safe+'">'+(drawing?'<svg aria-hidden="true" viewBox="0 0 24 24">'+drawing+'</svg>':icon||'📦')+'</span>';
}
function arrangeBackpack(panel,capacity,totalMass,itemMasses){
  const rows=Array.from(panel.children).filter(el=>el.classList.contains('row'));
  const equip=panel.querySelector('.eq');
  if(!equip)return;
  const grid=document.createElement('div');
  grid.className='packGrid';
  const actions=document.createElement('div');
  actions.className='packActions';actions.hidden=true;
  equip.after(grid,actions);
  const heading=panel.querySelector('.ph small');
  if(heading)heading.textContent=rows.length+' / '+capacity+' espaços · '+totalMass;
  for(let i=0;i<Math.max(rows.length,capacity);i++){
    const row=rows[i],cell=document.createElement(row?'button':'span');
    cell.className='packCell';
    grid.append(cell);
    if(!row)continue;
    const icon=row.querySelector('.itemIcon'), count=row.querySelector('.nm em');
    const name=icon?.title||'Item';
    cell.title=name;cell.setAttribute('aria-label',name+(count?' '+count.textContent:''));
    if(icon)cell.append(icon);
    if(count&&count.textContent.startsWith('×'))cell.append(count);
    const buttons=row.querySelector('.bt');
    const description=row.querySelector('small')?.textContent;
    row.remove();
    cell.onclick=e=>{
      e.stopPropagation();
      const closing=cell.classList.contains('chosen');
      grid.querySelector('.chosen')?.classList.remove('chosen');
      actions.replaceChildren();actions.hidden=closing;
      if(closing)return;
      cell.classList.add('chosen');
      const title=document.createElement('strong');title.textContent=name+" · "+itemMasses[i];
      actions.append(title);
      if(description){const note=document.createElement('small');note.textContent=description;actions.append(note)}
      if(buttons)actions.append(buttons);
    };
  }
}
