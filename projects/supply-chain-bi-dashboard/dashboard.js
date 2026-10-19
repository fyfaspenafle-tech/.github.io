"use strict";
// Data schema: [YYYY-MM, warehouse_index, category_index, units, on_time, stockout, cost_gbp]
const data = window.SHIPMENT_DATA || [];
const warehouses = window.WAREHOUSES || [];
const categories = window.CATEGORIES || [];
const whSel = document.getElementById('warehouse');
const catSel = document.getElementById('category');
warehouses.forEach((x,i) => whSel.add(new Option(x,String(i))));
categories.forEach((x,i) => catSel.add(new Option(x,String(i))));
const pct = (n,d) => d ? (100*n/d).toFixed(1)+'%' : '—';
const money = n => Number.isFinite(n) ? '£'+n.toFixed(2) : '—';
function stats(rows){let count=rows.length, on=0, stock=0, cost=0;
  rows.forEach(r=>{on+=r[4];stock+=r[5];cost+=r[6];});
  return {count,on,stock,cost, onRate: count?100*on/count:0}; }
function trendChart(rows) {
  const byMonth=new Map(); rows.forEach(r=>{if(!byMonth.has(r[0])) byMonth.set(r[0],[]);byMonth.get(r[0]).push(r);});
  const keys=[...byMonth.keys()].sort(); const svg=document.getElementById('trend');
  if(!keys.length){ svg.innerHTML='<text x="28" y="125" fill="#59697e">No data for this selection</text>';return; }
  const L=47,R=536,T=20,B=216,W=R-L,H=B-T;
  const point=(key,i)=>[L+(keys.length===1?W/2:i*W/(keys.length-1)), B-stats(byMonth.get(key)).onRate/100*H];
  const points=keys.map(point);
  let out='';
  for(let p=0;p<=100;p+=25){const y=B-p/100*H;out+=`<line x1="${L}" y1="${y}" x2="${R}" y2="${y}" stroke="#e0e8f2"/><text x="${L-8}" y="${y+4}" text-anchor="end" font-size="11" fill="#59697e">${p}%</text>`;}
  out+=`<polyline points="${points.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round"/>`;
  points.forEach((p,i)=>{out+=`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#2563eb"><title>${keys[i]}: ${pct(stats(byMonth.get(keys[i])).on,byMonth.get(keys[i]).length)}</title></circle>`;
    if(keys.length<=6 || i%2===0){out+=`<text x="${p[0]}" y="${B+24}" fill="#59697e" font-size="11" text-anchor="middle">${keys[i].slice(5)}</text>`;}});
  svg.innerHTML=out;
}
function render(){
 const wi=whSel.value, ci=catSel.value;
 const rows=data.filter(r=>(wi==='all'||r[1]===Number(wi))&&(ci==='all'||r[2]===Number(ci)));
 const totals=stats(rows);
 document.getElementById('shipments').textContent=totals.count.toLocaleString('en-GB');
 document.getElementById('ontime').textContent=pct(totals.on,totals.count);
 document.getElementById('stockout').textContent=pct(totals.stock,totals.count);
 document.getElementById('cost').textContent=totals.count?money(totals.cost/totals.count):'—';
 trendChart(rows);
 let bars='', body='';
 warehouses.forEach((name,i)=>{const rs=rows.filter(r=>r[1]===i), s=stats(rs);
 if(!s.count)return;
 bars+=`<div class="barrow"><span>${name}</span><div class="track"><div class="fill" style="width:${s.onRate.toFixed(2)}%"></div></div><strong>${pct(s.on,s.count)}</strong></div>`;
 body+=`<tr><td>${name}</td><td>${s.count.toLocaleString('en-GB')}</td><td>${pct(s.on,s.count)}</td><td>${pct(s.stock,s.count)}</td><td>${money(s.cost/s.count)}</td></tr>`;
 });
 document.getElementById('warehousebars').innerHTML=bars||'<p class="subtle">No data</p>';
 document.getElementById('tablebody').innerHTML=body||'<tr><td colspan="5">No data for this selection</td></tr>';
}
whSel.addEventListener('change',render); catSel.addEventListener('change',render);render();
