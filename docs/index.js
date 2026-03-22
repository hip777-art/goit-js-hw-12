import{a as b,S as L,i as s}from"./assets/vendor-DQvd0HNi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&f(u)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const v="55031673-78c5d9f5db54785dbd85479b8",w="https://pixabay.com/api/",M=15;async function m(e,r=1){const{data:a}=await b.get(w,{params:{q:e,key:v,page:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:M}});return a}let S=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:120,fadeSpeed:80,preloading:!0});const n={form:document.querySelector(".form"),ulGallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".btnLoadMore")};function q(e){return`<li>
        <a href="${e.largeImageURL}">
          <div>
            <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          </div>
          <div class="info">
            <div class="info-item">
              <b>Likes</b>
              <span>${e.likes}</span>
            </div>
            <div class="info-item">
              <b>Views</b>
              <span>${e.views}</span>
            </div>
            <div class="info-item">
              <b>Comments</b>
              <span>${e.comments}</span>
            </div>
            <div class="info-item">
              <b>Downloads</b>
              <span>${e.downloads}</span>
            </div>
          </div>
        </a>
      </li>`}function P(e){return e.map(q).join(`
`)}function p(e){const r=P(e);n.ulGallery.insertAdjacentHTML("beforeend",r),S.refresh()}function $(){n.ulGallery.innerHTML=""}function y(){n.loader.style.display="block"}function i(){n.loader.style.display="none"}function E(){n.btnLoadMore.style.display="block"}function d(){n.btnLoadMore.style.display="none"}let l=1,c="",g=0;d();n.form.addEventListener("submit",async e=>{if(e.preventDefault(),y(),d(),c=new FormData(n.form).get("search-text").trim(),c===""){s.error({title:"Error",message:"Please enter a search query"}),i();return}l=1,e.target.reset(),$();try{const a=await m(c,l);if(i(),a.hits.length===0){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}g=Math.ceil(a.totalHits/15),p(a.hits),h()}catch(a){i(),console.log(a),s.error({title:"Error",message:`An error occurred while fetching images: ${a.message}`})}});n.btnLoadMore.addEventListener("click",async()=>{l+=1,y(),d();try{const e=await m(c,l);i(),p(e.hits),h(),D()}catch(e){i(),console.log(e),s.error({title:"Error",message:`An error occurred while fetching images: ${e.message}`})}});function h(){l>=g?(s.info({title:"Info",message:"Це була остання сторінка"}),d()):E()}function D(){const e=n.ulGallery.lastElementChild,r=e.getBoundingClientRect().height;console.log(r),console.log(e),window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
