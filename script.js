
document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu"), mobile=document.querySelector(".mobile-nav");
  if(menu) menu.addEventListener("click",()=>mobile.classList.toggle("open"));

  // Hero slider
  const slides=[...document.querySelectorAll(".slide")], dots=[...document.querySelectorAll(".dot")];
  let current=0, timer;
  function show(i){
    if(!slides.length) return;
    current=(i+slides.length)%slides.length;
    slides.forEach((s,n)=>s.classList.toggle("active",n===current));
    dots.forEach((d,n)=>d.classList.toggle("active",n===current));
  }
  function auto(){clearInterval(timer);timer=setInterval(()=>show(current+1),5000)}
  dots.forEach((d,i)=>d.addEventListener("click",()=>{show(i);auto()}));
  document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>{show(current+1);auto()}));
  document.querySelectorAll("[data-prev]").forEach(b=>b.addEventListener("click",()=>{show(current-1);auto()}));
  show(0); auto();

  // Scroll reveal
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

  // FAQ
  document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>q.parentElement.classList.toggle("open")));

  // GPA demo calculator
  const calc=document.querySelector("#gpaCalc");
  if(calc) calc.addEventListener("submit",e=>{
    e.preventDefault();
    const marks=[...calc.querySelectorAll("input")].map(x=>Number(x.value)||0);
    const avg=marks.reduce((a,b)=>a+b,0)/(marks.length||1);
    const g=Math.min(10,Math.max(0,(avg/10))).toFixed(2);
    document.querySelector("#gpaResult").textContent=g;
  });

  // Forms are demo-only, no accidental navigation.
  document.querySelectorAll("form[data-demo]").forEach(f=>f.addEventListener("submit",e=>{
    e.preventDefault(); alert("Thanks! Your request has been recorded for this demo.");
  }));
});

function student(){try{return JSON.parse(localStorage.getItem("stacklyStudent")||"null")}catch(e){return null}}
const sf=document.querySelector("#signupForm");if(sf)sf.addEventListener("submit",e=>{e.preventDefault();localStorage.setItem("stacklyStudent",JSON.stringify({name:signupName.value.trim(),email:signupEmail.value.trim(),program:signupProgram.value}));signupMsg.textContent="Account created successfully.";signupMsg.className="form-message success";setTimeout(()=>location.href="dashboard.html",300)});
const lf=document.querySelector("#loginForm");if(lf)lf.addEventListener("submit",e=>{e.preventDefault();const s=student()||{name:loginEmail.value.split("@")[0],email:loginEmail.value,program:"Web Development"};localStorage.setItem("stacklyStudent",JSON.stringify(s));loginMsg.textContent="Login successful.";loginMsg.className="form-message success";setTimeout(()=>location.href="dashboard.html",300)});
if(location.pathname.includes("dashboard.html")){const s=student();if(!s)location.href="login.html";else{dashName.textContent=s.name||"Learner";dashProgram.textContent=s.program||"Web Development"}}
const lo=document.querySelector("#logoutBtn");if(lo)lo.onclick=()=>{localStorage.removeItem("stacklyStudent");location.href="login.html"};
