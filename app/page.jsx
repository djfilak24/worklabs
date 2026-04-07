'use client';
import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────
const CONTENT = {
  tagline:    "The future of design consulting",
  tagline2:   "is building,",
  subtagline: "not just drawing.",
  heroBody:   "A living proof of concept. We're designers who ship software, strategists who build tools, and consultants who don't wait for someone else to execute the idea.",
  networkHeadline: "A collective intelligence.",
  networkBody: "Every practice has a mastermind — the accumulated intelligence of a team. AI didn't create ours. It just gave it somewhere to go. No longer held up by development or execution. Ideas inform products now shipping at record speed.",
  networkNodes: ["Strategy","Design","Research","AI","Clients","Tools","Ideas"],
  manifestoHeadline: "Why are interior designers making apps?",
  manifestoParas: [
    "We spend a lot of time thinking about the tasks and conditions that make up work. It's all one big mix of in-person and virtual, permanent and disposable, authentic and transactional — the clash between best intentions and brutal reality.",
    "We've always helped people navigate the physical part of this world, guiding them toward harmony and clarity. Now that the boundaries between the physical and digital are almost non-existent, apps seem like a natural next step.",
    "We intentionally choose to be optimistic about AI. Our belief is that there are now different ways to approach everything we do, and they can yield surprising results. It's hard not to be excited.",
  ],
  authors: "Jeff Cumpson & Dave Filak — NELSON Worldwide",
  stats: [
    { value:9,  label:"Projects in the lab",  icon:"◎", color:"#00BADC",  badge:"Live"      },
    { value:3,  label:"Live & deployed",       icon:"◉", color:"#34D399",  badge:"Deployed"  },
    { value:5,  label:"Categories of work",    icon:"◈", color:"#A78BFA",  badge:"Active"    },
    { value:2,  label:"Authors",               icon:"◐", color:"#F59E0B",  badge:"Building"  },
  ],
  labHeader:    "The Lab",
  labSubhead:   "Everything we're building, shipping, and exploring.",
  categories: ["All","Client Tools","Internal Tools","Capabilities","Agent Workflows","Thought Leadership","Experiments"],
  projects: [
    { id:1, name:"Amenity Sprint", category:"Client Tools", status:"Live", url:"https://amenitysprint.vercel.app", tagline:"Benchmark amenities. Make the case for investment.",
      body:{ purpose:"Building owners struggle to justify amenity spend without market context. Amenity Sprint gives them a structured framework to benchmark their current offering against tenant expectations.", whatItDoes:"A diagnostic intake tool that scores amenity categories, cross-references market data, and generates a prioritized investment roadmap.", whoItsFor:"Asset owners, property managers, and brokers making the case for repositioning spend.", maturity:"Live and deployed. Actively used in client conversations." }},
    { id:2, name:"Work Labs", category:"Client Tools", status:"Live", url:null, tagline:"The repository you're looking at right now.",
      body:{ purpose:"A front-end for everything we're building — proof that design consultants can ship software.", whatItDoes:"Filterable card repository of tools, articles, workflows, and experiments.", whoItsFor:"Clients, collaborators, and anyone curious about where workplace consulting is going.", maturity:"Live. Continuously updated as new work ships." }},
    { id:3, name:"Pipeline Dashboard", category:"Internal Tools", status:"Prototype", url:null, tagline:"See where revenue is healthy — before it's too late.",
      body:{ purpose:"Most studios have a pipeline problem they can't see clearly. This dashboard surfaces pre-award gaps and workload imbalances in real time.", whatItDoes:"Pulls Monday.com project data, applies a two-layer pipeline model, and visualizes health by team, service line, and time horizon.", whoItsFor:"Practice leads and studio directors managing a multi-service business.", maturity:"Working prototype. Data model validated. UI in active development." }},
    { id:4, name:"AI Design Feedback Loop", category:"Capabilities", status:"Prototype", url:null, tagline:"Structured critique from an LLM that's seen your work.",
      body:{ purpose:"Design reviews are expensive and inconsistent. This gives designers immediate structured feedback before anything goes to a client.", whatItDoes:"Routes design images through an LLM prompt chain tuned for spatial quality, brand alignment, and tenant experience scoring.", whoItsFor:"Interior designers who want faster feedback loops without waiting for a full internal review.", maturity:"Capability proven. Being productized into a repeatable workflow." }},
    { id:5, name:"Cinematic Page Pipeline", category:"Agent Workflows", status:"Live", url:null, tagline:"Design → templatize → deploy. In a single session.",
      body:{ purpose:"Every client engagement deserves a landing page. This pipeline makes it possible to go from brief to deployed site in hours, not weeks.", whatItDoes:"A 3-lane Claude workflow: design the JSX artifact in chat, templatize for handoff, deploy to Vercel. Reusable component shelf included.", whoItsFor:"Dave, Jeff, and any NELSON collaborator who needs a fast, high-quality branded page.", maturity:"Live and formalized as a reusable skill. This page was built with it." }},
    { id:6, name:"From Mandate to Magnet", category:"Thought Leadership", status:"Live", url:null, tagline:"Stop mandating the office. Start making it worth returning to.",
      body:{ purpose:"The return-to-office conversation has been framed wrong. This framework reorients the debate around behavioral strategy and workplace gravity.", whatItDoes:"A two-part article series and presentation framework giving workplace leaders a new vocabulary and practical playbook.", whoItsFor:"HR leaders, real estate executives, and workplace strategists navigating the mandate vs. magnet tension.", maturity:"Published. Being adapted into a client workshop format." }},
    { id:7, name:"AI Onboarding App", category:"Experiments", status:"Prototype", url:null, tagline:"A 'Start Here' ramp for non-technical teammates.",
      body:{ purpose:"AI adoption stalls when non-technical users don't know where to begin. This gives them a structured, low-anxiety entry point.", whatItDoes:"A guided onboarding experience powered by Gemini API that walks users through their first real AI workflow.", whoItsFor:"Studio staff and project managers who keep saying 'I should really start using AI' but haven't.", maturity:"Functional prototype built in a single session. Needs UX polish before broader rollout." }},
    { id:8, name:"NoMad Tower Repositioning", category:"Thought Leadership", status:"Live", url:null, tagline:"The buildings that survive will have a story to tell.",
      body:{ purpose:"Mid-market Manhattan office assets are under pressure. This piece establishes a repositioning framework using NoMad Tower as the case study.", whatItDoes:"A long-form article and supporting deck walking through strategic repositioning logic — market context to design intervention to tenant narrative.", whoItsFor:"Building owners, capital partners, and brokers evaluating repositioning potential in challenged markets.", maturity:"Published. Generating inbound interest from asset owners." }},
    { id:9, name:"Spec Suite Page", category:"Client Tools", status:"Live", url:null, tagline:"A dark-mode brand page for a spec suite practice.",
      body:{ purpose:"NELSON's Minneapolis spec suite practice needed a standalone digital presence that matched the quality of the work itself.", whatItDoes:"A cinematic single-page site with editorial scrolling, card-based case studies, and a dark-mode aesthetic signaling premium.", whoItsFor:"Brokers, tenants, and building owners evaluating NELSON's spec suite design capability.", maturity:"Live. Built using the Cinematic Page Pipeline." }},
  ],
};

const STATUS = {
  Live:      { label:"Live",    color:"#00BADC", bg:"rgba(0,186,220,0.15)",  maturity:3 },
  Prototype: { label:"Proto",   color:"#F59E0B", bg:"rgba(245,158,11,0.15)", maturity:2 },
  Concept:   { label:"Concept", color:"#A78BFA", bg:"rgba(167,139,250,0.15)",maturity:1 },
};
const CAT_COLOR = {
  "Client Tools":"#00BADC","Internal Tools":"#94A3B8","Capabilities":"#A78BFA",
  "Agent Workflows":"#F59E0B","Thought Leadership":"#E2E8F0","Experiments":"#34D399",
};
const NODE_COLORS = {
  "Strategy": "#E2E8F0","Design":"#00BADC","Research":"#A78BFA",
  "AI":"#F59E0B","Clients":"#00BADC","Tools":"#94A3B8","Ideas":"#34D399",
};
const BG="#0b0b0d",BG2="#0d0d10",BG3="#080809",FG="#f8f8f8",BLUE="#00BADC";
const LOGO="/logos/nelson-white-bluefin.png";
const STATUS_WORDS=["Synthesizing","Reframing","Questioning","Mapping","Prototyping","Iterating","Validating","Calibrating","Rethinking","Sensing"];

