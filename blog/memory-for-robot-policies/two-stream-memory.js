(() => {
  const root = document.getElementById('appearance-motion-memory-figure');
  const svg = root.querySelector('.memory-architecture');
  const ns = 'http://www.w3.org/2000/svg';
  const color = {a:'var(--viz-series-1)',m:'var(--viz-series-2)',q:'var(--viz-series-3)',out:'var(--viz-series-4)'};
  function element(tag, attrs, content, parent=svg) {
    const e = document.createElementNS(ns,tag);
    Object.entries(attrs).forEach(([k,v]) => e.setAttribute(k,String(v)));
    if(content !== undefined) e.textContent=content;
    parent.appendChild(e); return e;
  }
  function text(x,y,s,secondary=false,anchor='middle') {
    return element('text',{x,y,'text-anchor':anchor,class:secondary?'secondary':''},s);
  }
  function line(points, arrow=true) {
    element('polyline',{points:points.map(p=>p.join(',')).join(' '),fill:'none',stroke:'var(--muted-foreground)','stroke-width':1.3,...(arrow?{'marker-end':'url(#memory-arrow-head)'}:{})});
  }
  function box(cx,cy,width,height,labels) {
    element('rect',{x:cx-width/2,y:cy-height/2,width,height,rx:3,fill:'var(--background)',stroke:'var(--border)','stroke-width':1.2});
    labels.forEach((s,i)=>text(cx,cy+(i-(labels.length-1)/2)*20+5,s));
  }
  function grid(x,y,tint,side=4,cell=8) {
    for(let r=0;r<side;r++) for(let c=0;c<side;c++)
      element('rect',{x:x+c*(cell+2),y:y+r*(cell+2),width:cell,height:cell,rx:1,fill:tint,'fill-opacity':.4});
  }
  function tokens(cx,y,tint,n=5,shape='rect') {
    for(let i=0;i<n;i++) {
      const x=cx+(i-(n-1)/2)*17;
      if(shape==='circle') element('circle',{cx:x,cy:y+6,r:6,fill:tint,'fill-opacity':.6});
      else element('rect',{x:x-6,y,width:12,height:12,rx:2,fill:tint,'fill-opacity':.6});
    }
  }
  function history(cx,cy) {
    for(let i=2;i>=0;i--) {
      element('rect',{x:cx-26+i*5,y:cy-25-i*7,width:52,height:46,rx:2,fill:'var(--background)',stroke:'var(--border)'});
      grid(cx-20+i*5,cy-19-i*7,'var(--muted-foreground)',4,7);
    }
  }
  function joint(cx,y) {
    tokens(cx,y,color.a,4);
    tokens(cx,y+19,color.m,4);
  }
  function branch(cx,y,isMotion,compact=false) {
    text(cx,y,isMotion?'Motion':'Appearance');
    if(isMotion) {
      grid(cx-43,y+18,color.m,3,8);
      grid(cx+13,y+18,color.m,3,8);
      text(cx,y+72,compact?'Adjacent difference':'Adjacent feature difference',true);
    } else {
      for(let i=0;i<3;i++) grid(cx-58+i*44,y+18,color.a,3,8);
      text(cx,y+72,'Patch content',true);
    }
    text(cx,y+94,compact?'+ position / type':'+ time, space & type',true);
  }
  function draw() {
    const w=Math.floor(root.getBoundingClientRect().width);
    if(w<1) return;
    const wide=w>=700, height=wide?552:838;
    svg.replaceChildren();
    svg.setAttribute('viewBox',`0 0 ${w} ${height}`);
    svg.setAttribute('height',height);
    element('title',{id:'memory-architecture-title'},'Appearance and motion streams jointly compressed by learned queries');
    element('desc',{id:'memory-architecture-desc'},'Historical images pass through one shared image encoder and projection. Appearance retains patch features; motion uses adjacent feature differences. Position and stream-type embeddings are added. Both streams form the keys and values of one cross-attention readout, with learned queries. A final projection changes feature width d to D, producing M memory tokens. They are concatenated between current-image and language tokens in the policy prefix, not passed into an additional prefix network. Grids and colors are schematic, not measured features.');
    const defs=element('defs',{});
    const marker=element('marker',{id:'memory-arrow-head',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'},undefined,defs);
    element('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'var(--muted-foreground)'},undefined,marker);
    if(wide) {
      const hx=w*.07, ex=w*.225, sx=w*.442, bx=w*.635, qx=w*.835;
      history(hx,201); text(hx,257,'History');
      line([[hx+38,200],[ex-55,200]]);
      box(ex,200,108,62,['Shared encoder','+ projection']);
      line([[ex+54,200],[ex+70,200],[ex+70,111],[sx-68,111]]);
      line([[ex+70,200],[ex+70,289],[sx-68,289]]);
      branch(sx,65,false); branch(sx,247,true);
      line([[sx+68,111],[bx-48,111],[bx-48,193],[bx-35,193]]);
      line([[sx+68,289],[bx-48,289],[bx-48,211],[bx-35,211]]);
      joint(bx,187); text(bx,253,'Joint bank');
      line([[bx+35,200],[qx-62,200]]); text((bx+35+qx-62)/2,183,'K/V',true);
      tokens(qx,67,color.q,5,'circle'); text(qx,43,'Learned queries');
      line([[qx,83],[qx,167]]); text(qx+15,129,'Q',true,'start');
      box(qx,200,122,66,['Cross-attention','+ residual / FFN']);
      line([[qx,233],[qx,253]]);
      box(qx,274,126,40,['Projection d → D']);
      line([[qx,294],[qx,321]]);
      tokens(qx,330,color.out); text(qx,370,'Memory tokens'); text(qx,392,'M tokens, width D',true);
      line([[qx,405],[qx,437],[w/2,437],[w/2,462]]);
      text(w/2,423,'Policy prefix: concatenate input tokens');
      box(w/2-181,489,176,52,['Current images']);
      box(w/2,489,166,52,['Memory']);
      box(w/2+181,489,176,52,['Language']);
      text(w/2,543,'Schematic tokens · prefix is a sequence, not another network',true);
    } else {
      const cx=w/2, left=w*.25, right=w*.75;
      history(cx,57); text(cx,106,'Historical images');
      line([[cx,119],[cx,140]]);
      box(cx,168,224,56,['Shared image encoder','+ learned projection']);
      line([[cx,196],[cx,214],[left,214],[left,230]]);
      line([[cx,214],[right,214],[right,230]]);
      branch(left,249,false,true); branch(right,249,true,true);
      line([[left,354],[left,378],[cx-30,378],[cx-30,397]]);
      line([[right,354],[right,378],[cx+30,378],[cx+30,397]]);
      joint(cx,404); text(cx,462,'Joint appearance–motion bank');
      const ax=w*.67,qx=w*.2;
      line([[cx,475],[cx,491],[ax,491],[ax,510]]);
      text(ax+10,496,'K/V',true,'start');
      tokens(qx,526,color.q,3,'circle'); text(qx,497,'Learned queries');
      line([[qx+31,533],[ax-76,533]]); text((qx+31+ax-76)/2,521,'Q',true);
      box(ax,542,148,64,['Cross-attention','+ residual / FFN']);
      line([[ax,574],[ax,592]]);
      box(ax,614,146,40,['Projection d → D']);
      line([[ax,634],[ax,650],[cx,650],[cx,668]]);
      tokens(cx,676,color.out); text(cx,714,'Memory tokens: M × D');
      line([[cx,725],[cx,762]]);
      text(cx,750,'Policy prefix (concatenation)');
      const slot=(w-32)/3;
      box(cx-slot-4,788,slot-4,42,['Images']);
      box(cx,788,slot-4,42,['Memory']);
      box(cx+slot+4,788,slot-4,42,['Language']);
    }
  }
  new ResizeObserver(draw).observe(root);
  draw();
})();
