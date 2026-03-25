import { useState, useEffect, useRef } from "react";

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
const LOGO="https://nelsonworldwide.com/wp-content/uploads/2020/01/nelson-logo-light.svg";
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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Poppins:ital,wght@0,300;0,400;1,400&display=swap');
  .wl *,.wl *::before,.wl *::after{box-sizing:border-box;margin:0;padding:0;}
  @keyframes wlUp    {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes wlIn    {from{opacity:0}to{opacity:1}}
  @keyframes wlLine  {from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes wlModal {from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes wlBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
  @keyframes wlPulse {0%,100%{opacity:0.5}50%{opacity:0.1}}
  @keyframes wlCount {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes greenGlow{0%,100%{background:#4ade80;box-shadow:0 0 4px #4ade80,0 0 10px rgba(74,222,128,.4);transform:scale(1);}50%{background:#6ef09a;box-shadow:0 0 8px #4ade80,0 0 18px rgba(74,222,128,.6);transform:scale(1.3);}}
  @keyframes nodePulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
  @keyframes centerBreath{0%,100%{box-shadow:0 0 0 0 rgba(0,186,220,0),0 0 28px rgba(0,186,220,.35)}50%{box-shadow:0 0 0 14px rgba(0,186,220,0),0 0 52px rgba(0,186,220,.55)}}
  @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes liveBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.8)}}

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
  return <span style={{fontSize:"11px",fontWeight:500,letterSpacing:"0.05em",color:"rgba(248,248,248,.45)",minWidth:"100px",display:"inline-flex",alignItems:"center",fontFamily:"'DM Sans',sans-serif"}}>{d}<BlinkCursor/></span>;
}
function DynamicIslandNav({menuOpen,setMenuOpen}){
  return(
    <div style={{position:"fixed",top:"16px",left:"50%",transform:"translateX(-50%)",zIndex:400,width:"min(640px,calc(100vw - 24px))",borderRadius:"16px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.07)"}}>
      <div style={{background:"rgba(14,12,10,.97)",backdropFilter:"blur(24px)",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",minWidth:0,overflow:"hidden"}}>
          {/* PLACEHOLDER: swap img for NELSON logo SVG on deploy */}
          <img src={LOGO} alt="NELSON" style={{height:"16px",filter:"brightness(0) invert(1)",opacity:.65,flexShrink:0}} onError={e=>e.target.style.display="none"}/>
          <div style={{width:"1px",height:"13px",background:"rgba(255,255,255,.12)",flexShrink:0}}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",fontWeight:600,letterSpacing:"0.03em",whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{color:FG}}>Work</span><span style={{color:BLUE}}>Labs</span>
          </span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"14px",flexShrink:0,marginLeft:"12px"}}>
          <a href="https://www.nelsonworldwide.com" target="_blank" rel="noreferrer"
            style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",textDecoration:"none",padding:"5px 13px",border:"1px solid rgba(0,186,220,.35)",color:BLUE,borderRadius:"4px",transition:"background .2s"}}
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
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:"rgba(248,248,248,.3)",whiteSpace:"nowrap"}}>Lab is active.</span>
          <div style={{width:"1px",height:"10px",background:"rgba(255,255,255,.08)",flexShrink:0}}/>
          <StatusCycler/>
        </div>
        {/* Projects pill — acts as anchor button */}
        <button
          onClick={()=>{
            const el=document.getElementById("work");
            if(el){
              const root=document.querySelector(".wl");
              // Find the ProjectHeader inside WorkSection for precise landing target
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
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:500,color:"rgba(248,248,248,.35)",letterSpacing:"0.08em",whiteSpace:"nowrap"}}>
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
        <a key={l} href={h} onClick={onClose} style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,4vw,38px)",fontWeight:400,color:FG,textDecoration:"none",letterSpacing:"0.04em",transition:"color .2s"}}
          onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color=FG}>{l}</a>
      ))}
      <button onClick={onClose} style={{position:"absolute",top:"28px",right:"28px",background:"transparent",border:"none",color:"rgba(248,248,248,.3)",cursor:"pointer",fontSize:"22px"}}>✕</button>
    </div>
  );
}