// ─── HOOKS ──────────────────────────────────
function useReveal(threshold=0.12){
  const ref=useRef(null);const [on,setOn]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect();}},{threshold});
    io.observe(el);return()=>io.disconnect();
  },[threshold]);
  return [ref,on];
}
function useIsMobile(){
  const [m,setM]=useState(false);
  useEffect(()=>{const fn=()=>setM(window.innerWidth<640);fn();window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);
  return m;
}

// ─── CSS ────────────────────────────────────
const CSS=`
  .wl *,.wl *::before,.wl *::after{box-sizing:border-box;margin:0;padding:0;}
  @keyframes wlUp    {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes wlIn    {from{opacity:0}to{opacity:1}}
  @keyframes wlLine  {from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes wlModal {from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes wlBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
  @keyframes wlPulse {0%,100%{opacity:0.5}50%{opacity:0.1}}
  @keyframes greenGlow{0%,100%{background:#4ade80;box-shadow:0 0 4px #4ade80,0 0 10px rgba(74,222,128,.4);transform:scale(1);}50%{background:#6ef09a;box-shadow:0 0 8px #4ade80,0 0 18px rgba(74,222,128,.6);transform:scale(1.3);}}
  @keyframes nodePulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
  @keyframes centerBreath{0%,100%{box-shadow:0 0 0 0 rgba(0,186,220,0),0 0 28px rgba(0,186,220,.35)}50%{box-shadow:0 0 0 14px rgba(0,186,220,0),0 0 52px rgba(0,186,220,.55)}}
  @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes liveBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.8)}}
  @keyframes wlOrb1  {0%{transform:translate(0,0) scale(1)}20%{transform:translate(140px,-80px) scale(1.12)}45%{transform:translate(70px,100px) scale(.94)}70%{transform:translate(-100px,40px) scale(1.06)}100%{transform:translate(0,0) scale(1)}}
  @keyframes wlOrb2  {0%{transform:translate(0,0) scale(1)}30%{transform:translate(-120px,60px) scale(1.1)}60%{transform:translate(90px,-100px) scale(.9)}85%{transform:translate(40px,50px) scale(1.05)}100%{transform:translate(0,0) scale(1)}}
  @keyframes wlOrb3  {0%{transform:translate(0,0) scale(1)}25%{transform:translate(80px,50px) scale(1.08)}50%{transform:translate(-60px,90px) scale(.96)}75%{transform:translate(-80px,-40px) scale(1.04)}100%{transform:translate(0,0) scale(1)}}
  @keyframes wlSweep {0%{transform:translateX(-40vw);opacity:0}8%{opacity:1}88%{opacity:.7}100%{transform:translateX(130vw);opacity:0}}
  @keyframes wlMark       {0%{opacity:0;transform:translate(-50%,-50%) scale(.82)}12%{opacity:1;transform:translate(-50%,-50%) scale(1)}78%{opacity:.55;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.04)}}
  @keyframes wlStrikeDraw {from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
  @keyframes wlPulseRing  {0%{transform:scale(1);opacity:.75}100%{transform:scale(1.65);opacity:0}}
  @keyframes wlBounceArrow{0%,100%{transform:translateY(0);opacity:.45}50%{transform:translateY(7px);opacity:.9}}
  @keyframes wlTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes wlBtnPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,186,220,.32),0 0 18px rgba(0,186,220,.12);transform:translateX(-50%) translateY(0)}50%{box-shadow:0 0 0 10px rgba(0,186,220,0),0 0 32px rgba(0,186,220,.28);transform:translateX(-50%) translateY(-3px)}}
  @keyframes wlScrollPulse{0%,100%{opacity:.2;transform:translateY(0)}50%{opacity:.7;transform:translateY(6px)}}

  .wl-card{cursor:pointer;transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s ease,border-color .3s ease;}
  .wl-card:hover,.wl-card.wl-demo{transform:translateY(-6px);box-shadow:0 28px 56px rgba(0,0,0,.65),0 0 0 1px rgba(0,186,220,.3);border-color:rgba(0,186,220,.25)!important;}
  .wl-card-img-inner{transition:transform .5s cubic-bezier(.22,1,.36,1);}
  .wl-card:hover .wl-card-img-inner,.wl-card.wl-demo .wl-card-img-inner{transform:scale(1.04);}
  .wl-card:hover .wl-tagline,.wl-card.wl-demo .wl-tagline{opacity:1!important;transform:translateY(0)!important;}
  .wl-catpill{cursor:pointer;transition:background .18s,border-color .18s;}
  .wl-nl{transition:color .2s;}.wl-nl:hover{color:#f8f8f8!important;}
  .wl::-webkit-scrollbar{width:5px}.wl::-webkit-scrollbar-track{background:#090909}.wl::-webkit-scrollbar-thumb{background:#222228;border-radius:3px}
  .wl-mscroll::-webkit-scrollbar{width:4px}.wl-mscroll::-webkit-scrollbar-track{background:transparent}.wl-mscroll::-webkit-scrollbar-thumb{background:#2a2a30;border-radius:2px}
`;

// ─── DYNAMIC ISLAND ─────────────────────────
function BlinkCursor(){
  const [on,setOn]=useState(true);
  useEffect(()=>{const iv=setInterval(()=>setOn(p=>!p),520);return()=>clearInterval(iv);},[]);
  return <span style={{opacity:on?1:0,color:BLUE,marginLeft:"1px"}}>|</span>;
}
function StatusCycler(){
  const [d,setD]=useState("");const wi=useRef(0),ci=useRef(0),ph=useRef("typing"),tm=useRef(null);
  useEffect(()=>{
    const tick=()=>{
      const w=STATUS_WORDS[wi.current];
      if(ph.current==="typing"){ci.current++;setD(w.slice(0,ci.current));if(ci.current<w.length)tm.current=setTimeout(tick,68);else{ph.current="pause";tm.current=setTimeout(tick,1400);}}
      else if(ph.current==="pause"){ph.current="erasing";tm.current=setTimeout(tick,50);}
      else{ci.current--;setD(w.slice(0,ci.current));if(ci.current>0)tm.current=setTimeout(tick,38);else{wi.current=(wi.current+1)%STATUS_WORDS.length;ph.current="typing";tm.current=setTimeout(tick,200);}}
    };
    tm.current=setTimeout(tick,600);return()=>clearTimeout(tm.current);
  },[]);
  return <span style={{fontSize:"11px",fontWeight:500,letterSpacing:"0.05em",color:"rgba(248,248,248,.45)",minWidth:"100px",display:"inline-flex",alignItems:"center",fontFamily:"'Poppins',sans-serif"}}>{d}<BlinkCursor/></span>;
}
function DynamicIslandNav({menuOpen,setMenuOpen}){
  return(
    <div style={{position:"fixed",top:"16px",left:"50%",transform:"translateX(-50%)",zIndex:400,width:"min(640px,calc(100vw - 24px))",borderRadius:"16px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.07)"}}>
      <div style={{background:"rgba(14,12,10,.97)",backdropFilter:"blur(24px)",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",minWidth:0,overflow:"hidden"}}>
          <img src={LOGO} alt="Nelson" style={{height:"16px",flexShrink:0}} onError={e=>e.target.style.display="none"}/>
          <div style={{width:"1px",height:"13px",background:"rgba(255,255,255,.12)",flexShrink:0}}/>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:"15px",fontWeight:600,letterSpacing:"0.03em",whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{color:FG}}>Work</span><span style={{color:BLUE}}>Labs</span>
          </span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"14px",flexShrink:0,marginLeft:"12px"}}>
          <a href="https://www.nelsonworldwide.com" target="_blank" rel="noreferrer"
            style={{fontFamily:"'Poppins',sans-serif",fontSize:"10px",fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",textDecoration:"none",padding:"5px 13px",border:"1px solid rgba(0,186,220,.35)",color:BLUE,borderRadius:"4px",transition:"background .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(0,186,220,.1)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            NELSON.com
          </a>
          <button onClick={()=>setMenuOpen(p=>!p)} style={{background:"transparent",border:"none",cursor:"pointer",padding:"4px",display:"flex",flexDirection:"column",gap:"4px"}}>
            {[0,1,2].map(n=><div key={n} style={{width:"17px",height:"1.5px",background:"rgba(248,248,248,.55)",transition:"all .25s",transform:menuOpen?(n===0?"rotate(45deg) translate(4px,4px)":n===2?"rotate(-45deg) translate(4px,-4px)":"none"):"none",opacity:menuOpen&&n===1?0:1}}/>)}
          </button>
        </div>
      </div>
      <div style={{background:"rgba(11,10,8,.97)",backdropFilter:"blur(24px)",padding:"7px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"9px",flex:1}}>
          <div style={{width:"7px",height:"7px",borderRadius:"50%",flexShrink:0,animation:"greenGlow 2s ease infinite"}}/>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:"10px",color:"rgba(248,248,248,.3)",whiteSpace:"nowrap"}}>Lab is active.</span>
          <div style={{width:"1px",height:"10px",background:"rgba(255,255,255,.08)",flexShrink:0}}/>
          <StatusCycler/>
        </div>
        {/* Projects pill — acts as anchor button */}
        <button
          onClick={()=>{
            const el=document.getElementById("work");
            if(el){
              const root=document.querySelector(".wl");
              const header=el.querySelector("h2");
              const target=header||el;
              const offset=target.getBoundingClientRect().top - (root?root.getBoundingClientRect().top:0) + (root?root.scrollTop:window.scrollY) - 32;
              if(root) root.scrollTo({top:offset,behavior:"smooth"});
              else window.scrollTo({top:offset,behavior:"smooth"});
            }
          }}
          style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"3px 12px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"6px",cursor:"pointer",outline:"none",transition:"background .2s,border-color .2s",minWidth:76}}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,186,220,.08)";e.currentTarget.style.borderColor="rgba(0,186,220,.3)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:"9px",fontWeight:500,color:"rgba(248,248,248,.35)",letterSpacing:"0.08em",whiteSpace:"nowrap"}}>
            {CONTENT.projects.length} projects ↓
          </span>
        </button>
      </div>
    </div>
  );
}
function MenuOverlay({open,onClose}){
  if(!open)return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(8,8,9,.97)",zIndex:500,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"28px",animation:"wlIn .2s ease both"}}>
      {[["Explore Work","#work"],["Our Manifesto","#manifesto"],["NELSON Worldwide","https://www.nelsonworldwide.com"]].map(([l,h])=>(
        <a key={l} href={h} onClick={onClose} style={{fontFamily:"'DidotLTStd',serif",fontSize:"clamp(22px,4vw,38px)",fontWeight:700,color:FG,textDecoration:"none",letterSpacing:"0.04em",transition:"color .2s"}}
          onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color=FG}>{l}</a>
      ))}
      <button onClick={onClose} style={{position:"absolute",top:"28px",right:"28px",background:"transparent",border:"none",color:"rgba(248,248,248,.3)",cursor:"pointer",fontSize:"22px"}}>✕</button>
    </div>
  );
}

