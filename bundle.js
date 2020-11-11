(()=>{"use strict";(()=>{const e=e=>{const t=e.slice();for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}return t},t=(e,t)=>Math.round(Math.random()*(t-e)+e);window.util={Key:{ENTER:"Enter",ESCAPE:"Escape"},getShuffle:e,getRandomNumber:t,getRandomIndex:e=>e[t(0,e.length-1)],getRandomLengthArray:o=>{const n=[],r=e(o),d=t(0,o.length);for(let e=0;e<d;e++){const t=r[e];n.push(t)}return n},getEmptyParent:e=>{e.hasChildNodes()||(e.style.display="none")},getEmptyElem:(e,t)=>{0===Array.from(e).length&&(t.style.display="none")},defineEnding:(e,t,o=[2,0,1,1,1,2])=>t[e%100>4&&e%100<20?2:o[e%10<5?e%10:5]],toggleFormElementsState:(e,t)=>{for(let o of e)o.disabled=t},toggleFormElementsChecked:e=>{for(let t of e)t.checked=!1},checkRemove:e=>{e&&e.remove()},addIdToOffer:e=>(e.forEach(((e,t)=>(e.offer.offerId=t,e.offer.offerId))),e),debounce:(e,t)=>{let o=null;return(...n)=>{o&&window.clearTimeout(o),o=window.setTimeout((()=>{e(...n)}),t)}}}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content.querySelector(".error"),o=document.querySelector("#success").content.querySelector(".success"),n=e=>{const t=()=>{e.remove(),document.removeEventListener("click",o),document.removeEventListener("keydown",n)},o=()=>{t()},n=e=>{e.key===window.util.Key.ESCAPE&&t()};document.addEventListener("click",o),document.addEventListener("keydown",n)};window.messages={showError:o=>{const r=t.cloneNode(!0);r.querySelector(".error__message").textContent=o,n(r),e.insertAdjacentElement("afterbegin",r)},showSuccess:()=>{const t=o.cloneNode(!0);e.insertAdjacentElement("afterbegin",t),n(t)}}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking",t="GET",o="POST",n=(e,t,o)=>{e.responseType="json",e.addEventListener("load",(()=>{200===e.status?t(e.response):o("Ошибка сервера "+e.status)})),e.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),e.addEventListener("timeout",(()=>{o(`Запрос не успел выполниться за ${e.timeout} мс`)})),e.timeout=1e4};window.backend={load:(o,r)=>{const d=new XMLHttpRequest;n(d,o,r),d.open(t,e+"/data"),d.send()},upload:(t,r,d)=>{const i=new XMLHttpRequest;n(i,r,d),i.open(o,""+e),i.send(t)}}})(),(()=>{const e={palace:1e4,house:5e3,flat:1e3,bungalow:0},t="Опция 100 комнат доступна только не для гостей",o='Опция "не для гостей" доступна только для 100 комнат',n="Количество гостей не может быть больше, чем количество комнат",r=document.querySelector(".map"),d=document.querySelector(".ad-form"),i=d.querySelector("#room_number"),a=d.querySelector("#capacity"),s=d.querySelector("#title"),c=d.querySelector("#type"),l=d.querySelector("#price"),u=d.querySelector("#timein"),m=d.querySelector("#timeout"),p=document.querySelectorAll("select"),w=document.querySelectorAll("fieldset"),y=e=>{const r=e.target,d=parseInt(i.value,10),s=parseInt(a.value,10);i.setCustomValidity(""),a.setCustomValidity(""),100===d&&0!==s?r.setCustomValidity(t):100!==d&&0===s?r.setCustomValidity(o):d<s?r.setCustomValidity(n):r.setCustomValidity(""),r.reportValidity()},f=e=>{u.value=e.target.value,m.value=e.target.value},g=()=>{const t=c.value;l.min=e[t],l.placeholder=e[t]},v=()=>{d.reset(),window.main.deactivatePage(),window.messages.showSuccess()};window.util.toggleFormElementsState(w,!0),window.util.toggleFormElementsState(p,!0),g(),s.addEventListener("change",(()=>{const e=s.value.length;e<30?s.setCustomValidity(`Ещё  ${30-e} симв.`):e>100?s.setCustomValidity(`Удалите лишние ${e-100} симв.`):s.setCustomValidity("")})),i.addEventListener("change",y),a.addEventListener("change",y),u.addEventListener("change",f),m.addEventListener("change",f),c.addEventListener("change",g),l.addEventListener("change",(()=>{const t=l.value,o=c.value;t<e[o]?l.setCustomValidity(`Минимaльная цена для данного типа ${e[o]} руб.`):t>1e6?l.setCustomValidity("Максимальная цена за ночь 1000000 руб."):l.setCustomValidity(""),l.reportValidity()})),d.addEventListener("submit",(e=>{e.preventDefault(),y({target:i}),d.checkValidity()&&(window.backend.upload(new FormData(d),v,window.messages.showError),window.pin.resetMainAddress())})),window.form={onTypeCheck:g,toggle:(e,t)=>{r.classList[e]("map--faded"),d.classList[e]("ad-form--disabled"),window.util.toggleFormElementsState(w,t),window.util.toggleFormElementsState(p,t)}}})(),(()=>{const e=["комната","комнаты","комнат"],t=["гостя","гостей","гостей"],o={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},n=document.querySelector(".map"),r=document.querySelector("#card").content.querySelector(".map__card"),d=document.querySelector(".map__filters-container");let i=null;const a=e=>{e.key===window.util.Key.ESCAPE&&s()},s=()=>{const e=n.querySelector(".map__pin--active");i&&(e.classList.remove("map__pin--active"),i.remove(),document.removeEventListener("keydown",a))};window.card={open:c=>{const l=c.target.closest("button[data-id]"),u=n.querySelector(".map__pin--active"),m=parseInt(l.dataset.id,10);u&&u.classList.remove("map__pin--active"),l.classList.add("map__pin--active"),(c=>{i&&i.remove(),document.addEventListener("keydown",a);const l=(n=>{const{author:d,offer:a}=n,{avatar:s}=d,{title:c,address:l,price:u,checkin:m,checkout:p,description:w,type:y,rooms:f,guests:g,features:v,photos:E}=a,h=r.cloneNode(!0);if(a){const n=h.querySelector(".popup__title"),r=h.querySelector(".popup__text--address"),d=h.querySelector(".popup__text--price"),a=h.querySelector(".popup__text--time"),_=h.querySelector(".popup__description"),S=h.querySelector(".popup__features"),q=h.querySelector(".popup__type"),L=h.querySelector(".popup__text--capacity"),k=h.querySelector(".popup__photos"),I=h.querySelector(".popup__avatar");n.textContent=c,r.textContent=l,d.textContent=u+"₽/ночь",a.textContent=`Заезд после ${m}, выезд до ${p}`,_.textContent=w,q.textContent=o[y],L.textContent=((o,n)=>{let r="";return r=`${o} ${window.util.defineEnding(o,e)}\n    для ${n} ${window.util.defineEnding(n,t)}`,r})(f,g),I.src=s,S.innerHTML="",k.innerHTML="",v.forEach((e=>{const t=document.createElement("li");t.className="popup__feature popup__feature--"+e,S.appendChild(t)})),E.forEach((e=>{const t=document.createElement("img");t.width=45,t.height=40,t.classList.add("popup__photo"),t.src=e,t.alt="Фото объекта",k.appendChild(t)})),window.util.getEmptyElem(c,n),window.util.getEmptyElem(l,r),window.util.getEmptyElem(u,d),window.util.getEmptyElem(m,a),window.util.getEmptyElem(p,a),window.util.getEmptyElem(w,q),window.util.getEmptyElem(s,I),window.util.getEmptyParent(S),window.util.getEmptyParent(k),i=h}else h.remove();return h})(c);n.insertBefore(l,d);const u=n.querySelector(".popup__close");u.addEventListener("mousedown",(()=>{s()})),u.addEventListener("keydown",(e=>{e.key===window.util.Key.ENTER&&s()}))})(window.dataWithId.find((e=>e.offer.offerId===m)))},remove:()=>{const e=document.querySelector(".map__card");e&&e.remove()}}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector(".map__pin--main"),o=document.querySelector(".ad-form"),n=document.querySelector(".ad-form__reset");let r=!1;const d=e=>{window.dataWithId=window.util.addIdToOffer(e),window.pin.render(window.filter.getData(window.dataWithId))},i=()=>{r||(r=!0,window.form.toggle("remove",!1),window.backend.load(d,window.messages.showError),window.pin.getMainAddress(r))},a=()=>{const e=document.querySelector(".map__card"),t=document.querySelector(".ad-form-header__preview img"),o=document.querySelector(".ad-form__photo img"),n=document.querySelectorAll("input[type=checkbox]");r=!1,t.src="img/muffin-grey.svg",window.util.toggleFormElementsChecked(n),window.util.checkRemove(e),window.util.checkRemove(o),window.pin.remove(),window.pin.getMainAddress(r),window.form.toggle("add",!0)};t.addEventListener("mousedown",(e=>{0===e.button&&i()})),t.addEventListener("keydown",(e=>{e.key===window.util.Key.ENTER&&i()})),e.addEventListener("mousedown",(e=>{0===e.button&&e.target.closest("button[data-id]")&&window.card.open(e)})),e.addEventListener("keydown",(e=>{e.key===window.util.Key.ENTER&&e.target.closest("button[data-id]")&&window.card.open(e)})),n.addEventListener("click",(()=>{o.reset(),window.form.onTypeCheck(),window.pin.resetMainAddress(),a()})),window.main={isPageActive:r,activatePage:i,deactivatePage:a}})(),(()=>{const e="any",t={low:{min:0,max:1e4},middle:{min:1e4,max:5e4},high:{min:5e4,max:1/0}},o=document.querySelector(".map__filters-container"),n=o.querySelector("#housing-type"),r=o.querySelector("#housing-price"),d=o.querySelector("#housing-rooms"),i=o.querySelector("#housing-guests"),a=o.querySelector("#housing-features").querySelectorAll('input[name="features"]'),s=o=>r.value===e||o.offer.price<=t[r.value].max&&o.offer.price>=t[r.value].min,c=t=>d.value===e||t.offer.rooms===parseInt(d.value,10),l=t=>i.value===e||t.offer.guests===parseInt(i.value,10),u=e=>{for(let t=0;t<a.length;t++)if(a[t].checked&&!e.offer.features.includes(a[t].value))return!1;return!0},m=t=>{let o=[];for(let d=0;d<t.length;d++)o.length<5&&(r=t[d],n.value===e||r.offer.type===n.value)&&s(t[d])&&c(t[d])&&l(t[d])&&u(t[d])&&o.push(t[d]);var r;return o};o.addEventListener("change",window.util.debounce((()=>{const e=m(window.dataWithId);window.card.remove(),window.pin.remove(),window.pin.render(e)}),500)),window.filter={getData:m}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector("#pin").content.querySelector(".map__pin"),o=document.querySelector(".map__pin--main"),n=document.querySelector("#address"),r=e=>{const t=parseInt(o.style.left,10),r=parseInt(o.style.top,10),d=Math.round(t+32.5),i=Math.round(e?r+65+22:r+32.5);n.value=`${d}, ${i}`};r(window.main.isPageActive),window.pin={MAIN_PIN_SIZE:65,MAIN_PIN_TAIL:22,render:o=>{const n=document.createDocumentFragment();o.forEach((e=>{const o=(e=>{const o=t.cloneNode(!0),n=o.querySelector("img");return o.style.left=e.location.x-25+"px",o.style.top=e.location.y-70+"px",n.src=e.author.avatar,n.alt=e.offer.title,o.dataset.id=e.offer.offerId,o})(e);n.appendChild(o)})),e.appendChild(n)},remove:()=>{const e=document.querySelectorAll("button[data-id]");return e.forEach((e=>{e.remove()})),e},getMainAddress:r,resetMainAddress:()=>{o.style.left="570px",o.style.top="374px"}}})(),(()=>{const e=window.pin.MAIN_PIN_SIZE/2,t=0-e,o=window.pin.MAIN_PIN_SIZE+window.pin.MAIN_PIN_TAIL,n=130-o,r=630-o,d=document.querySelector(".map__pins"),i=document.querySelector(".map__pin--main");i.addEventListener("mousedown",(o=>{o.preventDefault();let a={x:o.clientX,y:o.clientY};const s=o=>{let s,c;o.preventDefault();let l=a.x-o.clientX,u=a.y-o.clientY;a={x:o.clientX,y:o.clientY},s=i.offsetTop-u,c=i.offsetLeft-l,i.style.top=s<n?n+"px":s>r?r+"px":s+"px",c<t?i.style.left=t+"px":c>d.offsetWidth-e?i.style.left=d.offsetWidth-e+"px":i.style.left=c+"px",window.pin.getMainAddress(window.main.isPageActive)},c=e=>{e.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",c)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",c)}))})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),o=document.querySelector(".ad-form__upload input[type=file]"),n=document.querySelector(".ad-form-header__preview img"),r=document.querySelector(".ad-form__photo"),d=(t,o)=>{const n=t.files[0];if(e.some((function(e){return n.type.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){o.src=e.result})),e.readAsDataURL(n)}};t.addEventListener("change",(()=>{d(t,n)})),o.addEventListener("change",(()=>{r.innerHTML='<img alt="Фото объекта" width="70" height="70">';const e=r.querySelector("img");d(o,e)}))})()})();