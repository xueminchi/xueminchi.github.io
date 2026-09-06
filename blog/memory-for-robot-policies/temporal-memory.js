// Original explanatory diagram of the reviewed MEM-style implementation.
// Tokens and attention links are schematic, not measured model activations.
(() => {
  const root = document.getElementById('temporal-memory-architecture');
  if (!root) return;
  const svg = root.querySelector('.temporal-architecture');
  const ns = 'http://www.w3.org/2000/svg';
  const colors = {history:'#296cba',current:'#298468',neutral:'var(--muted)'};
  const add = (tag, attrs, content, parent=svg) => {
    const node=document.createElementNS(ns,tag);
    Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,String(v)));
    if(content!==undefined) node.textContent=content;
    parent.appendChild(node);
    return node;
  };
  const label=(x,y,s,secondary=false)=>add('text',{x,y,'text-anchor':'middle',class:secondary?'secondary':''},s);
  const line=(points, both=false, tint='var(--muted)')=>add('polyline',{
    points:points.map(p=>p.join(',')).join(' '),fill:'none',stroke:tint,'stroke-width':1.3,
    'marker-end':'url(#temporal-flow-arrow)',...(both?{'marker-start':'url(#temporal-flow-arrow)'}:{})
  });
  function grid(cx,y,tint,{cell=12,gap=4,opacity=.3,highlight=false,cross=false}={}) {
    const size=3*cell+2*gap,left=cx-size/2;
    for(let r=0;r<3;r++) for(let c=0;c<3;c++) {
      add('rect',{x:left+c*(cell+gap),y:y+r*(cell+gap),width:cell,height:cell,rx:1.5,
        fill:tint,'fill-opacity':highlight&&r===0&&c===1?.9:opacity});
    }
    if(cross) {
      add('path',{d:`M ${left-4} ${y-4} L ${left+size+4} ${y+size+4} M ${left+size+4} ${y-4} L ${left-4} ${y+size+4}`,
        stroke:'var(--muted)','stroke-width':1.2,fill:'none'});
    }
    return {size,left};
  }
  function box(cx,cy,width,height,lines) {
    add('rect',{x:cx-width/2,y:cy-height/2,width,height,rx:3,fill:'var(--paper)',stroke:'var(--line)'});
    lines.forEach((s,i)=>label(cx,cy+(i-(lines.length-1)/2)*21+5,s));
  }
  function draw() {
    const w=Math.floor(root.getBoundingClientRect().width);
    if(w<1) return;
    const wide=w>=600, h=wide?686:712, cx=w/2;
    const cols=[w*.18,cx,w*.82];
    svg.replaceChildren();
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    svg.setAttribute('height',h);
    add('title',{id:'temporal-architecture-title'},'MEM-style temporal fusion inside the vision encoder');
    add('desc',{id:'temporal-architecture-desc'},'Each column represents one timestep of a single camera. At selected vision blocks, same-position patches exchange information from earlier to later timesteps using causal temporal attention. A normal spatial block then mixes patches within each frame. After the final such block only current-frame patch tokens remain; historical token arrays are dropped. The vision-to-VLM projector changes feature width, and history-enhanced current-image tokens join language tokens in the input prefix. There are no independent learned memory queries.');
    const defs=add('defs',{});
    const marker=add('marker',{id:'temporal-flow-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:5,markerHeight:5,orient:'auto-start-reverse'},undefined,defs);
    add('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'var(--muted)'},undefined,marker);
    label(cx,23,'1. Causal temporal attention');
    cols.forEach((x,i)=>label(x,52,['Earlier','Recent','Current'][i]));
    cols.forEach((x,i)=>grid(x,98,i===2?colors.current:colors.history,{highlight:true}));
    // Show all forward cross-time links for one patch; self links are omitted.
    line([[cols[0],98],[cols[0],79],[cols[1],79],[cols[1],98]]);
    line([[cols[1],98],[cols[1],79],[cols[2],79],[cols[2],98]]);
    line([[cols[0]-5,98],[cols[0]-5,67],[cols[2]+5,67],[cols[2]+5,98]]);
    label(cx,169,'Same patch position · earlier → later',true);
    cols.forEach(x=>line([[x,183],[x,200]]));
    label(cx,227,'2. Spatial mixing within each frame');
    cols.forEach((x,i)=>{
      const y=250,cell=10,gap=12,step=cell+gap;
      const {left}=grid(x,y,i===2?colors.current:colors.history,{cell,gap,opacity:.5});
      const my=y+step+cell/2;
      for(let c=0;c<2;c++) line([[left+c*step+cell+1,my],[left+(c+1)*step-1,my]],true);
      const mx=x;
      for(let r=0;r<2;r++) line([[mx,y+r*step+cell+1],[mx,y+(r+1)*step-1]],true);
    });
    cols.forEach(x=>line([[x,315],[x,335]]));
    label(cx,363,'After the final temporal-mixing block');
    cols.forEach((x,i)=>grid(x,389,i===2?colors.current:colors.neutral,
      {cell:10,gap:4,opacity:i===2?.65:.18,cross:i!==2}));
    label(cols[0],454,'Discard',true);
    label(cols[1],454,'Discard',true);
    label(cols[2],454,'Keep');
    line([[cols[2],468],[cols[2],486],[cx,486],[cx,501]]);
    box(cx,533,Math.min(w-24,294),62,['Vision-to-VLM projection','D_vision → D_model; P tokens']);
    line([[cx,564],[cx,589]]);
    label(cx,611,'Policy prefix: concatenate inputs');
    if(wide) {
      const leftWidth=Math.min(336,w*.55),rightWidth=158,total=leftWidth+rightWidth+10,start=(w-total)/2;
      box(start+leftWidth/2,647,leftWidth,48,['History-enhanced current images']);
      box(start+leftWidth+10+rightWidth/2,647,rightWidth,48,['Language']);
    } else {
      const aWidth=(w-30)*.66,bWidth=(w-30)*.34;
      box(10+aWidth/2,655,aWidth,66,['Current images','+ history fused']);
      box(20+aWidth+bWidth/2,655,bWidth,66,['Language']);
    }
  }
  new ResizeObserver(draw).observe(root);
  draw();
})();