// ─── HERO ───────────────────────────────────
function Hero(){
  const [rdy,setRdy]=useState(false);const [heroVis,setHeroVis]=useState(true);const isMobile=useIsMobile();
  useEffect(()=>{
    const t=setTimeout(()=>setRdy(true),80);
    const root=document.querySelector(".wl");
    const fn=()=>{const el=root||document.documentElement;setHeroVis(el.scrollTop<window.innerHeight*.65);};
    const tgt=root||window;tgt.addEventListener("scroll",fn,{passive:true});
    return()=>{clearTimeout(t);tgt.removeEventListener("scroll",fn);};
  },[]);
  const a=(d)=>rdy?{animation:`wlUp .65s cubic-bezier(.22,1,.36,1) ${d}s both`}:{opacity:0};
  return(
    <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:`0 ${isMobile?"24px":"48px"} clamp(80px,10vh,100px)`,overflow:"hidden",background:BG}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 55% at 65% 40%,rgba(0,186,220,.09) 0%,transparent 65%),radial-gradient(ellipse 45% 45% at 10% 75%,rgba(167,139,250,.07) 0%,transparent 58%)`,pointerEvents:"none"}}/>
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.035,pointerEvents:"none"}}>
        <defs><pattern id="wlg" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(248,248,248,1)" strokeWidth=".5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#wlg)"/>
      </svg>
      <div style={{position:"absolute",right:"3%",bottom:"4%",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(100px,18vw,240px)",color:"rgba(0,186,220,.038)",lineHeight:1,userSelect:"none",pointerEvents:"none"}}>01</div>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,transformOrigin:"left",background:"linear-gradient(90deg,transparent,rgba(0,186,220,.55) 40%,rgba(167,139,250,.3) 70%,transparent)",animation:rdy?"wlLine 1.1s cubic-bezier(.22,1,.36,1) .1s both":"none"}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:980}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:BLUE,marginBottom:24,animation:rdy?"wlIn .7s ease .2s both":"none"}}>NELSON Worldwide — Work Labs</div>
        {/* Line 1 — Poppins light, context setter */}
        <div style={{lineHeight:1.1,marginBottom:4,...a(.35)}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:"clamp(15px,2.2vw,26px)",color:"rgba(248,248,248,.65)",letterSpacing:"0.04em"}}>{CONTENT.tagline}</span>
        </div>
        {/* Line 2 — Playfair bold, the punch */}
        <div style={{lineHeight:0.95,marginBottom:6,...a(.55)}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(58px,12vw,110px)",color:FG,letterSpacing:"-0.02em",display:"block"}}>{CONTENT.tagline2}</span>
        </div>
        {/* Line 3 — Playfair bold blue, same size as line 2 */}
        <div style={{lineHeight:0.95,marginBottom:40,...a(.72)}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(58px,12vw,110px)",color:BLUE,letterSpacing:"-0.02em",display:"block"}}>{CONTENT.subtagline}</span>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.82,color:"rgba(248,248,248,.52)",maxWidth:500,...a(1.05)}}>{CONTENT.heroBody}</p>
        <div style={{display:"flex",gap:12,marginTop:36,flexWrap:"wrap",...a(1.18)}}>
          <a href="#work" style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none",padding:"12px 28px",background:BLUE,color:BG,borderRadius:2,transition:"opacity .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Explore the Work</a>
          <a href="#manifesto" style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none",padding:"12px 28px",border:"1px solid rgba(248,248,248,.18)",color:"rgba(248,248,248,.55)",borderRadius:2,transition:"border-color .2s,color .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(248,248,248,.42)";e.currentTarget.style.color=FG;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(248,248,248,.18)";e.currentTarget.style.color="rgba(248,248,248,.55)";}}>Our Manifesto</a>
        </div>
      </div>
      {!isMobile&&(
        <div style={{position:"absolute",bottom:"28px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",opacity:heroVis?.42:0,transition:"opacity .5s",pointerEvents:"none"}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(248,248,248,.5)"}}>Scroll to explore</span>
          <div style={{width:"1px",height:"26px",background:"linear-gradient(to bottom,rgba(248,248,248,.4),transparent)",animation:"wlPulse 2s ease infinite"}}/>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{animation:"wlBounce 1.8s ease infinite"}}><path d="M1 1L6 6L11 1" stroke="rgba(248,248,248,.45)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      )}
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
      <text y={r+14} textAnchor="middle" style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",fill:"rgba(248,248,248,.5)",opacity:active?1:0,transition:`opacity .6s ease ${delay*.4+.3}s`}}>{label}</text>
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
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:420,height:"auto",overflow:"visible"}}>
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
      {/* PLACEHOLDER: swap text for NELSON N logo mark on deploy */}
      <text x={CX} y={CY-4} textAnchor="middle" style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:700,letterSpacing:"0.1em",fill:FG,opacity:active?1:0,transition:"opacity .8s ease .5s"}}>Work</text>
      <text x={CX} y={CY+9} textAnchor="middle" style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:700,letterSpacing:"0.1em",fill:BLUE,opacity:active?1:0,transition:"opacity .8s ease .6s"}}>Labs</text>
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
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?"48px":"64px",alignItems:"center",position:"relative",zIndex:1}}>
        <div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:BLUE,marginBottom:20,opacity:on?1:0,transition:"opacity .6s ease .1s"}}>The Lab</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(26px,3.5vw,46px)",lineHeight:1.18,color:FG,marginBottom:24,opacity:on?1:0,transform:on?"translateY(0)":"translateY(16px)",transition:"opacity .7s ease .2s,transform .7s cubic-bezier(.22,1,.36,1) .2s"}}>{CONTENT.networkHeadline}</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.85,color:"rgba(248,248,248,.55)",opacity:on?1:0,transform:on?"translateY(0)":"translateY(12px)",transition:"opacity .7s ease .35s,transform .7s cubic-bezier(.22,1,.36,1) .35s"}}>{CONTENT.networkBody}</p>
          {/* Two remaining stats, centered */}
          <div style={{marginTop:36,display:"flex",gap:48,opacity:on?1:0,transition:"opacity .7s ease .55s"}}>
            {[["∞","Infinite ideas in queue"],["Zero","Bottlenecks"]].map(([v,l])=>(
              <div key={l}>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(28px,3.2vw,44px)",color:FG,lineHeight:1}}>{v}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:400,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(248,248,248,.35)",marginTop:7}}>{l}</div>
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
function StatItem({stat,active,index,total}){
  const val=useCountUp(stat.value,active,2200+index*150);
  const isMobile=useIsMobile();
  const cols=isMobile?2:4;
  const col=index%cols;
  const row=Math.floor(index/cols);
  const totalRows=Math.ceil(total/cols);
  const isLastCol=col===cols-1;
  const isLastRow=row===totalRows-1;
  return(
    <div style={{textAlign:"center",padding:"32px 16px",position:"relative",opacity:active?1:0,transition:`opacity .5s ease ${index*.12}s`}}>
      {/* Fading vertical divider — right edge, not last in row */}
      {!isLastCol&&(
        <div style={{position:"absolute",right:0,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${BLUE}35 30%,${BLUE}35 70%,transparent)`,pointerEvents:"none"}}/>
      )}
      {/* Fading horizontal divider — bottom edge, not last row */}
      {!isLastRow&&(
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:`linear-gradient(to right,transparent,${BLUE}35 20%,${BLUE}35 80%,transparent)`,pointerEvents:"none"}}/>
      )}
      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(42px,5.5vw,68px)",color:FG,lineHeight:1,letterSpacing:"-0.02em",animation:active?`wlCount .5s ease ${index*.12}s both`:"none"}}>{val}</div>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:400,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(248,248,248,.28)",marginTop:"8px",marginBottom:"10px"}}>{stat.label}</div>
      <div style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 8px",borderRadius:"12px",background:`${stat.color}12`,border:`1px solid ${stat.color}28`,opacity:active?1:0,transition:`opacity .5s ease ${index*.12+.3}s`}}>
        <span style={{fontSize:"8px",color:stat.color,opacity:.8}}>{stat.icon}</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",color:stat.color}}>{stat.badge}</span>
      </div>
    </div>
  );
}