// ─── HERO CANVAS ────────────────────────────
// Blueprint corner-mark registration nodes — staggered so they never all appear at once
const MARK_NODES=[
  {top:"12%",left:"84%",size:32,del:0,   dur:6.5},
  {top:"82%",left:"88%",size:38,del:4.8, dur:6.0},
];
const ARM=10; // corner arm length in px
const C="rgba(0,186,220,.45)"; // corner stroke color
function BlueprintMark({top,left,size,del,dur}){
  const s={position:"absolute",background:C};
  return(
    <div style={{position:"absolute",top,left,width:size,height:size,transform:"translate(-50%,-50%)",animation:`wlMark ${dur}s ease-in-out ${del}s infinite`,pointerEvents:"none"}}>
      {/* Top-left corner */}
      <div style={{...s,top:0,left:0,width:ARM,height:1}}/>
      <div style={{...s,top:0,left:0,width:1,height:ARM}}/>
      {/* Top-right corner */}
      <div style={{...s,top:0,right:0,width:ARM,height:1}}/>
      <div style={{...s,top:0,right:0,width:1,height:ARM}}/>
      {/* Bottom-left corner */}
      <div style={{...s,bottom:0,left:0,width:ARM,height:1}}/>
      <div style={{...s,bottom:0,left:0,width:1,height:ARM}}/>
      {/* Bottom-right corner */}
      <div style={{...s,bottom:0,right:0,width:ARM,height:1}}/>
      <div style={{...s,bottom:0,right:0,width:1,height:ARM}}/>
      {/* Centre datum dot */}
      <div style={{position:"absolute",top:"50%",left:"50%",width:3,height:3,borderRadius:"50%",background:C,transform:"translate(-50%,-50%)",opacity:.6}}/>
    </div>
  );
}
function HeroCanvas(){
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {/* Orb 3 — deep atmosphere base, very slow 55s */}
      <div style={{position:"absolute",top:"-20%",left:"20%",width:"90vw",height:"90vh",background:"radial-gradient(circle,rgba(0,186,220,.065) 0%,transparent 55%)",borderRadius:"50%",filter:"blur(80px)",animation:"wlOrb3 55s ease-in-out infinite"}}/>
      {/* Orb 1 — cyan primary, 32s — main grid revealer */}
      <div style={{position:"absolute",top:"0%",left:"38%",width:"75vw",height:"70vh",background:"radial-gradient(circle,rgba(0,186,220,.18) 0%,rgba(0,186,220,.06) 40%,transparent 65%)",borderRadius:"50%",filter:"blur(48px)",animation:"wlOrb1 32s ease-in-out infinite"}}/>
      {/* Orb 2 — violet accent, lower-left, 44s — subtle depth layer */}
      <div style={{position:"absolute",top:"35%",left:"-15%",width:"60vw",height:"60vh",background:"radial-gradient(circle,rgba(167,139,250,.07) 0%,rgba(130,100,220,.03) 45%,transparent 65%)",borderRadius:"50%",filter:"blur(70px)",animation:"wlOrb2 44s ease-in-out infinite"}}/>
      {/* Scan sweep — slow beam drifts left→right, 28s, illuminates grid */}
      <div style={{position:"absolute",top:0,left:0,width:"18vw",height:"100%",background:"linear-gradient(to right,transparent,rgba(0,186,220,.06) 40%,rgba(0,186,220,.09) 50%,rgba(0,186,220,.06) 60%,transparent)",animation:"wlSweep 28s ease-in-out 2s infinite"}}/>
      {/* Blueprint registration marks — corner brackets appear + fade, staggered */}
      {MARK_NODES.map((m,i)=><BlueprintMark key={i} {...m}/>)}
    </div>
  );
}

