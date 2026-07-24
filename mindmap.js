// Capability map in the RADIAL layout ("See the whole picture" at center).
// Self-rendering: builds its own markup inside #capmap on the home page.
// Interactions: click a phase (or AI) to expand/collapse; hover any node to
// trace all its connections; click a case study to open it.
// On phones (<=640px) the graph swaps for a readable outline (.cm-accordion).
(function(){
  var root=document.getElementById("capmap");
  if(!root)return;

  /* ---------- data ---------- */
  var N={
    center:{t:"See the whole picture",k:"Core idea",type:"center",
      d:"Every capability connects back to one idea: understanding the whole system and the information we have available so the right decisions are analytically backed and logically defensible.",
      biz:"Clarity from complexity. One connected view of the business instead of scattered pieces. I leverage what is available and am always guided by the principle of efficiency. Through the discovery phase, I get a better sense of what we have to work with and how it can all be leveraged to get us to the right business solution, effectively and efficiently, and most importantly, help it scale."},
    discover:{t:"Discover",k:"Phase 01",type:"lens",ang:-90,
      d:"Frame the real problem by understanding the business need and the data behind it. Uncover everything. What is the current status quo and where do we want to go? What are the current systems, assumptions, and facts we operate on? Understanding all of this provides rich detail to help us frame our solution.",
      biz:"I solve the right problem instead of spending effort on the wrong one. I lead with intention and listen with curiosity. Understanding the mission guides my work. Through thoughtful dialogues with various stakeholders, I get a clear picture of where we are and where we want to be. All of this informs and iterates the build. The solution is a journey, and together, we can achieve a desirable outcome."},
    design:{t:"Design",k:"Phase 02",type:"lens",ang:-30,
      d:"Architect the solution and the analysis before building. Present to the necessary stakeholders. Elicit feedback, iterate based on critical feedback, repeat. Design is always evolving, ever changing. Successful teams must always design to stay relevant and to win.",
      biz:"The meticulous scrutiny and iterative design process lands us on a plan that scales and holds up, which saves you from expensive rework later. We will partner to design together and with intention. This is the formula for continued, sustained success."},
    build:{t:"Build",k:"Phase 03",type:"lens",ang:30,
      d:"Create the pipelines, models, tools, and visuals that drive business revenue and value.",
      biz:"Working solutions you can put to use right away, rather than slides and recommendations. In this process, I will provide a proof-of-concept as a vision for what is possible. From there, we partner together to build the final product. This is an iterative process, but an exciting juncture where I use innovation and creative solutioning to get us to the desired end goal."},
    operate:{t:"Operate",k:"Phase 04",type:"lens",ang:90,
      d:"Deliver value, measure it, and drive decisions. The launch is never the finish line. I stay close to how the solution performs in the real world, keep listening to the people who use it, and make sure the results reach the leaders who need them.",
      biz:"Insight your leadership will act on, plus proof that it worked. I close the loop between what we built and what the business gained from it. Wins get measured and communicated, and shortfalls get addressed head on. That is how trust gets built, and how the next project earns its green light."},
    ai:{t:"AI as companion",k:"Force multiplier",type:"ai",ang:150,
      d:"I use AI as a tool and a companion to reach the right answer. What separates real skill from novice use is knowing how to direct it for the right purposes. I sharpen this craft every day, stay current with new developments, and keep pushing what a human and AI partnership can deliver. Rest assured, the judgment, the direction, and the final call always stay with me.",
      biz:"You get more delivered, faster. Used correctly, AI is a force multiplier across every phase. This site and the tools in my case studies were all built in partnership with AI, directed by me every step of the way. That is the modern advantage I bring to your team."},
    foundation:{t:"Empirical foundation",k:"Roots",type:"foundation",ang:210,
      d:"I trained in the empirical sciences, with a degree in Geography and minors in Biology and Chemistry. That training taught me to question assumptions, test before trusting, and follow the evidence wherever it leads. It is the lens I bring to every problem.",
      biz:"Rigor you can trust. My conclusions hold up when someone challenges them, because they are built on tested evidence and documented reasoning, never on a hunch."},

    u_req:{t:"Requirements & stakeholder discovery",type:"concept",p:"discover",
      d:"Turning complex, competing needs into scoped, measurable deliverables.",
      biz:"Expectations get aligned up front, so the solution matches what the business actually needs. Delivering solutions not only requires technical know-how but also the delicate soft skills to negotiate and influence the outcome. My experience in the private and public sectors has allowed me to hone these skills and deliver holistic solutions for the organization."},
    u_metrics:{t:"Metrics & KPI design",type:"concept",p:"discover",
      d:"Defining the measures and frameworks that show whether something is working, while having the foresight to communicate them back in a meaningful and actionable way.",
      biz:"Impact and meaningful metrics with the ability to speak to and make sense of what is being communicated. This requires understanding the audience and tailoring dashboards to specific stakeholders. What one group finds valuable, another may see as noise. Being able to tactically switch and define these metrics is what sets me apart from the rest of the field."},
    u_data:{t:"Data assessment & quality",type:"concept",p:"discover",
      d:"Finding the silos, gaps, assumptions, blind spots, and discrepancies before they drive bad decisions.",
      biz:"Decisions get built on data you can trust and logic that is easy to comprehend. I will not push solutions that are not defensible in terms of what we are trying to achieve and what drives the desired business outcomes. Decision matrices and the reasoning for how we got here are documented and meticulously detailed, so there is never a question of why or a response of \"I don't know\". Knowing where we are will help guide us to where we're going."},
    u_verify:{t:"Verify against primary sources",type:"concept",p:"discover",
      d:"Confirming behavior against the documentation and source systems instead of assumptions.",
      biz:"Fewer costly surprises, and answers that hold up under scrutiny. My decisions and workflow processes will always iterate through the design, build, and operate phases. As I learn more information, I use that knowledge to further fine-tune and improve my solutions. Business is never a one and done endeavor but an always evolving system. What works today may not always be the best solution tomorrow. Being able to observe from a critical lens with fresh perspectives allows me to see what others can't, while also providing an avenue of process improvements to further drive business efficiencies."},

    d_arch:{t:"Enterprise architecture & systems thinking",type:"concept",p:"design",
      d:"Seeing how data, platforms, and people form one coherent whole. Each on its own is valuable, but together they provide a complex web of interconnected truths that can be leveraged to drive business.",
      biz:"Solutions that fit the wider system instead of adding another silo. Context and interconnected pieces provide a wealth of value. I help mine that wealth and present it in a context that businesses will understand."},
    d_model:{t:"Data modeling & SQL",type:"concept",p:"design",
      d:"Designing the structures data lives in, and querying them precisely.",
      biz:"A clean foundation that makes every downstream report faster and correct. In a perfect world, I would design the schema from scratch with sound keys, constraints, and normalization from day one. Most organizations never get that luxury. They run on legacy systems and years of data collected however it arrived. I know how to walk into an inherited database, map how the tables actually relate, and reshape them into a model the whole team can query with confidence."},
    d_integrate:{t:"System & data integration",type:"concept",p:"design",
      d:"Consolidating disconnected silos into one dependable source of truth.",
      biz:"One version of the truth, so teams stop arguing about whose numbers are right."},
    d_analysis:{t:"Analysis & experiment design",type:"concept",p:"design",
      d:"Framing the spatial, statistical, forecasting, or A/B analysis that answers the right questions.",
      biz:"Answers with rigor behind them: real trends, forecasts, and tested causes. My empirical studies in biology and chemistry as an undergraduate laid the foundation for sound hypothesis testing. Formulating the problem statement, forming a hypothesis, and then testing it with statistical significance. I know how to set up experiments and how to test hypotheses. Having that insight when addressing problems allows me to take on challenges head on with a unique perspective and worldview, which ultimately leads me to creative solutions and thinking outside of the box."},

    b_auto:{t:"Automation & data pipelines",type:"concept",p:"build",
      d:"Python, ArcPy, Power Automate, and ETL that clean, move, and transform data without manual work.",
      biz:"Where possible, workflows that can be automated will be automated. Hours of manual work removed, with repeatable and reliable outputs. The aim is to recognize where time is being wasted and where the process pain points lie. Once those friction points have been identified, I can provide creative solutions to smooth out the process, streamlining tedious manual work into automated solutions."},
    b_bi:{t:"BI dashboards & visualization",type:"concept",p:"build",
      d:"Power BI, dashboards, and interactive visuals that make data legible, with key metrics readily available.",
      biz:"Self-serve insights that are custom tailored to stakeholders, taking the guesswork out of navigating these tools. Through understanding the various stakeholders, I will customize these tools so that they drive meaningful value for each specific audience. Depending on who's viewing what, rest assured that they will see only what they need to see, with the key takeaways that matter most to them."},
    b_apps:{t:"Interactive apps & maps",type:"concept",p:"build",
      d:"Experience Builder, web apps, and data-driven popups people actually use. A tool earns its keep through adoption, so I design for the person on the other side of the screen and keep iterating until it feels natural.",
      biz:"Tools your team will actually adopt and use. I measure success by usage, and I stay engaged after launch to smooth out any friction. A tool that gets opened every morning is the outcome I am after."},
    b_carto:{t:"Cartography at scale & standards",type:"concept",p:"build",
      d:"Reusable templates and standards that scale high-quality output across a team. One good map is a win. A system that produces hundreds of good maps is a capability, and that is what I build.",
      biz:"Consistent, on-brand output produced faster across the whole team. I turn one-off craftsmanship into a repeatable standard, so quality stops depending on who happened to make the map that day."},

    r_story:{t:"Data storytelling & influence",type:"concept",p:"operate",
      d:"Presenting methodology and findings clearly to technical and executive audiences alike. Different rooms need different stories. I read the audience, meet them where they are, and walk them from the data to the decision without losing anyone along the way.",
      biz:"Insight that changes decisions because leaders understand it and trust it. A finding that never lands is a finding wasted. I make sure the story behind the numbers gets told in a way that sticks, and that the recommendation is clear enough to act on the same day."},
    r_decisions:{t:"Insight → decisions",type:"concept",p:"operate",
      d:"Translating analysis into clear recommendations and next steps. Analysis is only half the job. The other half is turning it into a decision the business can commit to, with the tradeoffs laid out honestly.",
      biz:"Analysis that ends in action instead of a report nobody reads. Every deliverable I hand over answers the same question: what should we do next, and why? When the reasoning is transparent, decisions get made faster and with more confidence."},
    r_impact:{t:"Impact & effectiveness measurement",type:"concept",p:"operate",
      d:"Defining KPIs, quantifying impact, and finding the root causes of what is working and what is not. If we cannot measure it, we cannot defend it, so I set up the measures early.",
      biz:"Proof of ROI, and a clear path to improve what isn't working. I track the wins and the misses with the same honesty. That discipline keeps the roadmap grounded in results and gives leadership the confidence to keep investing."},
    r_govern:{t:"Program governance & delivery",type:"concept",p:"operate",
      d:"Leading cross-functional delivery on a multimillion-dollar portfolio, covering scope, standards, and mentoring. I set the framework that lets a team move fast while holding quality and trust steady.",
      biz:"Complex programs delivered on time, on scope, and trusted to run. I have led delivery across teams and vendors where the details mattered and the stakes were real. Rest assured, when I own a program, the standards hold and the work ships."},

    p_routing:{t:"Routing automation",type:"proof",p:"ai",url:"case-study-routing-automation.html",
      d:"Case study: event-driven routing that removes manual triage entirely. This one shows how I find a manual pain point and automate it end to end.",
      biz:"Manual handoffs eliminated, and nothing slips through the cracks. Open the case study and operate the live router yourself. It is a working example of how I turn a tedious process into a one and done setup."},
    p_popups:{t:"ArcGIS map popups",type:"proof",p:"ai",url:"case-study-arcgis-popups.html",
      d:"Case study: map popups that compute and explain themselves, with zero dependencies. A good example of delivering insight right where people already work.",
      biz:"Analysts read the market at a glance, with no exports and no extra tools. The full walkthrough shows how I fit rich analytics inside the map itself, so the answer lives where the question gets asked."},
    p_cog:{t:"Center of Gravity tool",type:"proof",p:"ai",url:"case-study-cog-tool.html",
      d:"Case study: a workforce location optimizer that cut hour-long runs down to minutes. Proof of how I diagnose, iterate, and harden a tool for production.",
      biz:"Site decisions in minutes, backed by real drive-time analysis. Read the full story to see the thirteen iterations it took, because tried and true does not happen on the first draft."}
  };
  var TREE={
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

  /* ---------- shell markup ---------- */
  root.innerHTML=
    '<div class="cm-grid">'+
      '<div class="cm-stage"><svg class="cm-svg" viewBox="0 0 1140 980" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Interactive capability map"></svg></div>'+
      '<aside class="cm-detail">'+
        '<div class="cm-k">Detail</div>'+
        '<p class="cm-idle">Hover or tap any node to see what it is, what I deliver for a business, and everything it connects to. Click <b>Discover</b>, <b>Design</b>, <b>Build</b>, <b>Operate</b>, or the <b>AI</b> node to expand it.</p>'+
        '<div class="cm-body" style="display:none;">'+
          '<div class="cm-k cm-kind">Concept</div>'+
          '<h3 class="cm-title"></h3>'+
          '<p class="cm-desc"></p>'+
          '<div class="cm-bizbox"><div class="cm-k2">What I Deliver</div><p class="cm-biz"></p></div>'+
          '<div class="cm-conn">Connects to</div>'+
          '<div class="cm-chips"></div>'+
          '<a class="cm-cta" href="#" style="display:none;">Open case study →</a>'+
        '</div>'+
      '</aside>'+
    '</div>'+
    '<div class="cm-accordion"></div>';

  var svg=root.querySelector(".cm-svg");
  var bodyEl=root.querySelector(".cm-body"),idleEl=root.querySelector(".cm-idle");

  /* ---------- graph structure ---------- */
  var hier=[];
  ["discover","design","build","operate","ai","foundation"].forEach(function(id){hier.push(["center",id]);});
  Object.keys(TREE).forEach(function(p){TREE[p].forEach(function(c){hier.push([p,c]);});});
  var adj={};Object.keys(N).forEach(function(id){adj[id]=[];});
  hier.concat(CROSS).forEach(function(l){adj[l[0]].push(l[1]);adj[l[1]].push(l[0]);});

  /* ---------- layout (radial + collision settle) ---------- */
  var CX=570,CY=480,SPOKE=235;
  function P(r,deg){var a=deg*Math.PI/180;return[CX+r*Math.cos(a),CY+r*Math.sin(a)];}
  N.center.x=CX;N.center.y=CY;N.center.fixed=true;
  ["discover","design","build","operate","ai","foundation"].forEach(function(id){
    var p=P(SPOKE,N[id].ang);N[id].x=p[0];N[id].y=p[1];N[id].fixed=true;
  });

  var cv=document.createElement("canvas").getContext("2d");
  function fontStr(fs,fw){return fw+" "+fs+'px "Hanken Grotesk", sans-serif';}
  function wrap(str,max){var w=str.split(" "),ln=[],c="";for(var i=0;i<w.length;i++){var t=c?c+" "+w[i]:w[i];if(t.length>max&&c){ln.push(c);c=w[i];}else c=t;}if(c)ln.push(c);return ln;}
  function styleFor(n){
    if(n.type==="center")return{fs:16,fw:600,max:14,fill:"#17150F",stroke:"#F26A1B",col:"#F4EFE5",sw:2.5,padx:20,pady:13};
    if(n.type==="lens")return{fs:16,fw:700,max:12,fill:"#F4EFE5",stroke:"#17150F",col:"#17150F",sw:2,padx:20,pady:13};
    if(n.type==="ai")return{fs:14,fw:700,max:12,fill:"#17150F",stroke:"#F26A1B",col:"#F4EFE5",sw:2.5,padx:16,pady:11};
    if(n.type==="foundation")return{fs:12.5,fw:600,max:16,fill:"#F4EFE5",stroke:"#8A8068",col:"#4E4938",sw:1.5,dash:true,padx:14,pady:10};
    if(n.type==="proof")return{fs:12.5,fw:600,max:16,fill:"#fff",stroke:"#F26A1B",col:"#17150F",sw:1.5,padx:14,pady:9,proof:true};
    return{fs:12.5,fw:500,max:17,fill:"#fff",stroke:"#BCB199",col:"#4E4938",sw:1,padx:13,pady:9};
  }
  Object.keys(N).forEach(function(id){
    var n=N[id],s=styleFor(n);n.lines=wrap(n.t,s.max);
    cv.font=fontStr(s.fs,s.fw);var w=0;n.lines.forEach(function(l){w=Math.max(w,cv.measureText(l).width);});
    n.bw=Math.ceil(w)+s.padx*2;n.bh=n.lines.length*(s.fs*1.24)+s.pady*2;n.r=0.5*Math.sqrt(n.bw*n.bw+n.bh*n.bh);n.s=s;
  });
  function unit(x,y){var m=Math.hypot(x,y)||1;return[x/m,y/m];}
  Object.keys(TREE).forEach(function(pid){
    var par=N[pid],u=unit(par.x-CX,par.y-CY),perp=[-u[1],u[0]],kids=TREE[pid],nn=kids.length;
    kids.forEach(function(kid,i){
      var off=(i-(nn-1)/2),out=140,side=off*94;
      var hx=par.x+u[0]*out+perp[0]*side,hy=par.y+u[1]*out+perp[1]*side;
      N[kid].x=hx+(Math.random()-.5)*8;N[kid].y=hy+(Math.random()-.5)*8;N[kid].hx=hx;N[kid].hy=hy;N[kid].vx=0;N[kid].vy=0;
    });
  });
  function settle(iter){
    var ids=Object.keys(N),free=ids.filter(function(id){return !N[id].fixed;});
    for(var t=0;t<iter;t++){
      free.forEach(function(id){var n=N[id];n.ax=(n.hx-n.x)*0.06;n.ay=(n.hy-n.y)*0.06;});
      for(var a=0;a<ids.length;a++)for(var b=a+1;b<ids.length;b++){
        var na=N[ids[a]],nb=N[ids[b]];
        var dx=na.x-nb.x,dy=na.y-nb.y,d=Math.hypot(dx,dy)||.01,min=na.r+nb.r+16;
        if(d<min){var f=(min-d)*0.5/d;
          if(!na.fixed){na.ax=(na.ax||0)+dx*f;na.ay=(na.ay||0)+dy*f;}
          if(!nb.fixed){nb.ax=(nb.ax||0)-dx*f;nb.ay=(nb.ay||0)-dy*f;}
        }
      }
      free.forEach(function(id){var n=N[id];
        n.vx=((n.vx||0)+n.ax)*0.8;n.vy=((n.vy||0)+n.ay)*0.8;
        var sp=Math.hypot(n.vx,n.vy);if(sp>22){n.vx*=22/sp;n.vy*=22/sp;}
        n.x+=n.vx;n.y+=n.vy;
      });
    }
  }

  /* ---------- render ---------- */
  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;");}
  var L=[];
  hier.forEach(function(l){L.push([l[0],l[1],"hier"]);});
  CROSS.forEach(function(l){L.push([l[0],l[1],"cross"]);});
  function build(){
    var lg="",ng="";
    L.forEach(function(l){var a=N[l[0]],b=N[l[1]];
      lg+='<line class="ln '+(l[2]==="cross"?"cross":"")+'" data-s="'+l[0]+'" data-t="'+l[1]+'" x1="'+a.x.toFixed(1)+'" y1="'+a.y.toFixed(1)+'" x2="'+b.x.toFixed(1)+'" y2="'+b.y.toFixed(1)+'"/>';
    });
    Object.keys(N).forEach(function(id){var n=N[id],s=n.s;
      var rx=(-n.bw/2).toFixed(1),ry=(-n.bh/2).toFixed(1),lh=s.fs*1.24;
      var inner='<rect class="chip" x="'+rx+'" y="'+ry+'" rx="10" width="'+n.bw.toFixed(1)+'" height="'+n.bh.toFixed(1)+'" fill="'+s.fill+'" stroke="'+s.stroke+'" stroke-width="'+s.sw+'"'+(s.dash?' stroke-dasharray="4 4"':'')+'/>';
      var ty=(-n.bh/2)+s.pady+s.fs*0.82;
      n.lines.forEach(function(ln,i){inner+='<text x="0" y="'+(ty+i*lh).toFixed(1)+'" text-anchor="middle" font-size="'+s.fs+'" font-weight="'+s.fw+'" fill="'+s.col+'">'+esc(ln)+'</text>';});
      if(TREE[id]){inner+='<circle cx="'+(n.bw/2-2).toFixed(1)+'" cy="'+(-n.bh/2+2).toFixed(1)+'" r="9" fill="'+(n.type==="ai"?"#F26A1B":"#17150F")+'"/><text class="ind" x="'+(n.bw/2-2).toFixed(1)+'" y="'+(-n.bh/2+5.5).toFixed(1)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#ECE6DA">+</text>';}
      if(s.proof){inner+='<text x="'+(n.bw/2-11).toFixed(1)+'" y="'+(-n.bh/2+n.s.pady+n.s.fs*0.82).toFixed(1)+'" text-anchor="middle" font-size="12" fill="#C24B08">↗</text>';}
      if(n.type==="ai"){inner+='<text x="0" y="'+(n.bh/2+14).toFixed(1)+'" text-anchor="middle" font-size="10" letter-spacing="2" fill="#C24B08">★ STANDOUT</text>';}
      ng+='<g class="node n-'+n.type+'" data-id="'+id+'" transform="translate('+n.x.toFixed(1)+','+n.y.toFixed(1)+')"><g class="box">'+inner+'</g></g>';
    });
    svg.innerHTML='<g class="links">'+lg+'</g><g class="nodes">'+ng+'</g>';
    bind();applyState();
  }

  /* ---------- state / interactions ---------- */
  var expanded={discover:false,design:false,build:false,operate:false,ai:false};
  var sticky=null;
  function visible(id){var n=N[id];
    if(n.type==="concept")return expanded[n.p];
    if(n.type==="proof")return expanded.ai;
    return true;
  }
  function applyState(){
    Object.keys(N).forEach(function(id){
      var el=svg.querySelector('.node[data-id="'+id+'"]');
      el.classList.toggle("hidden",!visible(id));el.classList.remove("peekshow","hl");
    });
    svg.querySelectorAll(".ln").forEach(function(el){
      var s=el.getAttribute("data-s"),t=el.getAttribute("data-t");
      el.classList.toggle("hidden",!(visible(s)&&visible(t)));el.classList.remove("hl");
    });
    svg.classList.remove("peeking");
    Object.keys(expanded).forEach(function(id){var ind=svg.querySelector('.node[data-id="'+id+'"] .ind');if(ind)ind.textContent=expanded[id]?"–":"+";});
    if(sticky)peek(sticky);
  }
  function peek(id){
    var nbrs={};nbrs[id]=true;adj[id].forEach(function(x){nbrs[x]=true;});
    svg.classList.add("peeking");
    Object.keys(N).forEach(function(nid){
      var el=svg.querySelector('.node[data-id="'+nid+'"]'),on=!!nbrs[nid];
      el.classList.toggle("hl",on);
      if(on&&!visible(nid))el.classList.add("peekshow");else el.classList.remove("peekshow");
    });
    svg.querySelectorAll(".ln").forEach(function(el){
      var s=el.getAttribute("data-s"),t=el.getAttribute("data-t"),on=(s===id||t===id);
      el.classList.toggle("hl",on);
      if(on)el.classList.remove("hidden");else if(!(visible(s)&&visible(t)))el.classList.add("hidden");
    });
    detail(id);
  }
  function unpeek(){if(sticky){peek(sticky);return;}applyState();idle();}
  function idle(){bodyEl.style.display="none";idleEl.style.display="block";}
  function detail(id){var n=N[id];idleEl.style.display="none";bodyEl.style.display="block";
    root.querySelector(".cm-kind").textContent=n.k||({concept:"Capability",proof:"Case study",lens:"Phase"})[n.type]||"Concept";
    root.querySelector(".cm-title").textContent=n.t;
    root.querySelector(".cm-desc").textContent=n.d;
    root.querySelector(".cm-biz").textContent=n.biz||"";
    var chips=root.querySelector(".cm-chips");chips.innerHTML="";
    adj[id].forEach(function(x){var sp=document.createElement("span");sp.textContent=N[x].t;chips.appendChild(sp);});
    var cta=root.querySelector(".cm-cta");
    if(n.type==="proof"){cta.style.display="inline-flex";cta.href=n.url;}else cta.style.display="none";
  }
  function bind(){
    svg.querySelectorAll(".node").forEach(function(el){
      var id=el.getAttribute("data-id");
      el.addEventListener("pointerenter",function(){peek(id);});
      el.addEventListener("pointerleave",function(){unpeek();});
      el.addEventListener("click",function(){
        var n=N[id];
        if(n.type==="proof"){window.location.href=n.url;return;}
        if(TREE[id]){expanded[id]=!expanded[id];sticky=null;applyState();peek(id);return;}
        sticky=(sticky===id)?null:id;
        if(sticky)peek(sticky);else{applyState();idle();}
      });
    });
  }

  /* ---------- phone outline (accordion) ---------- */
  function accordion(){
    var order=["discover","design","build","operate"],html="";
    order.forEach(function(pid){var p=N[pid];
      html+='<div class="ph"><h3>'+p.k+' · '+esc(p.t)+'</h3><p class="pd">'+esc(p.d)+'</p>';
      TREE[pid].forEach(function(kid){var c=N[kid];
        html+='<div class="card"><div class="ct">'+esc(c.t)+'</div><div class="cd">'+esc(c.d)+'</div><div class="del"><b>What I Deliver</b>'+esc(c.biz)+'</div></div>';
      });
      html+='</div>';
    });
    var ai=N.ai;
    html+='<div class="ph ai"><h3>'+esc(ai.t)+' ★</h3><p class="pd">'+esc(ai.d)+'</p>';
    TREE.ai.forEach(function(kid){var c=N[kid];
      html+='<div class="card"><div class="ct">'+esc(c.t)+'</div><div class="del"><b>What I Deliver</b>'+esc(c.biz)+'</div><a class="open" href="'+c.url+'">Open case study →</a></div>';
    });
    html+='</div>';
    var f=N.foundation;
    html+='<div class="ph"><h3>'+esc(f.t)+'</h3><p class="pd">'+esc(f.d)+'</p><div class="card"><div class="del"><b>What I Deliver</b>'+esc(f.biz)+'</div></div></div>';
    root.querySelector(".cm-accordion").innerHTML=html;
  }

  function boot(){settle(700);build();accordion();}
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(boot);setTimeout(function(){if(!svg.innerHTML)boot();},1200);}else boot();
})();
