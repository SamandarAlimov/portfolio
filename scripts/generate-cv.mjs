/**
 * Self-contained, zero-dependency generator for a readable, one-page PDF CV.
 * Produces real searchable PDF text; no photo, rasterization, bars or fake claims.
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cv = JSON.parse(await readFile(join(root, 'src', 'resume.json'), 'utf8'));
const dest = join(root, 'public', 'cv', 'Samandar_Alimov_CV.pdf');
const W=595.28, H=841.89, X=47, RIGHT=548;
const INK=[.095,.105,.12], GRAY=[.39,.42,.46], BLUE=[.027,.357,1], HAIR=[.88,.9,.92];
const ops=[], annotations=[];
const num=v=>Number(v.toFixed(2)).toString();
const fill=([r,g,b])=>[r,g,b].map(num).join(' ')+' rg';
const stroke=([r,g,b])=>[r,g,b].map(num).join(' ')+' RG';
const clean=v=>String(v).replace(/[\u2013\u2014]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u00b7\u2022]/g,' / ').replace(/[^\x20-\x7e]/g,'').replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
const py=t=>num(H-t);
const line=(l,t,r,w=.65,c=HAIR)=>ops.push(stroke(c)+' '+num(w)+' w '+num(l)+' '+py(t)+' m '+num(r)+' '+py(t)+' l S');
const rect=(x,t,w,h,c)=>ops.push(fill(c)+' '+num(x)+' '+py(t+h)+' '+num(w)+' '+num(h)+' re f');
const text=(x,t,v,s=9,b=false,c=INK)=>ops.push('BT '+fill(c)+' /'+(b?'F2':'F1')+' '+num(s)+' Tf 1 0 0 1 '+num(x)+' '+py(t)+' Tm ('+clean(v)+') Tj ET');
const right=(t,v,s=9,b=false,c=GRAY)=>text(RIGHT-String(v).length*s*(b?.54:.49),t,v,s,b,c);
const heading=(t,v)=>{text(X,t,v.toUpperCase(),9.7,true,BLUE);line(X+125,t-3,RIGHT);};
function paragraph(v,x,t,w,s=9.1,leading=13.5,c=INK){
 let yy=t;
 for(const p of String(v).split('\n')) {
  let words=[],estimated=0;
  for(const word of p.split(/\s+/)) {
   const space=(word.length+1)*s*.48;
   if(estimated+space>w&&words.length){text(x,yy,words.join(' '),s,false,c);yy+=leading;words=[word];estimated=space;}
   else {words.push(word);estimated+=space;}
  }
  if(words.length){text(x,yy,words.join(' '),s,false,c);yy+=leading;}
 }
 return yy;
}
function experience(t,item){
 text(X,t,item.title,10,true);
 right(t,item.period,8.6,true,GRAY);
 text(X,t+14,item.organization,8.65,false,GRAY);
 let yy=t+31;
 for(const itemText of item.points){rect(X,yy-7.1,2.8,2.8,BLUE);yy=paragraph(itemText,X+13,yy,RIGHT-X-14,8.85,12.3);yy+=1.8;}
 return yy;
}
function link(x,top,w,h,url){annotations.push({x,top,w,h,url});}

rect(X,43,42,3.1,BLUE);
text(X+54,46.3,'CURRICULUM VITAE  /  2026',8.1,true,GRAY);
right(46.3,'01 / PROFESSIONAL PROFILE',8,true,GRAY);
text(X,87,'SAMANDAR ALIMOV',31.8,true);
text(X,109,cv.fullName,9,false,GRAY);
text(X,134,cv.headline.toUpperCase(),11.4,true,BLUE);
line(X,146,RIGHT,.9);
text(X,164,cv.location+'    |    '+cv.email+'    |    '+cv.phone,9.15);
link(139,153,175,17,'mailto:'+cv.email);
text(X,179,cv.github+'    |    '+cv.website,9.1,false,GRAY);
link(X,168,167,15,'https://'+cv.github);
link(215,168,106,15,'https://'+cv.website);

heading(211,'Profile');
let end=paragraph(cv.summary,X,233,RIGHT-X,9.13,13.55);
if(end>299)throw new Error('CV summary too long: '+end);
heading(307,'Experience');
let e=327;for(const item of cv.experience)e=experience(e,item)+10;
if(e>524)throw new Error('CV experience too long: '+e);
heading(525,'Selected projects');
let p=545;
for(const item of cv.projects){
 text(X,p,item.name,9.5,true);
 p=paragraph(item.description,X+116,p,RIGHT-(X+116),8.6,11.7,GRAY)+10;
}
if(p>646)throw new Error('CV projects too long: '+p);
heading(652,'Education & training');
let ed=670;
for(const item of cv.education){text(X,ed,item.title,9.3,true);text(X,ed+13,item.detail,8.7,false,GRAY);ed+=34;}
if(ed>748)throw new Error('CV education too long: '+ed);
heading(751,'Technical skills');
paragraph(cv.skills,X,768,RIGHT-X,8.8,12.7);
text(X,799,'LANGUAGES',8,true,GRAY);
text(X+74,799,cv.languages,8.5);
line(X,811,RIGHT,.8);
text(X,825,'SAMANDAR ALIMOV   /   CV 2026',7.4,true,GRAY);
right(825,'ONE PAGE. SUBSTANCE FIRST.',7.2,true,GRAY);

const stream=ops.join('\n')+'\n';
const objects=[];
const add=v=>(objects.push(v),objects.length);
const catalog=add('<< /Type /Catalog /Pages 2 0 R >>');
const pages=add('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
const page=add('');
const regular=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
const bold=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
const contents=add('<< /Length '+Buffer.byteLength(stream,'binary')+' >>\nstream\n'+stream+'endstream');
const ann=[];
for(const a of annotations) ann.push(add('<< /Type /Annot /Subtype /Link /Border [0 0 0] /Rect ['+num(a.x)+' '+py(a.top+a.h)+' '+num(a.x+a.w)+' '+py(a.top)+'] /A << /S /URI /URI ('+clean(a.url)+') >> >>'));
objects[page-1]='<< /Type /Page /Parent '+pages+' 0 R /MediaBox [0 0 '+W+' '+H+'] /Resources << /Font << /F1 '+regular+' 0 R /F2 '+bold+' 0 R >> >> /Contents '+contents+' 0 R /Annots ['+ann.map(i=>i+' 0 R').join(' ')+'] >>';
let output='%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
const offsets=[0];
for(let i=0;i<objects.length;i++){offsets.push(Buffer.byteLength(output,'binary'));output+=(i+1)+' 0 obj\n'+objects[i]+'\nendobj\n';}
const start=Buffer.byteLength(output,'binary');
output+='xref\n0 '+(objects.length+1)+'\n0000000000 65535 f \n';
for(let i=1;i<offsets.length;i++)output+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
output+='trailer\n<< /Size '+(objects.length+1)+' /Root '+catalog+' 0 R >>\nstartxref\n'+start+'\n%%EOF\n';
await mkdir(dirname(dest),{recursive:true});
await writeFile(dest,Buffer.from(output,'binary'));
console.log('Professional CV PDF generated:',dest);