// ─── PRELOADER ──────────────────────────────
function Preloader({onDone}){
  const [wo,setWo]=useState(false);   // words appear
  const [st,setSt]=useState(false);   // strike draws
  const [lb,setLb]=useState(false);   // labs slides in
  const [pg,setPg]=useState(false);   // place gone
  const [pu,setPu]=useState(false);   // pulse ring
  const [sh,setSh]=useState(false);   // scroll hint + ticker
  const [rdy,setRdy]=useState(false); // scroll ready
  const [exiting,setExiting]=useState(false);
  const [gone,setGone]=useState(false);
  const isMobile=useIsMobile();
  const firedRef=useRef(false);

  function doExit(){
    if(firedRef.current)return;
    firedRef.current=true;
    setExiting(true);
    setTimeout(()=>setGone(true),560);
    setTimeout(onDone,900);
  }

  useEffect(()=>{
    let c=false;
    const w=ms=>new Promise(r=>setTimeout(r,ms));
    (async()=>{
      await w(700);  if(c)return; setWo(true);
      await w(1400); if(c)return; setSt(true);
      await w(700);  if(c)return; setLb(true);
      await w(550);  if(c)return; setPg(true);setPu(true);
      await w(1400); if(c)return; setPu(false);
      await w(600);  if(c)return; setSh(true);
      await w(400);  if(c)return; setRdy(true);
    })();
    return()=>{c=true;};
  },[]);

  useEffect(()=>{
    if(!rdy)return;
    function onWh(e){if(e.deltaY>0)doExit();}
    window.addEventListener('wheel',onWh,{passive:true});
    if(!isMobile){
      let ty=0;
      function onTs(e){ty=e.touches[0].clientY;}
      function onTe(e){if(ty-e.changedTouches[0].clientY>30)doExit();}
      window.addEventListener('touchstart',onTs,{passive:true});
      window.addEventListener('touchend',onTe,{passive:true});
      return()=>{
        window.removeEventListener('wheel',onWh);
        window.removeEventListener('touchstart',onTs);
        window.removeEventListener('touchend',onTe);
      };
    }
    return()=>window.removeEventListener('wheel',onWh);
  },[rdy,isMobile]);

  if(gone)return null;

  const FS=isMobile?"clamp(30px,8vw,46px)":"clamp(64px,10vw,120px)";
  const TS="opacity 0.6s ease, transform 0.65s cubic-bezier(.22,1,.36,1)";

  return(
    <div style={{
      position:"fixed",inset:0,zIndex:9999,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      fontFamily:"'Poppins',sans-serif",userSelect:"none",
      opacity:exiting?0:1,transition:exiting?"opacity 0.5s ease":"none",
    }}>
      {/* Stage */}
      <div style={{
        display:"flex",flexDirection:"column",alignItems:"center",
        maxWidth:"100vw",padding:"0 24px",boxSizing:"border-box",
        transform:exiting?"translateY(-65px)":"translateY(0)",
        transition:exiting?"transform 0.55s cubic-bezier(.22,1,.36,1)":"none",
      }}>
        {/* Word row */}
        <div style={{display:"inline-flex",alignItems:"baseline",position:"relative"}}>
          {/* Pulse ring — fires when place exits */}
          {pu&&<div style={{
            position:"absolute",inset:"-10px -14px",
            border:"1.5px solid rgba(0,186,220,.6)",borderRadius:6,
            pointerEvents:"none",animation:"wlPulseRing 0.9s cubic-bezier(.2,.8,.3,1) forwards",
          }}/>}

          {/* WORK — always white */}
          <span style={{
            fontSize:FS,fontWeight:700,color:"#ffffff",letterSpacing:"-0.02em",display:"inline-block",
            opacity:wo?1:0,transform:wo?"translateY(0) scale(1)":"translateY(14px) scale(1.02)",
            transition:TS,
          }}>Work</span>

          {/* PLACE wrapper — collapses when pg */}
          <div style={{
            display:"inline-block",overflow:"hidden",whiteSpace:"nowrap",
            maxWidth:pg?"0px":"50vw",opacity:pg?0:1,
            transition:"max-width 0.42s cubic-bezier(.4,0,.2,1), opacity 0.2s ease",
          }}>
            <div style={{position:"relative",display:"inline-block"}}>
              <span style={{
                fontSize:FS,fontWeight:700,color:"#ffffff",letterSpacing:"-0.02em",display:"inline-block",
                opacity:wo?1:0,transform:wo?"translateY(0) scale(1)":"translateY(14px) scale(1.02)",
                transition:`${TS} 0.05s`,
              }}>place</span>
              {/* Sketchy angled SVG strikethrough */}
              {st&&(
                <svg viewBox="0 0 200 14" preserveAspectRatio="none" style={{
                  position:"absolute",left:-2,top:"50%",
                  width:"calc(100% + 4px)",height:14,
                  transform:"translateY(-50%) rotate(-2.5deg)",
                  overflow:"visible",pointerEvents:"none",
                }}>
                  <path
                    d="M 3 8 C 28 5, 55 10, 88 6 S 128 9, 162 6 L 197 7"
                    stroke="#e03030" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    style={{strokeDasharray:300,animation:"wlStrikeDraw 0.38s cubic-bezier(.4,0,.2,1) forwards"}}
                  />
                </svg>
              )}
            </div>
          </div>

          {/* LABS — cyan, typewriter slide-in */}
          <span style={{
            fontSize:FS,fontWeight:700,color:"#00BADC",letterSpacing:"-0.02em",
            display:"inline-block",overflow:"hidden",whiteSpace:"nowrap",
            maxWidth:lb?"40vw":"0px",opacity:lb?1:0,
            transition:"max-width 0.32s cubic-bezier(.4,0,.2,1), opacity 0.18s ease",
          }}> Labs</span>
        </div>

        {/* Studios ticker */}
        <div style={{
          overflow:"hidden",width:"min(90vw,960px)",marginTop:28,
          opacity:sh?1:0,transition:"opacity 0.6s ease",
          WebkitMaskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)",
          maskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)",
        }}>
          <div style={{
            display:"inline-flex",whiteSpace:"nowrap",
            animation:"wlTicker 36s linear infinite",
            fontFamily:"'Poppins',sans-serif",fontSize:10,
            letterSpacing:"0.28em",color:"#3a5a60",textTransform:"uppercase",
          }}>
            {["Atlanta","Minneapolis","Philadelphia","Chicago","New York",
              "Atlanta","Minneapolis","Philadelphia","Chicago","New York"].map((c,i)=>(
              <span key={i} style={{marginRight:28}}>{c}<span style={{marginLeft:28,opacity:.28}}>·</span></span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint — button on mobile, arrow on desktop */}
      {isMobile?(
        <button onClick={doExit} style={{
          position:"absolute",bottom:52,left:"50%",
          padding:"14px 44px",
          fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:600,
          letterSpacing:"0.2em",textTransform:"uppercase",
          color:"#00BADC",background:"rgba(0,186,220,.04)",
          border:"1px solid rgba(0,186,220,.38)",borderRadius:3,
          cursor:"pointer",WebkitTapHighlightColor:"transparent",
          animation:sh?"wlBtnPulse 2.4s ease-in-out infinite":"none",
          opacity:sh?1:0,transition:"opacity 0.7s ease",
        }}>Enter the Lab</button>
      ):(
        <div style={{
          position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:5,
          opacity:sh?1:0,transition:"opacity 0.6s ease",pointerEvents:"none",
        }}>
          <div style={{width:1,height:32,background:"linear-gradient(to bottom,rgba(0,186,220,.45),transparent)",animation:"wlBounceArrow 1.8s ease-in-out infinite"}}/>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(0,186,220,.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
    </div>
  );
}

// ─── HERO ───────────────────────────────────
const BADGES=[
  {dot:"#00BADC",name:"Spatial Strategy",status:"Active"},
  {dot:"#a78bfa",name:"Brand Identity",status:"In Review"},
  {dot:"#00BADC",name:"Workplace Research",status:"Active"},
];
function Hero({preloaderDone}){
  const [rdy,setRdy]=useState(false);const isMobile=useIsMobile();
  useEffect(()=>{
    if(!preloaderDone)return;
    const t=setTimeout(()=>setRdy(true),80);
    return()=>clearTimeout(t);
  },[preloaderDone]);
  const a=(d)=>rdy?{animation:`wlUp .65s cubic-bezier(.22,1,.36,1) ${d}s both`}:{opacity:0};
  return(
    <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:`clamp(100px,13vh,140px) ${isMobile?"24px":"48px"} clamp(48px,7vh,72px)`,overflow:"hidden",background:BG}}>
      {/* Living blueprint background — drifting orbs reveal the grid */}
      <HeroCanvas/>
      {/* Blueprint grid — faint base; orbs + sweep illuminate it */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.048,pointerEvents:"none"}}>
        <defs><pattern id="wlg" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(180,220,255,1)" strokeWidth=".5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#wlg)"/>
      </svg>
      <div style={{position:"relative",zIndex:1,maxWidth:820,width:"100%",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
        {/* Line 1 — Poppins light, context setter */}
        <div style={{lineHeight:1.1,marginBottom:20,...a(.35)}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.8vw,22px)",color:"rgba(248,248,248,.65)",letterSpacing:"0.04em"}}>{CONTENT.tagline}</span>
        </div>
        {/* Line 2 — Didot bold, the punch */}
        <div style={{lineHeight:1.0,marginBottom:0,...a(.55)}}>
          <span style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(52px,10vw,100px)",color:FG,letterSpacing:"-0.02em",display:"block"}}>{CONTENT.tagline2}</span>
        </div>
        {/* Line 3 — italic Poppins bold cyan */}
        <div style={{lineHeight:1.0,marginBottom:44,...a(.72)}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontStyle:"italic",fontSize:"clamp(41px,7.9vw,79px)",color:BLUE,letterSpacing:"-0.02em",display:"block"}}>{CONTENT.subtagline}</span>
        </div>
        <p style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.82,color:"rgba(248,248,248,.52)",maxWidth:560,...a(1.05)}}>{CONTENT.heroBody}</p>
        <div style={{display:"flex",gap:14,marginTop:36,flexWrap:"wrap",justifyContent:"center",...a(1.18)}}>
          <a href="#work" style={{fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",textDecoration:"none",padding:"15px 38px",background:`linear-gradient(135deg,${BLUE} 0%,#0092b5 100%)`,color:"#fff",borderRadius:6,boxShadow:`0 0 28px rgba(0,186,220,.4),0 2px 10px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.18)`,transition:"box-shadow .25s,transform .2s",display:"inline-flex",alignItems:"center",gap:8}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 48px rgba(0,186,220,.65),0 4px 18px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.18)`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow=`0 0 28px rgba(0,186,220,.4),0 2px 10px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.18)`;e.currentTarget.style.transform="translateY(0)";}}
          >Explore the Work<svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{opacity:.8}}><path d="M5.5 1v9M1.5 6.5l4 4 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          <a href="#manifesto" style={{fontFamily:"'Poppins',sans-serif",fontSize:10,fontWeight:400,letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none",padding:"15px 32px",background:"transparent",border:"1px solid rgba(248,248,248,.1)",color:"rgba(248,248,248,.35)",borderRadius:6,transition:"border-color .25s,color .25s,transform .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(248,248,248,.22)";e.currentTarget.style.color="rgba(248,248,248,.65)";e.currentTarget.style.transform="translateY(-1px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(248,248,248,.1)";e.currentTarget.style.color="rgba(248,248,248,.35)";e.currentTarget.style.transform="translateY(0)";}}>Our Manifesto</a>
        </div>
        {/* Live project badges */}
        <div style={{display:"flex",gap:10,marginTop:28,flexWrap:"wrap",justifyContent:"center",...a(1.35)}}>
          {BADGES.map((b,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px 6px 10px",border:"1px solid rgba(248,248,248,.1)",borderRadius:20,background:"rgba(255,255,255,.04)"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:b.dot,boxShadow:`0 0 6px ${b.dot}`,flexShrink:0}}/>
              <span style={{fontFamily:"'Poppins',sans-serif",fontSize:10,letterSpacing:"0.1em",color:"rgba(248,248,248,.55)",textTransform:"uppercase"}}>{b.name}</span>
              <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,letterSpacing:"0.12em",color:b.dot,textTransform:"uppercase",opacity:.8}}>{b.status}</span>
            </div>
          ))}
        </div>
        {/* Scroll draw-down */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,marginTop:44,...a(1.8)}}>
          <div style={{width:1,height:28,background:`linear-gradient(to bottom,rgba(248,248,248,.18),transparent)`,animation:"wlScrollPulse 2s ease-in-out infinite"}}/>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(248,248,248,.2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </section>
  );
}

