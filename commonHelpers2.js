import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */let c;document.addEventListener("DOMContentLoaded",()=>{const t=l(),e=document.querySelector("[data-start]"),o=document.querySelector(".timer");e.disabled=!0,e.addEventListener("click",()=>m(t,o))});function l(){const t=document.querySelector("[data-start]");return flatpickr("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){const n=o[0];n&&n>new Date?t.removeAttribute("disabled"):(t.setAttribute("disabled","disabled"),iziToast.error({title:"Error",message:"Please choose a date in the future."}))}})}function m(t,e){const o=document.querySelector("[data-start]"),n=t.selectedDates[0];n&&n>new Date&&!c&&(o.disabled=!0,t._input.disabled=!0,c=setInterval(()=>{const a=n-new Date;if(a<=0)clearInterval(c),u(e,0,0,0,0),iziToast.success({title:"Success",message:"Countdown completed!"}),t._input.disabled=!1,c=void 0;else{const{days:i,hours:s,minutes:r,seconds:d}=h(a);u(e,i,s,r,d)}},1e3))}function u(t,e,o,n,a){["days","hours","minutes","seconds"].forEach(s=>{const r={days:e,hours:o,minutes:n,seconds:a}[s];t.querySelector(`[data-${s}]`).textContent=f(r)})}function f(t){return t.toString().padStart(2,"0")}function h(t){const i=Math.floor(t/864e5),s=Math.floor(t%864e5/36e5),r=Math.floor(t%864e5%36e5/6e4),d=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:s,minutes:r,seconds:d}}
//# sourceMappingURL=commonHelpers2.js.map