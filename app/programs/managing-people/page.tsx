import type { Metadata } from "next";
import { TrainerRegisterTrigger } from "@/components/sections/trainer-register-trigger";
import { EnquireOptions } from "@/components/sections/enquire-options";

export const metadata: Metadata = {
  title: "Managing People Effectively",
  description:
    "Managing People Effectively by Oakleaf Training & Consulting. Practical leadership and people-management training in Tema and Sunyani, Ghana.",
  alternates: { canonical: "/programs/managing-people" },
};

const styles = `
.mpe{--green:#07864b;--green-dark:#075b36;--green-soft:#eaf6ef;--orange:#f4a51c;--ink:#18251e;--muted:#647168;--paper:#fff;--soft:#f7f9f7;--line:#e3eae5;--radius:22px;--shadow:0 18px 48px rgba(18,52,34,.10);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:var(--paper);line-height:1.6}
.mpe *{box-sizing:border-box}
.mpe section[id]{scroll-margin-top:90px}
.mpe img{max-width:100%;display:block}
.mpe a{color:inherit;text-decoration:none}
.mpe button,.mpe a{-webkit-tap-highlight-color:transparent}
.mpe .container{width:min(1160px,calc(100% - 40px));margin-inline:auto}
.mpe .site-header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(227,234,229,.9)}
.mpe .nav{min-height:82px;display:flex;align-items:center;justify-content:space-between;gap:28px}
.mpe .brand img{width:218px;height:auto}
.mpe .nav-links{display:flex;align-items:center;gap:25px;font-size:.91rem;font-weight:650;color:#36453b}
.mpe .nav-links a:not(.btn):hover{color:var(--green)}
.mpe .btn{display:inline-flex;justify-content:center;align-items:center;gap:9px;border:0;border-radius:999px;padding:13px 20px;font-weight:750;font-size:.93rem;transition:transform .2s,background .2s;cursor:pointer}
.mpe .btn:hover{transform:translateY(-2px)}
.mpe .btn-primary{background:var(--green);color:white;box-shadow:0 8px 20px rgba(7,134,75,.18)}
.mpe .btn-primary:hover{background:var(--green-dark)}
.mpe .btn-light{background:white;color:var(--green-dark)}
.mpe .menu-toggle{display:none;background:white;border:1px solid var(--line);border-radius:12px;padding:9px 12px;font-size:1.25rem;color:var(--green)}
.mpe .hero{padding:44px 0 62px;background:radial-gradient(circle at 0% 10%,#f1faf4 0,transparent 34%),linear-gradient(180deg,#fff 0%,#fbfdfb 100%)}
.mpe .hero-grid{display:grid;grid-template-columns:1.02fr .98fr;align-items:center;gap:34px}
.mpe .eyebrow{display:inline-flex;align-items:center;gap:9px;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem;font-weight:800;color:var(--green)}
.mpe .eyebrow:before{content:"";width:27px;height:3px;border-radius:3px;background:var(--orange)}
.mpe h1,.mpe h2,.mpe h3,.mpe p{margin-top:0}
.mpe h1{font-size:clamp(2.5rem,5.3vw,4.65rem);line-height:1.02;letter-spacing:-.055em;margin:18px 0 18px;font-weight:850;max-width:650px}
.mpe h1 span{color:var(--green)}
.mpe .hero-copy>p{font-size:1.12rem;color:#526158;max-width:560px;margin-bottom:25px}
.mpe .hero-actions{display:flex;flex-wrap:wrap;gap:12px}
.mpe .text-link{font-weight:750;color:var(--green);padding:12px 6px}
.mpe .hero-meta{display:flex;flex-wrap:wrap;gap:18px;margin-top:30px;color:#526158;font-size:.88rem}
.mpe .meta-item{display:flex;align-items:center;gap:8px}
.mpe .dot{width:8px;height:8px;border-radius:50%;background:var(--orange)}
.mpe .hero-visual{position:relative;min-width:0}
.mpe .hero-visual img{width:100%;height:470px;object-fit:cover;object-position:58% center;border-radius:28px;box-shadow:var(--shadow)}
.mpe .hero-visual:before{content:"";position:absolute;inset:-12px 12px 12px -12px;border:2px solid #d7eee0;border-radius:32px;z-index:0}
.mpe .hero-visual img{position:relative;z-index:1}
.mpe .floating-card{position:absolute;z-index:2;left:-20px;bottom:24px;background:white;border:1px solid var(--line);border-radius:18px;padding:16px 19px;box-shadow:var(--shadow);max-width:230px}
.mpe .floating-card strong{display:block;color:var(--green);font-size:1.35rem;line-height:1.1}
.mpe .floating-card span{font-size:.83rem;color:var(--muted)}
.mpe .trust-strip{border-block:1px solid var(--line);background:white}
.mpe .trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:22px 0}
.mpe .trust-item{display:flex;align-items:center;justify-content:center;gap:12px;text-align:left}
.mpe .trust-icon{display:grid;place-items:center;flex:0 0 42px;height:42px;border-radius:13px;background:var(--green-soft);color:var(--green);font-size:1.2rem;font-weight:800}
.mpe .trust-item strong{display:block;font-size:.95rem}
.mpe .trust-item span{display:block;color:var(--muted);font-size:.8rem}
.mpe section{padding:84px 0}
.mpe .section-head{max-width:720px;margin:0 auto 38px;text-align:center}
.mpe .section-head .eyebrow{justify-content:center}
.mpe .section-head h2{font-size:clamp(2rem,3.5vw,3rem);line-height:1.1;letter-spacing:-.04em;margin:14px 0}
.mpe .section-head p{color:var(--muted);font-size:1.04rem;margin-bottom:0}
.mpe .overview-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:50px;align-items:center}
.mpe .overview-photo{position:relative}
.mpe .overview-photo img{height:400px;width:100%;object-fit:cover;border-radius:var(--radius)}
.mpe .photo-label{position:absolute;bottom:18px;left:18px;right:18px;padding:15px 18px;border-radius:16px;background:rgba(255,255,255,.94);font-weight:750}
.mpe .overview-copy h2{font-size:clamp(2rem,3.2vw,2.8rem);letter-spacing:-.04em;line-height:1.12;margin:14px 0}
.mpe .overview-copy p{color:var(--muted)}
.mpe .check-list{padding:0;margin:23px 0 0;list-style:none;display:grid;gap:13px}
.mpe .check-list li{display:flex;gap:11px;align-items:flex-start}
.mpe .check{display:grid;place-items:center;flex:0 0 23px;height:23px;background:var(--green-soft);color:var(--green);border-radius:50%;font-size:.8rem;font-weight:900;margin-top:2px}
.mpe .attend-grid{padding:0;margin:6px auto 0;list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:13px;max-width:880px}
.mpe .attend-grid li{display:flex;gap:11px;align-items:center;background:white;border:1px solid var(--line);border-radius:14px;padding:14px 18px;font-weight:650}
.mpe .outcomes{background:var(--soft)}
.mpe .outcome-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.mpe .outcome-card{background:white;border:1px solid var(--line);padding:22px 18px;border-radius:18px;min-height:190px}
.mpe .outcome-card .num{font-size:.76rem;font-weight:850;color:var(--orange);letter-spacing:.08em}
.mpe .outcome-card h3{font-size:1.04rem;line-height:1.25;margin:12px 0 8px}
.mpe .outcome-card p{font-size:.88rem;color:var(--muted);margin-bottom:0}
.mpe .modules-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.mpe .module-card{border:1px solid var(--line);border-radius:22px;overflow:hidden;background:white;display:grid;grid-template-columns:.78fr 1fr;min-height:275px;box-shadow:0 8px 24px rgba(18,52,34,.035)}
.mpe .module-card img{width:100%;height:100%;min-height:275px;object-fit:cover}
.mpe .module-body{padding:23px 22px}
.mpe .module-number{font-size:.77rem;letter-spacing:.1em;text-transform:uppercase;color:var(--green);font-weight:850}
.mpe .module-body h3{font-size:1.3rem;line-height:1.2;margin:7px 0 13px}
.mpe .module-body ul{padding-left:18px;margin:0;color:#5b685f;font-size:.9rem}
.mpe .module-body li{margin:5px 0}
.mpe .methodology{background:var(--green-dark);color:white;overflow:hidden;position:relative}
.mpe .methodology:after{content:"";position:absolute;width:440px;height:440px;border:70px solid rgba(255,255,255,.045);border-radius:50%;right:-160px;top:-200px}
.mpe .method-grid{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center}
.mpe .methodology .eyebrow{color:#bce9cd}
.mpe .methodology h2{font-size:clamp(2rem,3.5vw,3rem);line-height:1.1;letter-spacing:-.04em;margin:14px 0}
.mpe .methodology p{color:#d5e8dc}
.mpe .method-steps{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.mpe .method-step{border:1px solid rgba(255,255,255,.2);border-radius:17px;padding:20px;background:rgba(255,255,255,.06)}
.mpe .method-step strong{display:block;font-size:1.05rem;margin:6px 0}
.mpe .method-step p{font-size:.88rem;margin:0}
.mpe .method-step .step-icon{font-size:1.4rem;color:#ffc34c}

.mpe .credential-pills{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}
.mpe .pill{padding:8px 12px;background:var(--green-soft);border-radius:999px;font-size:.8rem;font-weight:700;color:var(--green-dark)}
.mpe .sessions{background:#fbfdfb}
.mpe .session-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:stretch}
.mpe .session-card{border:1px solid var(--line);border-radius:24px;background:white;padding:28px;position:relative;overflow:hidden}
.mpe .session-card.featured{border:2px solid var(--green);box-shadow:var(--shadow)}
.mpe .session-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:19px}
.mpe .session-tag{font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--green)}
.mpe .session-card h3{font-size:1.55rem;margin:0}
.mpe .session-detail{display:flex;gap:12px;margin:16px 0;color:#536157}
.mpe .session-detail .s-icon{color:var(--green);font-size:1.1rem;width:24px}
.mpe .session-detail strong{display:block;color:var(--ink);font-size:.92rem}
.mpe .session-detail span{font-size:.9rem}
.mpe .session-bottom{border-top:1px solid var(--line);padding-top:18px;margin-top:22px;display:flex;align-items:center;justify-content:space-between;gap:14px}
.mpe .fee-label{font-size:.78rem;color:var(--muted)}
.mpe .fee{font-size:1.7rem;font-weight:850;letter-spacing:-.04em;color:var(--green)}
.mpe .fee small{font-size:.8rem;font-weight:600;letter-spacing:0;color:var(--muted)}
.mpe .enquire-wrap{position:relative;display:inline-flex}
.mpe .enquire-menu{position:absolute;right:0;bottom:calc(100% + 10px);z-index:30;min-width:230px;background:white;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:8px}
.mpe .enquire-menu a{display:block;padding:11px 14px;border-radius:10px;font-size:.9rem;font-weight:650;color:#36453b}
.mpe .enquire-menu a:hover{background:var(--green-soft);color:var(--green-dark)}
.mpe .enquire-menu a small{display:block;font-size:.76rem;font-weight:500;color:var(--muted)}
.mpe .note{font-size:.86rem;color:var(--muted);margin-top:18px}
.mpe .cta-band{padding:0 0 84px;background:#fbfdfb}
.mpe .cta-inner{background:linear-gradient(115deg,var(--green),#05653b);color:white;border-radius:28px;padding:42px 46px;display:flex;align-items:center;justify-content:space-between;gap:28px;position:relative;overflow:hidden}
.mpe .cta-inner:after{content:"";position:absolute;width:250px;height:250px;border:35px solid rgba(255,255,255,.09);border-radius:50%;right:22%;top:-150px}
.mpe .cta-inner h2{font-size:clamp(1.8rem,3vw,2.6rem);line-height:1.1;letter-spacing:-.04em;margin:0 0 10px;max-width:600px;position:relative;z-index:1}
.mpe .cta-inner p{color:#d9eee1;margin:0;position:relative;z-index:1}
.mpe .cta-inner .btn{flex-shrink:0;position:relative;z-index:1}
.mpe .footer-grid{display:grid;grid-template-columns:1.1fr .9fr .9fr;gap:36px;padding-bottom:30px}
.mpe .footer-logo{width:200px;background:white;border-radius:8px;padding:7px;margin-bottom:15px}
.mpe .footer-intro{color:#bbcec1;max-width:340px;font-size:.9rem}
.mpe .footer-col h3{font-size:.95rem;color:white;margin-bottom:14px}
.mpe .footer-col a,.mpe .footer-col p{display:block;color:#bbcec1;font-size:.9rem;margin:8px 0}
.mpe .footer-col a:hover{color:white}
.mpe .copyright{border-top:1px solid rgba(255,255,255,.13);padding-top:18px;color:#a8bcae;font-size:.8rem;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:1000px){.mpe .nav-links{gap:15px}.mpe .hero-grid{gap:24px}.mpe .hero-visual img{height:420px}.mpe .outcome-grid{grid-template-columns:repeat(3,1fr)}.mpe .module-card{grid-template-columns:1fr}.mpe .module-card img{height:180px;min-height:180px}.mpe .module-body{padding:21px}.mpe .module-card{min-height:0}}
@media(max-width:760px){.mpe .container{width:min(100% - 30px,600px)}.mpe .nav{min-height:72px}.mpe .brand img{width:180px}.mpe .menu-toggle{display:block}.mpe .nav-links{display:none;position:absolute;left:15px;right:15px;top:68px;background:white;border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:var(--shadow);align-items:stretch;flex-direction:column;gap:14px}.mpe .nav-links.open{display:flex}.mpe .nav-links .btn{width:100%}.mpe .hero{padding:30px 0 42px}.mpe .hero-grid{grid-template-columns:1fr;gap:28px}.mpe .hero-copy{order:1}.mpe .hero-visual{order:2}.mpe .hero-visual img{height:340px}.mpe .floating-card{left:12px;bottom:14px}.mpe .hero-copy>p{font-size:1rem}.mpe .hero-meta{gap:12px}.mpe .trust-grid{grid-template-columns:1fr;gap:14px;padding:20px 0}.mpe .trust-item{justify-content:flex-start}.mpe .trust-item span{font-size:.82rem}.mpe .attend-grid{grid-template-columns:1fr}.mpe section{padding:62px 0}.mpe .overview-grid,.mpe .method-grid{grid-template-columns:1fr;gap:28px}.mpe .overview-photo img{height:300px}.mpe .outcome-grid{grid-template-columns:1fr 1fr}.mpe .outcome-card{min-height:0;padding:18px}.mpe .modules-grid{grid-template-columns:1fr}.mpe .module-card{grid-template-columns:.78fr 1fr}.mpe .module-card img{height:100%;min-height:250px}.mpe .module-body{padding:18px}.mpe .module-body h3{font-size:1.15rem}.mpe .method-steps{gap:10px}.mpe .session-grid{grid-template-columns:1fr}.mpe .session-card{padding:23px}.mpe .cta-band{padding-bottom:62px}.mpe .cta-inner{padding:30px 24px;align-items:flex-start;flex-direction:column}.mpe .footer-grid{grid-template-columns:1fr 1fr;gap:28px}.mpe .footer-grid>div:first-child{grid-column:1/-1}}
@media(max-width:460px){.mpe .enquire-wrap{width:100%}.mpe .enquire-wrap>.btn{width:100%}.mpe .enquire-menu{left:0;right:0}.mpe h1{font-size:2.65rem}.mpe .hero-visual img{height:290px}.mpe .outcome-grid{grid-template-columns:1fr}.mpe .outcome-card{padding:19px}.mpe .module-card{grid-template-columns:1fr}.mpe .module-card img{height:190px;min-height:190px}.mpe .module-body{padding:22px}.mpe .method-steps{grid-template-columns:1fr}.mpe .session-bottom{align-items:flex-start;flex-direction:column}.mpe .session-bottom .btn{width:100%}.mpe .footer-grid{grid-template-columns:1fr}.mpe .footer-grid>div:first-child{grid-column:auto}.mpe .copyright{flex-direction:column}}
@media(prefers-reduced-motion:reduce){.mpe *,.mpe *:before,.mpe *:after{transition:none!important}}
`;