// ─── NETWORK ────────────────────────────────
function NetworkNode({label,cx,cy,r,color,delay,active}){
  return(
    <g transform={`translate(${cx},${cy})`}>
      <circle r={r+10} fill={`${color}07`}/>
      <circle r={r} fill={`${color}1a`} stroke={color} strokeWidth="1.2"
        style={{opacity:active?.75:0,transformOrigin:"0 0",animation:active?`nodePulse ${2.4+delay*.25}s ease-in-out ${delay*.4}s infinite`:"none",transition:"opacity .6s ease"}}/>
      <text y={r+14} textAnchor="middle" style={{fontFamily:"'Poppins',sans-serif",fontSize:"9px",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",fill:"rgba(248,248,248,.5)",opacity:active?1:0,transition:`opacity .6s ease ${delay*.4+.3}s`}}>{label}</text>
    </g>
  );
}
function SignalDot({x1,y1,x2,y2,delay,color,active}){
  const [pos,setPos]=useState(0);const rafRef=useRef(null);
  useEffect(()=>{
    if(!active)return;
    let start=null;const PERIOD=2400+delay*350;
    const tick=(now)=>{
      if(!start)start=now;
      const p=((now-start+delay*800)%PERIOD)/PERIOD;
      setPos(p);rafRef.current=requestAnimationFrame(tick);
    };
    const t=setTimeout(()=>{rafRef.current=requestAnimationFrame(tick);},delay*150);
    return()=>{clearTimeout(t);cancelAnimationFrame(rafRef.current);};
  },[active,delay]);
  const TRAVEL=0.82;
  const tPos=pos*TRAVEL;
  const x=x1+(x2-x1)*tPos,y=y1+(y2-y1)*tPos;
  const fade=tPos/TRAVEL>0.75?1-((tPos/TRAVEL-0.75)/0.25):0.95;
  if(!active)return null;
  return <circle cx={x} cy={y} r="2.5" fill={color} opacity={fade} style={{filter:`drop-shadow(0 0 4px ${color})`}}/>;
}
function NetworkViz({active}){
  const W=420,H=410,CX=W/2,CY=H/2,OR=148,CR=32;
  const nodePositions=CONTENT.networkNodes.map((label,i)=>{
    const angle=(i/CONTENT.networkNodes.length)*Math.PI*2-Math.PI/2;
    return{label,color:NODE_COLORS[label]||BLUE,cx:CX+OR*Math.cos(angle),cy:CY+OR*Math.sin(angle)};
  });
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:520,height:"auto",overflow:"visible"}}>
      {/* Rotating outer ring */}
      <g style={{transformOrigin:`${CX}px ${CY}px`,animation:active?"spinRing 65s linear infinite":"none",opacity:active?.55:0,transition:"opacity .8s ease .5s"}}>
        <circle cx={CX} cy={CY} r={OR} fill="none" stroke="rgba(0,186,220,.18)" strokeWidth="1" strokeDasharray="6 10"/>
      </g>
      {/* Static faint ring underneath */}
      <circle cx={CX} cy={CY} r={OR} fill="none" stroke="rgba(248,248,248,.03)" strokeWidth="1"/>
      {/* Connection lines */}
      {nodePositions.map((n,i)=>(
        <line key={i} x1={n.cx} y1={n.cy} x2={CX} y2={CY} stroke={n.color} strokeWidth=".8" strokeDasharray="4 5" strokeOpacity=".2"
          style={{opacity:active?1:0,transition:`opacity .4s ease ${i*.07}s`}}/>
      ))}
      {/* Signal dots */}
      {nodePositions.map((n,i)=>(
        <SignalDot key={i} x1={n.cx} y1={n.cy} x2={CX} y2={CY} delay={i} color={n.color} active={active}/>
      ))}
      {/* Outer nodes */}
      {nodePositions.map((n,i)=>(
        <NetworkNode key={i} label={n.label} cx={n.cx} cy={n.cy} r={11} color={n.color} delay={i} active={active}/>
      ))}
      {/* Center glow */}
      <circle cx={CX} cy={CY} r={CR+24} fill={`${BLUE}05`}/>
      <circle cx={CX} cy={CY} r={CR+14} fill={`${BLUE}0c`}/>
      <circle cx={CX} cy={CY} r={CR+4} fill={`${BLUE}16`}/>
      <circle cx={CX} cy={CY} r={CR} fill={`${BLUE}30`} stroke={BLUE} strokeWidth="2"
        style={{animation:active?"centerBreath 3s ease-in-out infinite":"none",opacity:active?1:0,transition:"opacity .8s ease .3s"}}/>
      {/* Nelson logo — white wordmark with blue fin — in center node */}
      <image
        href="/logos/nelson-white-bluefin.png"
        x={CX - 26} y={CY - 9}
        width="52" height="18"
        style={{opacity:active?1:0,transition:"opacity .8s ease .5s"}}
      />
    </svg>
  );
}
function NetworkSection(){
  const [ref,on]=useReveal(0.15);const isMobile=useIsMobile();
  return(
    <section ref={ref} style={{background:BG2,borderTop:"1px solid rgba(255,255,255,.05)",padding:`80px ${isMobile?"24px":"48px"}`,overflow:"hidden",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 60% at 50% 50%,rgba(0,186,220,.04) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.028,pointerEvents:"none"}}>
        <defs><pattern id="wlg2" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(248,248,248,1)" strokeWidth=".5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#wlg2)"/>
      </svg>
      <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?"48px":"80px",alignItems:"center",position:"relative",zIndex:1}}>
        <div>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:10,fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:BLUE,marginBottom:20,opacity:on?1:0,transition:"opacity .6s ease .1s"}}>The Lab</div>
          <h2 style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(26px,3.5vw,46px)",lineHeight:1.18,color:FG,marginBottom:24,opacity:on?1:0,transform:on?"translateY(0)":"translateY(16px)",transition:"opacity .7s ease .2s,transform .7s cubic-bezier(.22,1,.36,1) .2s"}}>{CONTENT.networkHeadline}</h2>
          <p style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.85,color:"rgba(248,248,248,.55)",opacity:on?1:0,transform:on?"translateY(0)":"translateY(12px)",transition:"opacity .7s ease .35s,transform .7s cubic-bezier(.22,1,.36,1) .35s"}}>{CONTENT.networkBody}</p>
          {/* Two remaining stats, centered */}
          <div style={{marginTop:36,display:"flex",gap:48,opacity:on?1:0,transition:"opacity .7s ease .55s"}}>
            {[["∞","Infinite ideas in queue"],["Zero","Bottlenecks"]].map(([v,l])=>(
              <div key={l}>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"clamp(28px,3.2vw,44px)",color:FG,lineHeight:1}}>{v}</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:BLUE,marginTop:7}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",opacity:on?1:0,transition:"opacity .8s ease .3s"}}>
          <NetworkViz active={on}/>
        </div>
      </div>
    </section>
  );
}