function StatAndFilter({activeFilter,setFilter}){
  const [ref,on]=useReveal(0.15);const isMobile=useIsMobile();
  return(
    <div ref={ref} style={{background:BG3,borderTop:"1px solid rgba(255,255,255,.05)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
        {/* Stats grid */}
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)"}}>
          {CONTENT.stats.map((s,i)=><StatItem key={i} stat={s} active={on} index={i} total={CONTENT.stats.length}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT SECTION HEADER + FILTER ────────
function ProjectHeader({activeFilter,setFilter,on}){
  const isMobile=useIsMobile();
  return(
    <div style={{borderBottom:"1px solid rgba(255,255,255,.055)",background:BG,padding:`40px ${isMobile?"24px":"48px"} 0`}}>
      <div style={{maxWidth:1320,margin:"0 auto"}}>
        {/* Section headline */}
        <div style={{marginBottom:28,opacity:on?1:0,transform:on?"translateY(0)":"translateY(12px)",transition:"opacity .6s ease,transform .6s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:BLUE,marginBottom:14}}>
            Working in
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(28px,4vw,48px)",color:FG,lineHeight:1.1,marginBottom:8}}>{CONTENT.labHeader}</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"clamp(13px,1.3vw,16px)",color:"rgba(248,248,248,.45)",letterSpacing:"0.01em"}}>{CONTENT.labSubhead}</p>
        </div>
        {/* Filter pills */}
        <div style={{paddingBottom:20}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
            <button className="wl-catpill" onClick={()=>setFilter("All")} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",cursor:"pointer",outline:"none",background:activeFilter==="All"?"rgba(248,248,248,.1)":"rgba(248,248,248,.04)",border:activeFilter==="All"?"1px solid rgba(248,248,248,.28)":"1px solid rgba(248,248,248,.1)"}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:activeFilter==="All"?FG:"rgba(248,248,248,.4)"}}>All</span>
            </button>
            {Object.entries(CAT_COLOR).map(([cat,color])=>{
              const isActive=activeFilter===cat;
              return(
                <button key={cat} className="wl-catpill" onClick={()=>setFilter(cat)} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"20px",cursor:"pointer",outline:"none",background:isActive?`${color}22`:`${color}0d`,border:isActive?`1px solid ${color}65`:`1px solid ${color}25`}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:color,flexShrink:0,opacity:isActive?1:.6}}/>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",color:isActive?color:"rgba(248,248,248,.45)",whiteSpace:"nowrap"}}>{cat}</span>
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
  const level=sm.maturity; // 1=concept, 2=prototype, 3=live
  const isLive=status==="Live";
  return(
    <div style={{position:"absolute",bottom:10,left:10,display:"flex",alignItems:"center",gap:5}}>
      {/* 3-segment gauge */}
      <div style={{display:"flex",gap:2,alignItems:"center"}}>
        {[1,2,3].map(n=>(
          <div key={n} style={{width:isMobileCheck()?10:12,height:3,borderRadius:2,background:n<=level?sm.color:`${sm.color}25`,transition:"background .3s"}}/>
        ))}
      </div>
      {/* Live blinking dot */}
      {isLive&&(
        <div style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",animation:"liveBlink 1.8s ease infinite",boxShadow:"0 0 4px #4ade80"}}/>
      )}
    </div>
  );
}
// Helper — safe mobile check outside hook context
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
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:"26px",fontWeight:700,color:cc,opacity:.3,letterSpacing:"0.05em"}}>{initials}</span>
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
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:cc}}>{project.category}</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",padding:"2px 8px",borderRadius:20,background:sm.bg,color:sm.color,whiteSpace:"nowrap",flexShrink:0}}>{sm.label}</span>
        </div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,lineHeight:1.2,color:FG}}>{project.name}</h3>
        <p className="wl-tagline" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:12,lineHeight:1.6,color:"rgba(248,248,248,.42)",opacity:0,transform:"translateY(4px)",transition:"opacity .3s,transform .3s",flex:1}}>{project.tagline}</p>
        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,color:BLUE}}>{project.url?"Open →":"View details →"}</span>
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

  // Auto-cycle first 3 cards at 3.5s each, stop on user interaction
  useEffect(()=>{
    if(userInteracted||projects.length===0)return;
    let idx=0;
    const cycle=()=>{
      setDemoIdx(idx%Math.min(3,projects.length));
      idx++;
      timerRef.current=setTimeout(cycle,3500);
    };
    // Start after a short delay to let cards reveal first
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
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:"32px",fontWeight:700,color:cc,opacity:.28}}>{initials}</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(248,248,248,.18)"}}>Screenshot placeholder</span>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${cc}65,transparent)`}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {[1,2].map(n=>(
          <div key={n} style={{flex:1,borderRadius:4,overflow:"hidden",background:"#0f0f12",position:"relative"}}>
            <div style={{position:"absolute",inset:0,background:grad,opacity:.55}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"8px",letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(248,248,248,.14)"}}>Detail {n}</span>
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
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"0.16em",textTransform:"uppercase",color:cc}}>{project.category}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",padding:"2px 8px",borderRadius:20,background:sm.bg,color:sm.color}}>{sm.label}</span>
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(20px,3vw,26px)",color:FG,lineHeight:1.15}}>{project.name}</h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:13,color:"rgba(248,248,248,.38)",marginTop:5,lineHeight:1.55,fontStyle:"italic"}}>{project.tagline}</p>
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
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(248,248,248,.25)"}}>{label}</span>
                  <div style={{flex:1,height:1,background:"rgba(255,255,255,.05)"}}/>
                </div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:13.5,lineHeight:1.8,color:"rgba(248,248,248,.6)",paddingLeft:20}}>{project.body[key]}</p>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:26,paddingTop:18,borderTop:"1px solid rgba(255,255,255,.06)"}}>
            {project.url?<a href={project.url} target="_blank" rel="noreferrer" style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",textDecoration:"none",padding:"11px 24px",background:BLUE,color:BG,borderRadius:2}}>Open Project →</a>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",padding:"11px 24px",border:"1px solid rgba(255,255,255,.1)",color:"rgba(248,248,248,.28)",borderRadius:2}}>Ask us about this</span>}
            <button onClick={onClose} style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",padding:"11px 18px",background:"transparent",border:"1px solid rgba(255,255,255,.1)",color:"rgba(248,248,248,.28)",borderRadius:2,cursor:"pointer",transition:"border-color .2s,color .2s"}}
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
  return(
    <section id="manifesto" ref={ref} style={{background:BG2,padding:"100px 48px",borderTop:"1px solid rgba(255,255,255,.06)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:"-8%",top:"50%",transform:"translateY(-50%)",width:480,height:480,background:"radial-gradient(ellipse,rgba(0,186,220,.05) 0%,transparent 66%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",left:"-2%",bottom:"-10%",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(100px,15vw,220px)",color:"rgba(248,248,248,.016)",lineHeight:1,userSelect:"none",pointerEvents:"none"}}>02</div>
      <div style={{maxWidth:680,position:"relative",zIndex:1}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:BLUE,marginBottom:24,opacity:on?1:0,transition:"opacity .6s ease .1s"}}>Manifesto</div>
        {/* Mixed-voice headline — setup line + punch line */}
        <div style={{marginBottom:40,opacity:on?1:0,transform:on?"translateY(0)":"translateY(16px)",transition:"opacity .7s ease .2s,transform .7s cubic-bezier(.22,1,.36,1) .2s"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"clamp(15px,1.8vw,22px)",color:"rgba(248,248,248,.55)",letterSpacing:"0.02em",marginBottom:4}}>
            "Why are interior designers
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(32px,4.5vw,58px)",color:FG,lineHeight:1.05,letterSpacing:"-0.01em"}}>
            making apps?"
          </div>
        </div>
        {CONTENT.manifestoParas.map((p,i)=>(
          <p key={i} style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"clamp(14px,1.38vw,17px)",lineHeight:1.9,color:"rgba(248,248,248,.54)",marginBottom:20,opacity:on?1:0,transform:on?"translateY(0)":"translateY(12px)",transition:`opacity .7s ease ${.32+i*.11}s,transform .7s cubic-bezier(.22,1,.36,1) ${.32+i*.11}s`}}>{p}</p>
        ))}
        <div style={{marginTop:40,paddingTop:22,borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,opacity:on?1:0,transition:"opacity .7s ease .65s"}}>
          {/* Left — byline */}
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:24,height:1,background:BLUE}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(248,248,248,.28)",letterSpacing:"0.04em"}}>NELSON Worldwide</span>
          </div>
          {/* Right — overlapping founder avatars */}
          <div style={{display:"flex",alignItems:"center"}}>
            {/* Jeff — blue */}
            <div style={{
              width:40,height:40,borderRadius:"50%",flexShrink:0,
              background:"linear-gradient(135deg,#0090b0,#00BADC)",
              border:"2px solid #0d0d10",
              display:"flex",alignItems:"center",justifyContent:"center",
              zIndex:2,position:"relative",
            }}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:FG}}>JC</span>
            </div>
            {/* Dave — gold, overlaps left */}
            <div style={{
              width:40,height:40,borderRadius:"50%",flexShrink:0,
              background:"linear-gradient(135deg,#c8922a,#a8720a)",
              border:"2px solid #0d0d10",
              display:"flex",alignItems:"center",justifyContent:"center",
              marginLeft:-12,zIndex:1,position:"relative",
            }}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:FG}}>DF</span>
            </div>
            {/* Names */}
            <div style={{marginLeft:12}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,color:"rgba(248,248,248,.65)",lineHeight:1.3}}>Jeff Cumpson</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,color:"rgba(248,248,248,.65)",lineHeight:1.3}}>Dave Filak</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────
function Footer(){
  return(
    <footer style={{background:BG3,borderTop:"1px solid rgba(255,255,255,.05)",padding:"26px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:15,color:FG}}>Work<span style={{color:BLUE}}>Labs</span></span>
      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(248,248,248,.18)",letterSpacing:"0.04em"}}>A NELSON Worldwide Initiative — {new Date().getFullYear()}</span>
      <a href="https://www.nelsonworldwide.com" target="_blank" rel="noreferrer" style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(248,248,248,.26)",textDecoration:"none",letterSpacing:"0.08em",transition:"color .2s"}}
        onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color="rgba(248,248,248,.26)"}>
        nelsonworldwide.com →
      </a>
    </footer>
  );
}

// ─── ROOT ───────────────────────────────────
export default function WorkLabs(){
  const [menuOpen,setMenuOpen]=useState(false);
  return(
    <div className="wl" style={{background:BG,color:FG,minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",height:"100vh",overflowY:"auto"}}>
      <style>{CSS}</style>
      <DynamicIslandNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <MenuOverlay open={menuOpen} onClose={()=>setMenuOpen(false)}/>
      <Hero/>
      <NetworkSection/>
      <WorkSection/>
      <Manifesto/>
      <Footer/>
    </div>
  );
}