export default function ManagingPeoplePage() {
  return (
    <div className="mpe">
      <style>{styles}</style>

      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Oakleaf Training &amp; Consulting</div>
            <h1>
              Managing People <span>Effectively.</span>
            </h1>
            <p>
              Build the practical leadership and people-management skills to motivate teams, navigate
              challenges and help your organisation achieve its goals.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#sessions">
                Explore Upcoming Sessions <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#modules">
                Explore the modules ↓
              </a>
            </div>
            <div className="hero-meta">
              <div className="meta-item">
                <span className="dot"></span>3-day practical workshop
              </div>
              <div className="meta-item">
                <span className="dot"></span>Tema and Sunyani, Ghana
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/images/managing-people-hero.jpg"
              alt="A trainer facilitating an interactive session with adult learners"
            />
            <div className="floating-card">
              <strong>4 core modules</strong>
              <span>Self-awareness, communication, team management and leadership.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-grid">
          <div className="trust-item">
            <div className="trust-icon">◎</div>
            <div>
              <strong>People-first management</strong>
              <span>Lead people before systems and resources.</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">↗</div>
            <div>
              <strong>Practical skills transfer</strong>
              <span>Learn through practice and reflection.</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">◇</div>
            <div>
              <strong>Workplace application</strong>
              <span>Connect leadership skills to results.</span>
            </div>
          </div>
        </div>
      </div>

      <section id="overview">
        <div className="container overview-grid">
          <div className="overview-photo">
            <img
              src="/images/managing-people-team.png"
              alt="Colleagues working together during a team session"
            />
            <div className="photo-label">
              Better people management supports organisational growth.
            </div>
          </div>
          <div className="overview-copy">
            <div className="eyebrow">Why this programme</div>
            <h2>Management starts with people.</h2>
            <p>
              Every organisation depends on people working together to deliver results. When managers,
              team leaders and supervisors lack effective people-management skills, performance and
              growth can suffer.
            </p>
            <p>
              This three-day workshop gives participants a practical toolbox of skills, attitudes and
              behaviours to lead and manage people more effectively in pursuit of organisational goals.
            </p>
            <ul className="check-list">
              <li>
                <span className="check">✓</span>
                <span>Understand and practise effective people management at work.</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Strengthen personal leadership and effectiveness.</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Influence, motivate and support people to perform.</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Manage teams while addressing conflict and diversity.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="who-should-attend">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Who should attend</div>
            <h2>If you work with people, this is for you</h2>
          </div>
          <ul className="attend-grid">
            <li>
              <span className="check">✓</span>
              <span>Managers</span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>Supervisors and team leaders</span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>Business owners / entrepreneurs</span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>Leaders</span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>Anyone who works with people</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="outcomes" id="outcomes">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Workshop outcomes</div>
            <h2>What you will take back to work</h2>
            <p>
              Develop practical, measurable capabilities to lead people and support business goals.
            </p>
          </div>
          <div className="outcome-grid">
            <article className="outcome-card">
              <div className="num">OUTCOME 01</div>
              <h3>Manage people effectively</h3>
              <p>Apply people-management practices that support growth and results.</p>
            </article>
            <article className="outcome-card">
              <div className="num">OUTCOME 02</div>
              <h3>Build personal leadership</h3>
              <p>Improve leadership effectiveness through stronger personal skills.</p>
            </article>
            <article className="outcome-card">
              <div className="num">OUTCOME 03</div>
              <h3>Influence with purpose</h3>
              <p>Use management and leadership skills to influence people constructively.</p>
            </article>
            <article className="outcome-card">
              <div className="num">OUTCOME 04</div>
              <h3>Motivate performance</h3>
              <p>Help people stay motivated and work towards high performance.</p>
            </article>
            <article className="outcome-card">
              <div className="num">OUTCOME 05</div>
              <h3>Lead teams through challenges</h3>
              <p>Manage teams effectively and deal with conflict and diversity.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="modules">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Programme curriculum</div>
            <h2>Four modules. One stronger manager.</h2>
            <p>Explore the key themes covered in the Managing People Effectively workshop.</p>
          </div>
          <div className="modules-grid">
            <article className="module-card">
              <img
                src="/images/managing-people-leadership.png"
                alt="Professional trainer guiding participants in a workshop"
              />
              <div className="module-body">
                <div className="module-number">Module 01</div>
                <h3>Understanding Yourself</h3>
                <ul>
                  <li>Developing self-awareness</li>
                  <li>Using emotional intelligence</li>
                  <li>Applying assertiveness</li>
                  <li>Examining assumptions</li>
                  <li>Clarifying values</li>
                  <li>Developing a personal mission statement</li>
                </ul>
              </div>
            </article>
            <article className="module-card">
              <img
                src="/images/managing-people-communication.png"
                alt="Colleagues communicating during a work meeting"
              />
              <div className="module-body">
                <div className="module-number">Module 02</div>
                <h3>Interacting with Others</h3>
                <ul>
                  <li>Communicating effectively and sending messages</li>
                  <li>Active listening and reading non-verbal cues</li>
                  <li>Teaching skills and giving feedback</li>
                  <li>Negotiating and managing conflict</li>
                  <li>Valuing diversity</li>
                </ul>
              </div>
            </article>
            <article className="module-card">
              <img
                src="/images/managing-people-team.png"
                alt="A team collaborating around a table"
              />
              <div className="module-body">
                <div className="module-number">Module 03</div>
                <h3>Managing a Team</h3>
                <ul>
                  <li>Setting goals and planning</li>
                  <li>Designing work</li>
                  <li>Building high-performing teams</li>
                  <li>Motivating others — 101 ways</li>
                  <li>Clarifying values and personal mission</li>
                </ul>
              </div>
            </article>
            <article className="module-card">
              <img
                src="/images/managing-people-hero.jpg"
                alt="A manager guiding colleagues through a collaborative discussion"
              />
              <div className="module-body">
                <div className="module-number">Module 04</div>
                <h3>Leading Others</h3>
                <ul>
                  <li>Taking an ethical path and ensuring cultural fit</li>
                  <li>Solving problems and building power</li>
                  <li>Managing change</li>
                  <li>Helping others improve</li>
                  <li>Coaching, mentoring and managing careers</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="methodology" id="methodology">
        <div className="container method-grid">
          <div>
            <div className="eyebrow">How we learn</div>
            <h2>Learning that moves beyond knowledge.</h2>
            <p>
              Oakleaf Training &amp; Consulting uses the GRID Training Method, designed by Len Stevens
              and widely used in South Africa. The methodology is designed to support skills transfer
              during the workshop, connecting knowledge with practice, attitude and behaviour.
            </p>
            <p>
              The experience is highly interactive and focuses on applying ideas—not just hearing about
              them.
            </p>
          </div>
          <div className="method-steps">
            <div className="method-step">
              <div className="step-icon">✦</div>
              <strong>Practical cases</strong>
              <p>Explore realistic workplace situations and decisions.</p>
            </div>
            <div className="method-step">
              <div className="step-icon">▦</div>
              <strong>Group activities</strong>
              <p>Learn collaboratively through structured exercises.</p>
            </div>
            <div className="method-step">
              <div className="step-icon">◎</div>
              <strong>Personal reflection</strong>
              <p>Examine assumptions, values and leadership habits.</p>
            </div>
            <div className="method-step">
              <div className="step-icon">↗</div>
              <strong>Coaching &amp; presentations</strong>
              <p>Practise ideas, share learning and build confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sessions" id="sessions">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Upcoming sessions</div>
            <h2>Choose your location</h2>
            <p>Join a three-day Managing People Effectively workshop in Tema or Sunyani.</p>
          </div>
          <div className="session-grid">
            <article className="session-card featured">
              <div className="session-top">
                <div>
                  <div className="session-tag">Sunyani</div>
                  <h3>November session</h3>
                </div>
                <span className="trust-icon">⌖</span>
              </div>
              <div className="session-detail">
                <div className="s-icon">▦</div>
                <div>
                  <strong>18–20 November 2026</strong>
                  <span>Three-day workshop</span>
                </div>
              </div>
              <div className="session-detail">
                <div className="s-icon">⌖</div>
                <div>
                  <strong>Hotel — to be confirmed</strong>
                  <span>Sunyani, Ghana</span>
                </div>
              </div>
              <div className="session-bottom">
                <div>
                  <div className="fee-label">Programme fee</div>
                  <div className="fee">
                    GHS 3,700 <small>/ participant</small>
                  </div>
                </div>
                <TrainerRegisterTrigger
                  program="managing-people"
                  programLabel="Managing People Effectively"
                  session="November 2026 – Sunyani"
                  className="btn btn-primary"
                />
                <EnquireOptions sessionLabel="November session in Sunyani" />
              </div>
            </article>
            <article className="session-card">
              <div className="session-top">
                <div>
                  <div className="session-tag">Tema / Accra</div>
                  <h3>December session</h3>
                </div>
                <span className="trust-icon">⌖</span>
              </div>
              <div className="session-detail">
                <div className="s-icon">▦</div>
                <div>
                  <strong>1–3 December 2026</strong>
                  <span>Three-day workshop</span>
                </div>
              </div>
              <div className="session-detail">
                <div className="s-icon">⌖</div>
                <div>
                  <strong>Entreva Hub</strong>
                  <span>Community 25, Tema</span>
                </div>
              </div>
              <div className="session-bottom">
                <div>
                  <div className="fee-label">Programme fee</div>
                  <div className="fee">
                    GHS 3,700 <small>/ participant</small>
                  </div>
                </div>
                <TrainerRegisterTrigger
                  program="managing-people"
                  programLabel="Managing People Effectively"
                  session="December 2026 – Tema"
                  className="btn btn-primary"
                />
                <EnquireOptions sessionLabel="December session in Tema" />
              </div>
            </article>
          </div>
          <p className="note">
            Please contact Oakleaf to confirm registration arrangements and any additional logistical
            details. The Sunyani hotel venue is still to be confirmed.
          </p>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2>Ready to manage people more effectively?</h2>
              <p>Contact Oakleaf Training &amp; Consulting to enquire about the next session.</p>
            </div>
            <a
              className="btn btn-light"
              href="https://wa.me/233243521917?text=Hello%20Oakleaf%2C%20I%27d%20like%20to%20enquire%20about%20Managing%20People%20Effectively."
            >
              WhatsApp Oakleaf <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