// ─── STAT + FILTER ──────────────────────────
function useCountUp(target,active,duration=2500){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    if(!active){setVal(0);return;}
    const ease=(t)=>1-Math.pow(1-t,4);
    let start=null;
    const step=(ts)=>{if(!start)start=ts;const p=Math.min((ts-start)/duration,1);setVal(Math.round(ease(p)*target));if(p<1)requestAnimationFrame(step);else setVal(target);};
    requestAnimationFrame(step);
  },[target,active,duration]);
  return val;
}
function StatChip({stat,active,index,isMobile}){
  const val=useCountUp(stat.value,active,1800+index*100);
  if(isMobile) return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:6,padding:"24px 16px",
      opacity:active?1:0,transition:`opacity .5s ease ${index*.1}s`,
    }}>
      <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,
        fontSize:"clamp(36px,9vw,52px)",color:FG,letterSpacing:"-0.02em",lineHeight:1}}>
        {val}
      </span>
      <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:400,
        letterSpacing:"0.16em",textTransform:"uppercase",
        color:"rgba(248,248,248,.28)",textAlign:"center"}}>
        {stat.label}
      </span>
      <div style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:2,
        padding:"3px 8px",borderRadius:12,
        background:`${stat.color}15`,border:`1px solid ${stat.color}30`}}>
        <span style={{width:5,height:5,borderRadius:"50%",background:stat.color,opacity:.85,flexShrink:0,display:"inline-block"}}/>
        <span style={{fontFamily:"'Poppins',sans-serif",fontSize:8,fontWeight:500,
          letterSpacing:"0.1em",textTransform:"uppercase",color:stat.color,whiteSpace:"nowrap"}}>
          {stat.badge}
        </span>
      </div>
    </div>
  );
  return(
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",
      gap:10,padding:"15px 20px",
      opacity:active?1:0,transition:`opacity .5s ease ${index*.1}s`,
    }}>
      <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,
        fontSize:"clamp(16px,1.4vw,20px)",color:FG,letterSpacing:"-0.01em",
        minWidth:"1.4ch",textAlign:"right",lineHeight:1}}>
        {val}
      </span>
      <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:400,
        letterSpacing:"0.16em",textTransform:"uppercase",
        color:"rgba(248,248,248,.28)",whiteSpace:"nowrap"}}>
        {stat.label}
      </span>
      <div style={{display:"inline-flex",alignItems:"center",gap:4,flexShrink:0,
        padding:"3px 8px",borderRadius:12,
        background:`${stat.color}15`,border:`1px solid ${stat.color}30`}}>
        <span style={{width:5,height:5,borderRadius:"50%",background:stat.color,opacity:.85,flexShrink:0,display:"inline-block"}}/>
        <span style={{fontFamily:"'Poppins',sans-serif",fontSize:8,fontWeight:500,
          letterSpacing:"0.1em",textTransform:"uppercase",color:stat.color,whiteSpace:"nowrap"}}>
          {stat.badge}
        </span>
      </div>
    </div>
  );
}

