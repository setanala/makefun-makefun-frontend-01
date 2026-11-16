import {getBounties,getBounty,getLeaderboard,getProfile} from './api.js';
import {boardView,mountBoard} from './views/board.js';
import {esc} from './format.js';
const root=document.querySelector('#app');let generation=0,refreshTimer;
function scheduleRefresh(){refreshTimer=setTimeout(()=>{if(document.activeElement?.matches('input,textarea'))scheduleRefresh();else render()},60000)}
async function render(){clearTimeout(refreshTimer);const id=++generation;window.__shotReady=false;root.innerHTML='<div class="loading" role="status" aria-label="Loading"><span></span><span></span><span></span></div>';scrollTo(0,0);document.title='make.fun bounties — fast open client';try{const parts=location.hash.replace(/^#\/?/,'').split('/').filter(Boolean).map(decodeURIComponent);let html,wire;
if(!parts.length){html=boardView(await getBounties());wire=mountBoard}
else if(parts[0]==='bounty'&&parts[1]&&parts.length<=3){const slug=parts[1];if(parts[2]==='leaderboard'){const {leaderboardView}=await import('./views/leaderboard.js');html=leaderboardView(await getLeaderboard(slug),slug)}else if(parts.length===2){const {bountyView}=await import('./views/bounty.js');html=bountyView(await getBounty(slug))}else throw new Error('This page does not exist.');}
else if(parts[0]==='u'&&parts.length===2){const {profileView}=await import('./views/profile.js');html=profileView(await getProfile(parts[1]))}
else throw new Error('This page does not exist.');
if(id!==generation)return;root.innerHTML=html;wire?.(root);document.title=(root.querySelector('h1')?.textContent||'Bounties')+' — make.fun';scheduleRefresh();
}catch(e){if(id!==generation)return;root.innerHTML=`<section class="error"><h1>Couldn’t load this page</h1><p>${esc(e.message||'Please try again.')}</p><a class="button" id="retry" href="${esc(location.hash||'#/')}">Retry</a> <a href="#/">Back to board</a></section>`;root.querySelector('#retry').addEventListener('click',e=>{e.preventDefault();render()})}if(id===generation)window.__shotReady=true}
addEventListener('hashchange',render);render();
