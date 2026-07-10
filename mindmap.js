// Capability map — collapsible tree with hover-revealed cross-connections.
// Scoped to the #capmap section so it can live inside the home page.
(function(){
  var root=document.getElementById("capmap");
  if(!root)return;

  var N={
    center:{t:"See the whole picture",k:"Core idea",type:"center",
      d:"Every capability connects back to one idea: understanding the whole system so the right decision becomes obvious.",
      biz:"Clarity from complexity — one connected view of the business, not scattered pieces."},
    discover:{t:"Discover",k:"Phase 01",type:"lens",
      d:"Frame the real problem — the business need and the data behind it.",
      biz:"Solving the right problem, so effort isn't spent on the wrong one."},
    design:{t:"Design",k:"Phase 02",type:"lens",
      d:"Architect the solution and the analysis before building.",
      biz:"A plan that scales and holds up — instead of expensive rework later."},
    build:{t:"Build",k:"Phase 03",type:"lens",
      d:"Create the pipelines, models, tools, and visuals.",
      biz:"Working solutions delivered — not just slides and recommendations."},
    operate:{t:"Operate",k:"Phase 04",type:"lens",
      d:"Deliver value, measure it, and drive decisions.",
      biz:"Insight leadership acts on — and proof that it worked."},
    ai:{t:"AI as companion",k:"Force multiplier",type:"ai",
      d:"AI as a tool and companion to reach the right answer. What separates real skill from novice use is knowing how to direct it — for the right purposes. I hone this every day, stay current with new developments, and push what a human + AI partnership can deliver.",
      biz:"More delivered, faster — using AI correctly is a force multiplier across every phase."},
    foundation:{t:"Empirical foundation",k:"Roots",type:"foundation",
      d:"Trained in the empirical sciences — Geography, with Biology & Chemistry. An evidence-first, analytical lens on every problem.",
      biz:"Evidence-first rigor — conclusions you can trust and defend."},

    u_req:{t:"Requirements & stakeholder discovery",type:"concept",
      d:"Turning complex, competing needs into scoped, measurable deliverables.",
      biz:"Aligned expectations up front — the solution matches what the business actually needs."},
    u_metrics:{t:"Metrics & KPI design",type:"concept",
      d:"Defining the measures and frameworks that show whether something is working.",
      biz:"Everyone agrees on what success looks like — and it's measurable."},
    u_data:{t:"Data assessment & quality",type:"concept",
      d:"Finding the silos, gaps, and discrepancies before they drive bad decisions.",
      biz:"Decisions built on data you can trust, not silent errors."},
    u_verify:{t:"Verify against primary sources",type:"concept",
      d:"Confirming behavior against the docs and source systems, not assumptions.",
      biz:"Fewer costly surprises; answers that hold up under scrutiny."},

    d_arch:{t:"Enterprise architecture & systems thinking",type:"concept",
      d:"Seeing how data, platforms, and people form one coherent whole.",
      biz:"Solutions that fit the wider system instead of adding another silo."},
    d_model:{t:"Data modeling & SQL",type:"concept",
      d:"Designing the structures data lives in, and querying them precisely.",
      biz:"A clean foundation that makes every downstream report faster and correct."},
    d_integrate:{t:"System & data integration",type:"concept",
      d:"Consolidating disconnected silos into one dependable source of truth.",
      biz:"One version of the truth — teams stop arguing about whose numbers are right."},
    d_analysis:{t:"Analysis & experiment design",type:"concept",
      d:"Framing the spatial, statistical, forecasting, or A/B analysis that answers the question.",
      biz:"Answers with rigor behind them — trends, forecasts, and tested causes, not guesses."},

    b_auto:{t:"Automation & data pipelines",type:"concept",
      d:"Python, ArcPy, Power Automate, and ETL that clean, move, and transform data without manual work.",
      biz:"Hours of manual work removed; repeatable, reliable outputs."},
    b_bi:{t:"BI dashboards & visualization",type:"concept",
      d:"Power BI, dashboards, and interactive visuals that make data legible.",
      biz:"Self-serve insight — stakeholders answer their own questions at a glance."},
    b_apps:{t:"Interactive apps & maps",type:"concept",
      d:"Experience Builder, web apps, and data-driven popups people actually use.",
      biz:"Tools teams adopt — not dashboards that gather dust."},
    b_carto:{t:"Cartography at scale & standards",type:"concept",
      d:"Reusable templates and standards that scale high-quality output across a team.",
      biz:"Consistent, on-brand output produced faster across the whole team."},

    r_story:{t:"Data storytelling & influence",type:"concept",
      d:"Presenting methodology and findings clearly to technical and executive audiences alike.",
      biz:"Insight that actually changes decisions — because leaders understand and trust it."},
    r_decisions:{t:"Insight → decisions",type:"concept",
      d:"Translating analysis into clear recommendations and next steps.",
      biz:"Analysis that ends in action, not a report nobody reads."},
    r_impact:{t:"Impact & effectiveness measurement",type:"concept",
      d:"Defining KPIs, quantifying impact, and finding root causes of what's working or not.",
      biz:"Proof of ROI, and a clear path to improve what isn't working."},
    r_govern:{t:"Program governance & delivery",type:"concept",
      d:"Leading cross-functional delivery on a multimillion-dollar portfolio — scope, standards, mentoring.",
      biz:"Complex programs delivered on time, on scope, and trusted to run."},

    p_routing:{t:"Routing automation",type:"proof",url:"case-study-routing-automation.html",
      d:"Case study — event-driven routing that removes manual triage entirely.",
      biz:"Manual handoffs eliminated; nothing slips through the cracks."},
    p_popups:{t:"ArcGIS map popups",type:"proof",url:"case-study-arcgis-popups.html",
      d:"Case study — map popups that compute and explain themselves, with zero dependencies.",
      biz:"Analysts read the market at a glance — no exports, no extra tools."},
    p_cog:{t:"Center of Gravity tool",type:"proof",url:"case-study-cog-tool.html",
      d:"Case study — a workforce-location optimizer; hour-long runs cut to minutes.",
      biz:"Site decisions in minutes, backed by real drive-time analysis."}
  };
  var TREE={
    center:["discover","design","build","operate","ai","foundation"],
    discover:["u_req","u_metrics","u_data","u_verify"],
    design:["d_arch","d_model","d_integrate","d_analysis"],
    build:["b_auto","b_bi","b_apps","b_carto"],
    operate:["r_story","r_decisions","r_impact","r_govern"],
    ai:["p_routing","p_popups","p_cog"]
  };
  var CROSS=[
    ["u_metrics","r_impact"],["u_data","d_integrate"],["u_req","r_story"],
    ["d_model","b_auto"],["d_analysis","b_bi"],["d_integrate","b_auto"],["d_arch","d_integrate"],
    ["b_bi","r_story"],["r_decisions","r_story"],["b_apps","b_bi"],
    ["foundation","d_analysis"],["foundation","u_verify"],["foundation","d_arch"],
    ["ai","b_auto"],["ai","d_analysis"],["ai","u_verify"],["ai","b_bi"],
    ["p_routing","b_auto"],["p_popups","b_bi"],["p_popups","b_apps"],["p_cog","d_analysis"],["p_cog","b_auto"]
  ];

  var parent={},hier=[];
  Object.keys(TREE).forEach(function(p){TREE[p].forEach(function(c){parent[c]=p;hier.push([p,c]);});});
  var adj={};Object.keys(N).forEach(function(id){adj[id]=[];});
  hier.concat(CROSS).forEach(function(l){adj[l[0]].push(l[1]);adj[l[1]].push(l[0]);});

  var tree=root.querySelector(".js-tree"),content=root.querySelector(".js-content"),overlay=root.querySelector(".js-overlay");
  var bodyEl=root.querySelector(".js-body"),idleEl=root.querySelector(".js-idle");

  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;");}
  function chip(id){var n=N[id],kids=TREE[id];
    var s='<div class="tnode t-'+n.type+(kids?" has-kids":"")+(id==="center"?" open":"")+'" data-id="'+id+'">'+esc(n.t);
    if(n.type==="ai")s+='<span class="ai-tag">★</span>';
    if(n.type==="proof")s+='<span class="arrow">↗</span>';
    if(kids)s+='<span class="caret">›</span>';
    return s+"</div>";
  }
  function branch(id){var kids=TREE[id],h='<div class="branch">'+chip(id);
    if(kids){var col=(id==="center")?"":" collapsed";h+='<div class="tchildren'+col+'">'+kids.map(branch).join("")+"</div>";}
    return h+"</div>";
  }
  tree.innerHTML=branch("center");

  function q(id){return tree.querySelector('.tnode[data-id="'+id+'"]');}
  function rectOf(id){var el=q(id);if(!el||el.offsetParent===null)return null;
    var r=el.getBoundingClientRect(),c=content.getBoundingClientRect();
    return {x:r.left-c.left,y:r.top-c.top,w:r.width,h:r.height};}

  var sticky=null;
  function layout(){
    var w=content.scrollWidth,h=content.scrollHeight;
    overlay.setAttribute("width",w);overlay.setAttribute("height",h);overlay.setAttribute("viewBox","0 0 "+w+" "+h);
    var paths="";
    hier.forEach(function(l){var a=rectOf(l[0]),b=rectOf(l[1]);if(!a||!b)return;
      var x1=a.x+a.w,y1=a.y+a.h/2,x2=b.x,y2=b.y+b.h/2,mx=(x1+x2)/2;
      paths+='<path class="tree" data-a="'+l[0]+'" data-b="'+l[1]+'" d="M'+x1+","+y1+" C"+mx+","+y1+" "+mx+","+y2+" "+x2+","+y2+'"/>';
    });
    CROSS.forEach(function(l){var a=rectOf(l[0]),b=rectOf(l[1]);if(!a||!b)return;
      var A=a,B=b;if(a.x>b.x){A=b;B=a;}
      var x1=A.x+A.w,y1=A.y+A.h/2,x2=B.x,y2=B.y+B.h/2,mx=(x1+x2)/2;
      paths+='<path class="cross" data-a="'+l[0]+'" data-b="'+l[1]+'" d="M'+x1+","+y1+" C"+mx+","+y1+" "+mx+","+y2+" "+x2+","+y2+'"/>';
    });
    overlay.innerHTML=paths;
    if(sticky)highlight(sticky);
  }

  function highlight(id){
    var on={};on[id]=true;adj[id].forEach(function(x){on[x]=true;});
    content.classList.add("peeking");
    tree.querySelectorAll(".tnode").forEach(function(el){el.classList.toggle("hl",!!on[el.getAttribute("data-id")]);});
    overlay.querySelectorAll("path").forEach(function(p){var a=p.getAttribute("data-a"),b=p.getAttribute("data-b");p.classList.toggle("hl",(a===id||b===id));});
    detail(id);
  }
  function clearHi(){if(sticky){highlight(sticky);return;}
    content.classList.remove("peeking");
    tree.querySelectorAll(".hl").forEach(function(e){e.classList.remove("hl");});
    overlay.querySelectorAll(".hl").forEach(function(e){e.classList.remove("hl");});
    idle();}

  function idle(){bodyEl.style.display="none";idleEl.style.display="block";}
  function detail(id){var n=N[id];idleEl.style.display="none";bodyEl.style.display="block";
    root.querySelector(".js-kind").textContent=n.k||({concept:"Capability",proof:"Case study",lens:"Phase"})[n.type]||"Concept";
    root.querySelector(".js-title").textContent=n.t;
    root.querySelector(".js-desc").textContent=n.d;
    root.querySelector(".js-biz").textContent=n.biz||"";
    var chips=root.querySelector(".js-chips");chips.innerHTML="";
    adj[id].forEach(function(x){var sp=document.createElement("span");sp.textContent=N[x].t;chips.appendChild(sp);});
    var cta=root.querySelector(".js-cta");
    if(n.type==="proof"){cta.style.display="inline-flex";cta.href=n.url;}else cta.style.display="none";
  }

  function toggle(id){var el=q(id);if(!TREE[id])return;
    var box=el.parentNode.querySelector(":scope > .tchildren");
    var openNow=box.classList.toggle("collapsed")===false;
    el.classList.toggle("open",openNow);
    requestAnimationFrame(layout);
  }

  tree.addEventListener("pointerover",function(e){var el=e.target.closest(".tnode");if(el)highlight(el.getAttribute("data-id"));});
  tree.addEventListener("pointerout",function(e){var el=e.target.closest(".tnode");if(el)clearHi();});
  tree.addEventListener("click",function(e){var el=e.target.closest(".tnode");if(!el)return;
    var id=el.getAttribute("data-id"),n=N[id];
    if(n.type==="proof"){window.location.href=n.url;return;}
    if(TREE[id]){toggle(id);sticky=id;highlight(id);return;}
    sticky=(sticky===id)?null:id;if(sticky)highlight(sticky);else clearHi();
  });

  window.addEventListener("resize",function(){requestAnimationFrame(layout);});
  function boot(){layout();}
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(boot);setTimeout(boot,1200);}else boot();
  window.addEventListener("load",boot);
})();