function StatAndFilter({activeFilter,setFilter}){
  const [ref,on]=useReveal(0.15);const isMobile=useIsMobile();
  return(
    <div ref={ref} style={{background:BG3,borderTop:"1px solid rgba(255,255,255,.06)",borderBottom:"1px solid rgba(255,255,255,.06)",width:"100%",overflow:"hidden"}}>
      {isMobile?(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",width:"100%"}}>
          {CONTENT.stats.map((s,i)=>(
            <div key={i} style={{
              borderRight:i%2===0?"1px solid rgba(255,255,255,.06)":"none",
              borderBottom:i<2?"1px solid rgba(255,255,255,.06)":"none",
            }}>
              <StatChip stat={s} active={on} index={i} isMobile={true}/>
            </div>
          ))}
        </div>
      ):(
        <div style={{display:"flex",alignItems:"center",flexWrap:"nowrap",width:"100%"}}>
          {CONTENT.stats.map((s,i)=>(
            <React.Fragment key={i}>
              <StatChip stat={s} active={on} index={i} isMobile={false}/>
              {i<CONTENT.stats.length-1&&(
                <div style={{width:1,alignSelf:"stretch",flexShrink:0,
                  background:"linear-gradient(to bottom,transparent,rgba(255,255,255,.08) 20%,rgba(255,255,255,.08) 80%,transparent)"}}/>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROJECT SECTION HEADER + FILTER ────────
function ProjectHeader({activeFilter,setFilter,on}){
  const isMobile=useIsMobile();
  return(
    <div style={{borderBottom:"1px solid rgba(255,255,255,.055)",background:BG,padding:`40px ${isMobile?"24px":"48px"} 0`}}>
      <div style={{maxWidth:1320,margin:"0 auto"}}>
        <div style={{marginBottom:28,opacity:on?1:0,transform:on?"translateY(0)":"translateY(12px)",transition:"opacity .6s ease,transform .6s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:10,fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:BLUE,marginBottom:14}}>
            Working in
          </div>
          <h2 style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(28px,4vw,48px)",color:FG,lineHeight:1.1,marginBottom:8}}>{CONTENT.labHeader}</h2>
          <p style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(13px,1.3vw,16px)",color:"rgba(248,248,248,.45)",letterSpacing:"0.01em"}}>{CONTENT.labSubhead}</p>
        </div>
        <div style={{paddingBottom:20}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
            <button className="wl-catpill" onClick={()=>setFilter("All")} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",cursor:"pointer",outline:"none",background:activeFilter==="All"?"rgba(248,248,248,.1)":"rgba(248,248,248,.04)",border:activeFilter==="All"?"1px solid rgba(248,248,248,.28)":"1px solid rgba(248,248,248,.1)"}}>
              <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:activeFilter==="All"?FG:"rgba(248,248,248,.4)"}}>All</span>
            </button>
            {Object.entries(CAT_COLOR).map(([cat,color])=>{
              const isActive=activeFilter===cat;
              return(
                <button key={cat} className="wl-catpill" onClick={()=>setFilter(cat)} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",cursor:"pointer",outline:"none",background:isActive?`${color}22`:`${color}0d`,border:isActive?`1px solid ${color}65`:`1px solid ${color}25`}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:color,flexShrink:0,opacity:isActive?1:.6}}/>
                  <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",color:isActive?color:"rgba(248,248,248,.45)",whiteSpace:"nowrap"}}>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CARD IMAGE + MATURITY GAUGE ────────────
function MaturityGauge({status}){
  const sm=STATUS[status]||STATUS.Concept;
  const level=sm.maturity;
  const isLive=status==="Live";
  return(
    <div style={{position:"absolute",bottom:10,left:10,display:"flex",alignItems:"center",gap:5}}>
      <div style={{display:"flex",gap:2,alignItems:"center"}}>
        {[1,2,3].map(n=>(
          <div key={n} style={{width:isMobileCheck()?10:12,height:3,borderRadius:2,background:n<=level?sm.color:`${sm.color}25`,transition:"background .3s"}}/>
        ))}
      </div>
      {isLive&&(
        <div style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",animation:"liveBlink 1.8s ease infinite",boxShadow:"0 0 4px #4ade80"}}/>
      )}
    </div>
  );
}
function isMobileCheck(){return typeof window!=="undefined"&&window.innerWidth<640;}

function CardImage({category,name,status}){
  const cc=CAT_COLOR[category]||FG;
  const grads={
    "Client Tools":`radial-gradient(ellipse at 30% 60%,rgba(0,186,220,.28) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(0,186,220,.1) 0%,transparent 50%)`,
    "Internal Tools":`radial-gradient(ellipse at 70% 40%,rgba(148,163,184,.22) 0%,transparent 60%)`,
    "Capabilities":`radial-gradient(ellipse at 40% 30%,rgba(167,139,250,.28) 0%,transparent 60%),radial-gradient(ellipse at 75% 75%,rgba(167,139,250,.1) 0%,transparent 50%)`,
    "Agent Workflows":`radial-gradient(ellipse at 60% 50%,rgba(245,158,11,.25) 0%,transparent 60%),radial-gradient(ellipse at 20% 30%,rgba(245,158,11,.08) 0%,transparent 50%)`,
    "Thought Leadership":`radial-gradient(ellipse at 50% 40%,rgba(226,232,240,.16) 0%,transparent 60%)`,
    "Experiments":`radial-gradient(ellipse at 30% 50%,rgba(52,211,153,.25) 0%,transparent 60%),radial-gradient(ellipse at 70% 20%,rgba(52,211,153,.08) 0%,transparent 50%)`,
  };
  const initials=name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const safeId="g"+name.replace(/[^a-zA-Z0-9]/g,"");
  return(
    <div style={{width:"100%",aspectRatio:"16/9",overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,.055)",flexShrink:0,position:"relative"}}>
      <div className="wl-card-img-inner" style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#131316,#0f0f12)",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:grads[category]||grads["Client Tools"]}}/>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.055}}>
          <defs><pattern id={safeId} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth=".5"/></pattern></defs>
          <rect width="100%" height="100%" fill={`url(#${safeId})`}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"'DidotLTStd',serif",fontSize:"26px",fontWeight:700,color:cc,opacity:.3,letterSpacing:"0.05em"}}>{initials}</span>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${cc}55,transparent)`}}/>
        <MaturityGauge status={status}/>
      </div>
    </div>
  );
}

// ─── STAGGERED CARD ─────────────────────────
function StaggeredCard({project,colIndex,onCardClick,demoActive}){
  const ref=useRef(null);const [revealed,setRevealed]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setTimeout(()=>setRevealed(true),colIndex*120);io.disconnect();}},{threshold:.1});
    io.observe(el);return()=>io.disconnect();
  },[colIndex]);
  const sm=STATUS[project.status]||STATUS.Concept;
  const cc=CAT_COLOR[project.category]||FG;
  return(
    <div ref={ref} className={`wl-card${demoActive?" wl-demo":""}`} onClick={()=>onCardClick(project)}
      style={{background:"rgba(255,255,255,.024)",border:"1px solid rgba(255,255,255,.07)",borderRadius:4,display:"flex",flexDirection:"column",overflow:"hidden",opacity:revealed?1:0,transform:revealed?"translateY(0) scale(1)":"translateY(20px) scale(.98)",transition:"opacity .55s ease,transform .55s cubic-bezier(.22,1,.36,1)"}}>
      <CardImage category={project.category} name={project.name} status={project.status}/>
      <div style={{padding:"18px 18px 16px",display:"flex",flexDirection:"column",gap:9,flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:cc}}>{project.category}</span>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:8,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",padding:"2px 8px",borderRadius:20,background:sm.bg,color:sm.color,whiteSpace:"nowrap",flexShrink:0}}>{sm.label}</span>
        </div>
        <h3 style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:17,lineHeight:1.2,color:FG}}>{project.name}</h3>
        <p className="wl-tagline" style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:12,lineHeight:1.6,color:"rgba(248,248,248,.42)",opacity:0,transform:"translateY(4px)",transition:"opacity .3s,transform .3s",flex:1}}>{project.tagline}</p>
        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:500,color:BLUE}}>{project.url?"Open →":"View details →"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── GRID WITH AUTO-DEMO ─────────────────────
function WorkGrid({projects,onCardClick}){
  const isMobile=useIsMobile();const cols=isMobile?2:3;
  const [demoIdx,setDemoIdx]=useState(null);
  const [userInteracted,setUserInteracted]=useState(false);
  const timerRef=useRef(null);

  useEffect(()=>{
    if(userInteracted||projects.length===0)return;
    let idx=0;
    const cycle=()=>{
      setDemoIdx(idx%Math.min(3,projects.length));
      idx++;
      timerRef.current=setTimeout(cycle,3500);
    };
    timerRef.current=setTimeout(cycle,1800);
    return()=>clearTimeout(timerRef.current);
  },[userInteracted,projects]);

  const handleInteraction=()=>{ setUserInteracted(true); setDemoIdx(null); clearTimeout(timerRef.current); };

  return(
    <div onMouseEnter={handleInteraction} onTouchStart={handleInteraction}
      style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:isMobile?10:16}}>
      {projects.map((p,i)=>(
        <StaggeredCard key={p.id} project={p} colIndex={i%cols} onCardClick={onCardClick} demoActive={demoIdx===i}/>
      ))}
    </div>
  );
}

// ─── MODAL ──────────────────────────────────
function ModalCollage({project}){
  const cc=CAT_COLOR[project.category]||FG;
  const grads={"Client Tools":`radial-gradient(ellipse at 20% 50%,rgba(0,186,220,.3) 0%,transparent 55%),radial-gradient(ellipse at 80% 30%,rgba(0,186,220,.12) 0%,transparent 45%)`,"Internal Tools":`radial-gradient(ellipse at 60% 40%,rgba(148,163,184,.25) 0%,transparent 55%)`,"Capabilities":`radial-gradient(ellipse at 35% 55%,rgba(167,139,250,.3) 0%,transparent 55%),radial-gradient(ellipse at 80% 25%,rgba(167,139,250,.12) 0%,transparent 45%)`,"Agent Workflows":`radial-gradient(ellipse at 50% 40%,rgba(245,158,11,.28) 0%,transparent 55%)`,"Thought Leadership":`radial-gradient(ellipse at 40% 50%,rgba(226,232,240,.18) 0%,transparent 55%)`,"Experiments":`radial-gradient(ellipse at 30% 45%,rgba(52,211,153,.28) 0%,transparent 55%),radial-gradient(ellipse at 75% 65%,rgba(52,211,153,.1) 0%,transparent 45%)`};
  const grad=grads[project.category]||grads["Client Tools"];
  const initials=project.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return(
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:6,marginBottom:24,height:160}}>
      <div style={{borderRadius:4,overflow:"hidden",background:"#0f0f12",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:grad}}/>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.05}}><defs><pattern id="mc1" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth=".5"/></pattern></defs><rect width="100%" height="100%" fill="url(#mc1)"/></svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6}}>
          <span style={{fontFamily:"'DidotLTStd',serif",fontSize:"32px",fontWeight:700,color:cc,opacity:.28}}>{initials}</span>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(248,248,248,.18)"}}>Screenshot placeholder</span>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${cc}65,transparent)`}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {[1,2].map(n=>(
          <div key={n} style={{flex:1,borderRadius:4,overflow:"hidden",background:"#0f0f12",position:"relative"}}>
            <div style={{position:"absolute",inset:0,background:grad,opacity:.55}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'Poppins',sans-serif",fontSize:"8px",letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(248,248,248,.14)"}}>Detail {n}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Modal({project,onClose}){
  const isMobile=useIsMobile();
  useEffect(()=>{const fn=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);},[onClose]);
  const sm=STATUS[project.status]||STATUS.Concept;const cc=CAT_COLOR[project.category]||FG;
  const fields=[{label:"Purpose",key:"purpose",icon:"◎"},{label:"What it does",key:"whatItDoes",icon:"◈"},{label:"Who it's for",key:"whoItsFor",icon:"◉"},{label:"Maturity",key:"maturity",icon:"◐"}];
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.82)",backdropFilter:"blur(16px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:isMobile?"120px 12px 16px":"24px 16px 24px",animation:"wlIn .2s ease both",overflowY:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#111115",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,width:"100%",maxWidth:580,animation:"wlModal .3s cubic-bezier(.22,1,.36,1) both"}}>
        <div style={{position:"sticky",top:0,background:"#111115",zIndex:10,borderBottom:"1px solid rgba(255,255,255,.07)",borderRadius:"8px 8px 0 0",padding:"20px 24px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.16em",textTransform:"uppercase",color:cc}}>{project.category}</span>
                <span style={{fontFamily:"'Poppins',sans-serif",fontSize:8,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",padding:"2px 8px",borderRadius:20,background:sm.bg,color:sm.color}}>{sm.label}</span>
              </div>
              <h2 style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(20px,3vw,26px)",color:FG,lineHeight:1.15}}>{project.name}</h2>
              <p style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:13,color:"rgba(248,248,248,.38)",marginTop:5,lineHeight:1.55,fontStyle:"italic"}}>{project.tagline}</p>
            </div>
            <button onClick={onClose} style={{background:"transparent",border:"1px solid rgba(255,255,255,.14)",color:"rgba(248,248,248,.45)",cursor:"pointer",width:32,height:32,borderRadius:4,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"border-color .2s,color .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.35)";e.currentTarget.style.color=FG;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.14)";e.currentTarget.style.color="rgba(248,248,248,.45)";}}>✕</button>
          </div>
        </div>
        <div style={{padding:"22px 24px 28px",overflowY:"auto",maxHeight:isMobile?"62vh":"72vh"}} className="wl-mscroll">
          <ModalCollage project={project}/>
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {fields.map(({label,key,icon})=>project.body?.[key]&&(
              <div key={key}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <span style={{color:cc,fontSize:11,opacity:.65}}>{icon}</span>
                  <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(248,248,248,.25)"}}>{label}</span>
                  <div style={{flex:1,height:1,background:"rgba(255,255,255,.05)"}}/>
                </div>
                <p style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:13.5,lineHeight:1.8,color:"rgba(248,248,248,.6)",paddingLeft:20}}>{project.body[key]}</p>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:26,paddingTop:18,borderTop:"1px solid rgba(255,255,255,.06)"}}>
            {project.url?<a href={project.url} target="_blank" rel="noreferrer" style={{fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",textDecoration:"none",padding:"11px 24px",background:BLUE,color:BG,borderRadius:2}}>Open Project →</a>:<span style={{fontFamily:"'Poppins',sans-serif",fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",padding:"11px 24px",border:"1px solid rgba(255,255,255,.1)",color:"rgba(248,248,248,.28)",borderRadius:2}}>Ask us about this</span>}
            <button onClick={onClose} style={{fontFamily:"'Poppins',sans-serif",fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",padding:"11px 18px",background:"transparent",border:"1px solid rgba(255,255,255,.1)",color:"rgba(248,248,248,.28)",borderRadius:2,cursor:"pointer",transition:"border-color .2s,color .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.3)";e.currentTarget.style.color=FG;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(248,248,248,.28)";}}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WORK SECTION ───────────────────────────
function WorkSection(){
  const [filter,setFilter]=useState("All");
  const [modal,setModal]=useState(null);
  const [headerRef,headerOn]=useReveal(0.1);
  const shown=filter==="All"?CONTENT.projects:CONTENT.projects.filter(p=>p.category===filter);
  return(
    <section id="work" style={{background:BG}}>
      <StatAndFilter activeFilter={filter} setFilter={setFilter}/>
      <div ref={headerRef}>
        <ProjectHeader activeFilter={filter} setFilter={setFilter} on={headerOn}/>
      </div>
      <div style={{padding:"36px 24px 100px",maxWidth:1320,margin:"0 auto"}}>
        <WorkGrid projects={shown} onCardClick={setModal}/>
      </div>
      {modal&&<Modal project={modal} onClose={()=>setModal(null)}/>}
    </section>
  );
}

// ─── MANIFESTO ──────────────────────────────
function Manifesto(){
  const [ref,on]=useReveal();
  const isMobile=useIsMobile();
  const avatarBase={width:44,height:44,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"};
  const Attribution=(
    <div style={{display:"flex",alignItems:"center",gap:16,opacity:on?1:0,transition:"opacity .7s ease .65s"}}>
      <div style={{position:"relative",display:"flex"}}>
        <div style={{...avatarBase,background:"linear-gradient(135deg,#0090b0,#00BADC)",border:"2px solid #14141a",zIndex:2}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:FG}}>JC</span>
        </div>
        <div style={{...avatarBase,background:"linear-gradient(135deg,#c8922a,#a8720a)",border:"2px solid #14141a",marginLeft:-14,zIndex:1}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:FG}}>DF</span>
        </div>
      </div>
      <div>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:12,fontWeight:500,color:"rgba(248,248,248,.7)",lineHeight:1.4}}>Jeff Cumpson</div>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:12,fontWeight:500,color:"rgba(248,248,248,.7)",lineHeight:1.4}}>Dave Filak</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
          <div style={{width:18,height:1,background:BLUE}}/>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:10,color:"rgba(248,248,248,.28)",letterSpacing:"0.1em",textTransform:"uppercase"}}>NELSON Worldwide</span>
        </div>
      </div>
    </div>
  );
  return(
    <section id="manifesto" ref={ref} style={{background:BG2,padding:`100px ${isMobile?"24px":"48px"}`,borderTop:"1px solid rgba(255,255,255,.06)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:"-8%",top:"50%",transform:"translateY(-50%)",width:480,height:480,background:"radial-gradient(ellipse,rgba(0,186,220,.05) 0%,transparent 66%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",left:"-2%",bottom:"-10%",fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(100px,15vw,220px)",color:"rgba(248,248,248,.016)",lineHeight:1,userSelect:"none",pointerEvents:"none"}}>02</div>
      <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"1fr":"3fr 2fr",gap:isMobile?"48px":"100px",alignItems:"start",position:"relative",zIndex:1}}>

        {/* Left — headline + body */}
        <div>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:BLUE,marginBottom:24,opacity:on?1:0,transition:"opacity .6s ease .1s"}}>Manifesto</div>
          <div style={{marginBottom:40,opacity:on?1:0,transform:on?"translateY(0)":"translateY(16px)",transition:"opacity .7s ease .2s,transform .7s cubic-bezier(.22,1,.36,1) .2s"}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(15px,1.8vw,22px)",color:"rgba(248,248,248,.55)",letterSpacing:"0.02em",marginBottom:4}}>"Why are interior designers</div>
            <div style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(32px,4.5vw,58px)",color:FG,lineHeight:1.05,letterSpacing:"-0.01em"}}>making apps?"</div>
          </div>
          {CONTENT.manifestoParas.map((p,i)=>(
            <p key={i} style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.38vw,17px)",lineHeight:1.9,color:"rgba(248,248,248,.54)",marginBottom:20,opacity:on?1:0,transform:on?"translateY(0)":"translateY(12px)",transition:`opacity .7s ease ${.32+i*.11}s,transform .7s cubic-bezier(.22,1,.36,1) ${.32+i*.11}s`}}>{p}</p>
          ))}
          {/* Attribution on mobile sits below body text */}
          {isMobile&&<div style={{marginTop:36,paddingTop:22,borderTop:"1px solid rgba(255,255,255,.07)"}}>{Attribution}</div>}
        </div>

        {/* Right — decorative pull panel + attribution (desktop only) */}
        {!isMobile&&(
          <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",height:"100%",paddingTop:4,opacity:on?1:0,transition:"opacity .8s ease .3s"}}>
            {/* Ghost opening quote mark */}
            <div style={{fontFamily:"'DidotLTStd',serif",fontWeight:700,fontSize:"clamp(100px,10vw,160px)",color:"rgba(0,186,220,.07)",lineHeight:1,userSelect:"none",marginBottom:24}}>"</div>
            {/* Blueprint corner bracket */}
            <div style={{position:"relative",width:60,height:60,marginBottom:"auto"}}>
              {[{t:0,l:0,w:14,h:1},{t:0,l:0,w:1,h:14},{t:0,r:0,w:14,h:1},{t:0,r:0,w:1,h:14},{b:0,l:0,w:14,h:1},{b:0,l:0,w:1,h:14},{b:0,r:0,w:14,h:1},{b:0,r:0,w:1,h:14}].map((seg,i)=>(
                <div key={i} style={{position:"absolute",background:"rgba(0,186,220,.25)",top:seg.t,left:seg.l,right:seg.r,bottom:seg.b,width:seg.w,height:seg.h}}/>
              ))}
              <div style={{position:"absolute",top:"50%",left:"50%",width:4,height:4,borderRadius:"50%",background:"rgba(0,186,220,.3)",transform:"translate(-50%,-50%)"}}/>
            </div>
            {/* Attribution */}
            <div style={{marginTop:48,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.07)",width:"100%"}}>{Attribution}</div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────
function Footer(){
  return(
    <footer style={{background:BG3,borderTop:"1px solid rgba(255,255,255,.05)",padding:"26px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:15,color:FG}}>Work<span style={{color:BLUE}}>Labs</span></span>
      <span style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"rgba(248,248,248,.18)",letterSpacing:"0.04em"}}>A NELSON Worldwide Initiative — {new Date().getFullYear()}</span>
      <a href="https://www.nelsonworldwide.com" target="_blank" rel="noreferrer" style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"rgba(248,248,248,.26)",textDecoration:"none",letterSpacing:"0.08em",transition:"color .2s"}}
        onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color="rgba(248,248,248,.26)"}>
        nelsonworldwide.com →
      </a>
    </footer>
  );
}

// ─── ROOT ───────────────────────────────────
export default function WorkLabs(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [preloaderDone,setPreloaderDone]=useState(false);
  const [scrollLocked,setScrollLocked]=useState(false);
  function handlePreloaderDone(){
    setPreloaderDone(true);
    setScrollLocked(true);
    const el=document.querySelector(".wl");
    if(el)el.scrollTop=0;
    setTimeout(()=>setScrollLocked(false),1200);
  }
  return(
    <>
      {!preloaderDone&&<Preloader onDone={handlePreloaderDone}/>}
      <div className="wl" style={{background:BG,color:FG,minHeight:"100vh",fontFamily:"'Poppins',sans-serif",height:"100vh",overflowY:(!preloaderDone||scrollLocked)?"hidden":"auto",overscrollBehavior:"none"}}>
        <style>{CSS}</style>
        <DynamicIslandNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MenuOverlay open={menuOpen} onClose={()=>setMenuOpen(false)}/>
        <Hero preloaderDone={preloaderDone}/>
        <NetworkSection/>
        <WorkSection/>
        <Manifesto/>
        <Footer/>
      </div>
    </>
  );
}
