"use strict";
let model;
const $ = id => document.getElementById(id);
fetch('model.json').then(r => {if (!r.ok) throw new Error('No se pudo cargar model.json'); return r.json();}).then(data=>{model=data;$('run').disabled=false;$('run').textContent='Calcular estimación';$('loading').textContent='Modelo cargado. Los cálculos se realizan en tu dispositivo.';}).catch(e=>{$('loading').textContent='Error al cargar el modelo: '+e.message+'. Abre la página desde GitHub Pages, no con file://.';});
$('predictor').addEventListener('submit',e=>{e.preventDefault();if(!model)return;
const x=[$('age').value,$('weight').value,$('muscle').value].map(Number);
if(x.some(n=>!Number.isFinite(n))){alert('Introduce valores numéricos válidos.');return;}
const z=model.intercept+x.reduce((s,v,i)=>s+model.coefficients[i]*(v-model.means[i])/model.scales[i],0);
const prob=1/(1+Math.exp(-z));const value=(prob*100).toFixed(1);
$('percent').textContent=value+'%';$('barfill').style.width=value+'%';
$('interpretation').textContent=prob>=.5?'Clasificación experimental (umbral 50%): DMO baja':'Clasificación experimental (umbral 50%): no clasificada como DMO baja';
const names=['edad','peso','masa muscular'];const ranges=[model.trainingRanges.age,model.trainingRanges.weight,model.trainingRanges.muscle];const out=x.map((n,i)=>n<ranges[i][0]||n>ranges[i][1]?names[i]+' ('+ranges[i][0]+'–'+ranges[i][1]+')':null).filter(Boolean);
$('range').classList.toggle('hidden',out.length===0);$('range').textContent=out.length?'Precaución: fuera del rango observado en la muestra de entrenamiento: '+out.join(', ')+'. La extrapolación puede ser poco fiable.':'';
$('result').classList.remove('hidden');$('result').scrollIntoView({behavior:'smooth',block:'nearest'});
});