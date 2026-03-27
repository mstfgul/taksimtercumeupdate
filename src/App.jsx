import { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import './index.css'

/* ─── DATA ─── */
const SERVICES = [
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ), title: 'Belge Çevirisi', desc: 'Pasaport, nüfus cüzdanı, diploma, sözleşme ve her türlü resmi belgenin profesyonel çevirisi.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ), title: 'Tercümanlık Hizmetleri', desc: 'Mahkeme, noter, iş toplantıları ve konferanslar için deneyimli tercümanlarımızla anlık destek.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ), title: 'Noter Onaylı Çeviri', desc: 'Yeminli mütercimler tarafından hazırlanan, noter onaylı ve resmi kurumlarca kabul edilen çeviriler.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
    </svg>
  ), title: 'Hukuki Çeviri', desc: 'Sözleşmeler, mahkeme kararları, hukuki belgeler için terminoloji uzmanı çevirmenler.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ), title: 'Tıbbi Çeviri', desc: 'Hasta dosyaları, ilaç prospektüsleri, klinik raporlar için tıp terminolojisine hâkim ekip.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ), title: 'Teknik & Yazılım Çeviri', desc: 'Kullanım kılavuzları, teknik şartnameler ve yazılım lokalizasyonu için uzman çevirmenler.' },
]

const LANGUAGES = [
  { code: 'gb', flag: '🇬🇧', name: 'İngilizce', native: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Almanca', native: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', name: 'Fransızca', native: 'Français' },
  { code: 'sa', flag: '🇸🇦', name: 'Arapça', native: 'العربية' },
  { code: 'ru', flag: '🇷🇺', name: 'Rusça', native: 'Русский' },
  { code: 'es', flag: '🇪🇸', name: 'İspanyolca', native: 'Español' },
  { code: 'cn', flag: '🇨🇳', name: 'Çince', native: '中文' },
  { code: 'jp', flag: '🇯🇵', name: 'Japonca', native: '日本語' },
  { code: 'it', flag: '🇮🇹', name: 'İtalyanca', native: 'Italiano' },
  { code: 'nl', flag: '🇳🇱', name: 'Hollandaca', native: 'Nederlands' },
  { code: 'pl', flag: '🇵🇱', name: 'Lehçe', native: 'Polski' },
  { code: 'pt', flag: '🇵🇹', name: 'Portekizce', native: 'Português' },
]

const WHY_FEATURES = [
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ), title: 'Uzman Çevirmen Kadrosu', desc: 'Tüm çevirmenlerimiz ilgili dil ve alanda lisans/lisansüstü eğitim almış, sertifikalı uzmanlardır.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ), title: 'Hızlı & Güvenilir Teslimat', desc: 'Acil teslimatlarda 24 saat içinde, standart çalışmalarda belirlenen sürede kesin teslimat garantisi.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ), title: 'Gizlilik Güvencesi', desc: 'Tüm belgeleriniz NDA kapsamında korunur; veri güvenliği en üst düzeyde sağlanır.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ), title: 'Çift Aşamalı Kalite Kontrol', desc: 'Her çeviri, uzman mütercim ve editör tarafından iki kez incelenerek teslim edilir.' },
]

const CERTS = [
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ), title: 'ISO 17100 Sertifikası', text: 'Uluslararası çeviri hizmetleri standardına uygunluk belgesi.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ), title: 'Yeminli Tercümanlık Yetkisi', text: 'Türkiye Adalet Bakanlığı onaylı yeminli tercüman kadrosu.' },
  { icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ), title: '20+ Yıl Deneyim', text: '2004 yılından bu yana binlerce müvekkile hizmet veriyoruz.' },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Belge Gönderin', desc: 'E-posta veya WhatsApp üzerinden belgelerinizi bize iletebilirsiniz.' },
  { num: '02', title: 'Fiyat Teklifi', desc: 'Belge türü ve dil çiftine göre dakikalar içinde fiyat teklifinizi alın.' },
  { num: '03', title: 'Çeviri Süreci', desc: 'Uzman ekibimiz çevirinizi titizlikle hazırlar, editörden geçirir.' },
  { num: '04', title: 'Teslim & Onay', desc: 'Dijital veya ıslak imzalı çeviriniz belirlenen sürede teslim edilir.' },
]

const HELLOS = [
  'Merhaba', 'Hello', 'Hallo', 'Bonjour', 'Hola', 'Ciao', 'Olá',
  'Привет', 'مرحبا', 'こんにちは', '你好', '안녕하세요', 'नमस्ते',
  'سلام', 'Hej', 'Cześć', 'Γεια σας', 'Bună', 'Ahoj', 'Привіт',
  'Marhaba', 'Shalom', 'Jambo', 'Salut', 'Xin chào',
]

/* ─── SCROLL TO TOP ─── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ─── HOOK: Scroll Reveal ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── HOOK: Navbar scroll ─── */
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return scrolled
}

/* ─── SKYLINE ─── */
const SKYLINE_PATH = "M0,200 L0,150 L40,150 L40,130 L60,130 L60,100 L70,100 L70,80 L75,80 L75,60 L80,60 L80,80 L85,80 L85,100 L95,100 L95,130 L115,130 L115,150 L140,150 L140,140 L160,140 L160,120 L170,120 L170,100 L175,95 L180,100 L180,120 L190,120 L190,140 L220,140 L220,150 L260,150 L260,130 L280,130 L280,80 L285,75 L290,70 L295,65 L300,60 L302,55 L304,60 L305,65 L308,70 L310,75 L315,80 L315,130 L340,130 L340,150 L380,150 L380,140 L400,140 L400,115 L410,115 L410,90 L415,85 L420,90 L420,115 L430,115 L430,140 L460,140 L460,150 L500,150 L500,130 L520,130 L520,100 L525,95 L528,80 L530,60 L532,80 L535,95 L540,100 L540,130 L560,130 L560,150 L600,150 L600,120 L640,120 L640,90 L650,85 L655,75 L660,70 L665,65 L668,55 L670,60 L672,65 L675,70 L680,75 L685,85 L695,90 L695,120 L720,120 L720,150 L760,150 L760,130 L780,130 L780,110 L790,100 L795,95 L800,100 L810,110 L810,130 L840,130 L840,150 L880,150 L880,140 L920,140 L920,115 L930,110 L935,100 L940,110 L950,115 L950,140 L980,140 L980,150 L1020,150 L1020,130 L1060,130 L1060,100 L1065,95 L1070,80 L1072,65 L1075,55 L1078,65 L1080,80 L1085,95 L1090,100 L1090,130 L1120,130 L1120,150 L1160,150 L1160,130 L1200,130 L1200,140 L1240,140 L1240,150 L1280,150 L1280,130 L1320,130 L1320,150 L1440,150 L1440,200 Z"

function Skyline({ position = 'bottom', flip = false, color = 'currentColor', opacity = 0.07 }) {
  const style = {
    position: 'absolute',
    [position]: 0, left: 0, right: 0,
    width: '100%',
    height: '160px',
    opacity,
    transform: flip ? 'scaleY(-1)' : undefined,
    pointerEvents: 'none',
    zIndex: 0,
  }
  return (
    <svg style={style} viewBox="0 0 1440 200" preserveAspectRatio="none" fill={color}>
      <path d={SKYLINE_PATH} />
    </svg>
  )
}

/* ─── HELLO CYCLER ─── */
function HelloCycler() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % HELLOS.length)
        setVisible(true)
      }, 400)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hello-cycler">
      <span className={`hello-word${visible ? ' hello-in' : ' hello-out'}`}>
        {HELLOS[idx]}
      </span>
    </div>
  )
}

/* ─── NAVBAR ─── */
function Navbar() {
  const scrolled = useNavScroll()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const navScrolled = !isHome || scrolled

  const handleLogo = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.location.reload()
    } else {
      navigate('/')
    }
  }

  return (
    <nav className={`navbar${navScrolled ? ' scrolled' : ''}`}>
      <a href="/" className="nav-logo" onClick={handleLogo}>
        <div className="nav-logo-mark">T</div>
        <div>
          <div className="nav-logo-text">Taksim Tercüme</div>
        </div>
      </a>
      <ul className="nav-links">
        <li><NavLink to="/">Anasayfa</NavLink></li>
        <li><NavLink to="/hizmetler">Hizmetler</NavLink></li>
        <li><NavLink to="/neden-biz">Neden Biz</NavLink></li>
        <li><NavLink to="/diller">Diller</NavLink></li>
        <li><NavLink to="/sss">SSS</NavLink></li>
        <li><NavLink to="/iletisim" className="nav-cta">Teklif Al</NavLink></li>
      </ul>
    </nav>
  )
}

/* ─── HERO ─── */

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-pattern" />
      <div className="hero-gradient" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <Skyline position="bottom" color="white" opacity={0.18} />

      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            <em>Köprü</em> Kuruyoruz
            <strong>Dilden Dile,</strong>
            <strong>Kültürden Kültüre.</strong>
          </h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">
            20 yılı aşkın deneyimimizle 80'den fazla dilde profesyonel çeviri ve tercümanlık hizmetleri sunuyoruz. Resmi belgelerden teknik çevirilere, her ihtiyacınızda yanınızdayız.
          </p>
          <div className="hero-actions">
            <Link to="/iletisim" className="btn-primary">
              Teklif Al →
            </Link>
            <Link to="/hizmetler" className="btn-outline">
              Hizmetleri İncele
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <HelloCycler />

          <div className="hero-map-wrap">
            <iframe
              title="Taksim Tercüme Bürosu Konum"
              src="https://www.openstreetmap.org/export/embed.html?bbox=28.974%2C41.032%2C28.996%2C41.044&layer=mapnik&marker=41.0370%2C28.9850"
              className="hero-map"
              loading="lazy"
            />
            <div className="hero-map-overlay">
              <svg className="hero-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="hero-map-label">İstiklal Cad. No:42, Taksim</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES ─── */
function Services() {
  return (
    <section className="services" id="hizmetler">
      <Skyline position="bottom" color="var(--navy)" opacity={0.18} />
      <div className="container">
        <div className="services-header reveal">
          <div className="section-label">Hizmetlerimiz</div>
          <h2 className="section-title">Her İhtiyacınıza Özel<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Çeviri Çözümleri</em></h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className={`service-card reveal reveal-d${(i % 3) + 1}`} key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
              <div className="service-arrow">Detaylı Bilgi →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── WHY US ─── */
function WhyUs() {
  return (
    <section className="why-us" id="neden-biz">
      <div className="why-us-bg" />
      <Skyline position="bottom" color="white" opacity={0.18} />
      <div className="container">
        <div className="why-us-inner">
          <div>
            <div className="reveal">
              <div className="section-label left">Neden Biz</div>
              <h2 className="section-title section-title-light">
                Güven, Hız ve<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Mükemmellik</em>
              </h2>
              <p className="why-intro">
                Taksim Tercüme Bürosu olarak her müşterimizin belgesini kendi belgemiz gibi özenle çeviriyoruz. Uzman kadromuz, ISO standartlarımız ve yılların deneyimiyle fark yaratıyoruz.
              </p>
            </div>
            <div className="why-features">
              {WHY_FEATURES.map((f, i) => (
                <div className={`why-feature reveal reveal-d${i + 1}`} key={f.title}>
                  <div className="why-feature-icon">{f.icon}</div>
                  <div>
                    <div className="why-feature-title">{f.title}</div>
                    <div className="why-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="why-certs">
              {CERTS.map((c, i) => (
                <div className={`why-cert reveal reveal-d${i + 1}`} key={c.title}>
                  <div className="why-cert-top">
                    <span className="why-cert-icon">{c.icon}</span>
                    <span className="why-cert-title">{c.title}</span>
                  </div>
                  <div className="why-cert-text">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── LANGUAGES ─── */
function Languages() {
  return (
    <section className="languages" id="diller">
      <Skyline position="bottom" color="var(--navy)" opacity={0.18} />
      <div className="container">
        <div className="languages-header reveal">
          <div className="section-label">Dil Desteği</div>
          <h2 className="section-title">80+ Dilde <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Profesyonel</em> Çeviri</h2>
        </div>
        <div className="lang-grid">
          {LANGUAGES.map((l, i) => (
            <div className={`lang-card reveal reveal-d${(i % 4) + 1}`} key={l.name}>
              <img
                className="lang-flag"
                src={`https://flagcdn.com/w40/${l.code}.png`}
                alt={l.name}
                onError={(e) => { e.currentTarget.outerHTML = `<span class="lang-flag lang-flag-emoji">${l.flag}</span>` }}
              />
              <div className="lang-name">{l.name}</div>
              <div className="lang-native">{l.native}</div>
            </div>
          ))}
        </div>
        <p className="lang-more reveal">
          ve <span>68 dil daha</span> — Doğu Avrupa, Orta Doğu, Uzak Doğu ve Afrika dilleri dahil.
        </p>
      </div>
    </section>
  )
}

/* ─── PROCESS ─── */
function Process() {
  return (
    <section className="process">
      <Skyline position="top" flip color="var(--navy)" opacity={0.18} />
      <div className="container">
        <div className="process-header reveal">
          <div className="section-label">Nasıl Çalışıyoruz</div>
          <h2 className="section-title">4 Adımda <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Hızlı Çeviri</em></h2>
        </div>
        <div className="process-steps">
          <div className="process-line" />
          {PROCESS_STEPS.map((s, i) => (
            <div className={`process-step reveal reveal-d${i + 1}`} key={s.num}>
              <div className="process-num">{s.num}</div>
              <div className="process-step-title">{s.title}</div>
              <div className="process-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', source: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact" id="iletisim">
      <div className="contact-gradient" />
      <Skyline position="bottom" color="white" opacity={0.18} />
      <div className="container">
        <div className="contact-inner">
          <div>
            <div className="reveal">
              <div className="section-label left">İletişim</div>
              <h2 className="contact-info-title">
                Hemen <em>Teklif Alın,</em><br />
                Güvenle İlerleyin.
              </h2>
              <p className="contact-info-text">
                Belgenizi gönderin, dakikalar içinde fiyat teklifimizi alın. Ayrıca ofisimize bizzat uğrayabilir veya bizi arayabilirsiniz.
              </p>
            </div>
            <div className="contact-details reveal reveal-d1">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Adres', value: 'İstiklal Caddesi No:42, Taksim\nBeyoğlu / İstanbul' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: 'Telefon', value: '+90 (212) 555 01 23' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: 'E-posta', value: 'info@taksimtercume.com' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'Çalışma Saatleri', value: 'Hafta içi 09:00 – 19:00\nCumartesi 10:00 – 16:00' },
              ].map(d => (
                <div className="contact-detail" key={d.label}>
                  <div className="contact-detail-icon">{d.icon}</div>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    <div className="contact-detail-value" style={{ whiteSpace: 'pre-line' }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form reveal reveal-d2">
            {sent ? (
              <div className="form-success">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <div>Talebiniz alındı!</div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.75rem' }}>
                  En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ad Soyad *</label>
                    <input name="name" placeholder="Adınız" value={form.name} onChange={handle} required />
                  </div>
                  <div className="form-group">
                    <label>E-posta *</label>
                    <input name="email" type="email" placeholder="ornek@email.com" value={form.email} onChange={handle} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Telefon</label>
                    <input name="phone" placeholder="+90 5xx xxx xx xx" value={form.phone} onChange={handle} />
                  </div>
                  <div className="form-group">
                    <label>Hizmet Türü *</label>
                    <select name="service" value={form.service} onChange={handle} required>
                      <option value="">Seçiniz...</option>
                      <option>Belge Çevirisi</option>
                      <option>Tercümanlık</option>
                      <option>Noter Onaylı Çeviri</option>
                      <option>Hukuki Çeviri</option>
                      <option>Tıbbi Çeviri</option>
                      <option>Teknik Çeviri</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Kaynak &amp; Hedef Dil</label>
                  <input name="source" placeholder="Örn: Türkçe → İngilizce" value={form.source} onChange={handle} />
                </div>
                <div className="form-group">
                  <label>Notlarınız</label>
                  <textarea name="message" placeholder="Belge hakkında ek bilgi, acele teslimat talebi vb." value={form.message} onChange={handle} />
                </div>
                <button type="submit" className="form-submit">Teklif Talebi Gönder →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="nav-logo-mark" style={{ background: 'var(--gold)' }}>T</div>
              <div className="footer-brand-name">
                <div style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1rem', fontWeight: 600 }}>Taksim Tercüme Bürosu</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--gold-pale)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Est. 2004 · İstanbul</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              İstanbul'un kalbinde, 20 yılı aşkın deneyimle dil bariyerlerini yıkıyoruz. Güvenilir, hızlı ve uzman çeviri hizmetleri.
            </p>
            <div className="footer-socials">
              {['f', 'in', 'tw', 'ig'].map(s => (
                <a href="#" className="footer-social" key={s}>{s}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Hizmetler</div>
            <ul className="footer-links">
              {['Belge Çevirisi', 'Tercümanlık', 'Noter Onaylı', 'Hukuki Çeviri', 'Tıbbi Çeviri', 'Teknik Çeviri'].map(l => (
                <li key={l}><Link to="/hizmetler">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Diller</div>
            <ul className="footer-links">
              {['İngilizce', 'Almanca', 'Fransızca', 'Arapça', 'Rusça', 'İspanyolca'].map(l => (
                <li key={l}><Link to="/diller">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">İletişim</div>
            <ul className="footer-links">
              <li><Link to="/iletisim">İstiklal Cad. No:42, Taksim</Link></li>
              <li><Link to="/iletisim">+90 (212) 555 01 23</Link></li>
              <li><Link to="/iletisim">info@taksimtercume.com</Link></li>
              <li><Link to="/iletisim">Çalışma Saatleri</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2024 <span>Taksim Tercüme Bürosu</span>. Tüm hakları saklıdır.
          </div>
          <div className="footer-bottom-links">
            <a href="#">Gizlilik Politikası</a>
            <a href="#">Kullanım Şartları</a>
            <a href="#">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── FAQ ─── */
const FAQS = [
  {
    q: 'Çeviri süreciniz ne kadar sürer?',
    a: 'Standart bir belge çevirisi genellikle 1–2 iş günü içinde tamamlanır. Uzun sözleşmeler veya teknik dokümanlar için bu süre 3–5 iş gününe uzayabilir. Acil talepler için ek ücret karşılığında aynı gün veya 24 saat içinde teslimat seçeneğimiz mevcuttur. Belgenizi gönderdikten sonra size net bir teslim tarihi bildiriyoruz.'
  },
  {
    q: 'Noter onaylı çeviri ile yeminli çeviri arasındaki fark nedir?',
    a: 'Yeminli çeviri; Türkiye Adalet Bakanlığı\'nca yetkilendirilmiş yeminli mütercimler tarafından yapılan ve resmi makamlarca doğrudan kabul edilen çeviridir. Noter onaylı çeviri ise herhangi bir çevirmenin yaptığı çevirinin noter huzurunda imzalanarak tasdik edilmesidir. Yurt dışı işlemler, mahkemeler ve devlet kurumları genellikle yeminli çeviri talep eder.'
  },
  {
    q: 'Hangi belgeleri çevirebilirsiniz?',
    a: 'Nüfus cüzdanı, pasaport, ehliyet, diploma, transkript, doğum ve evlilik cüzdanı, vefat belgesi, vekaletname, ticaret sicil gazetesi, şirket sözleşmeleri, mahkeme kararları, hukuki dilekçeler, tıbbi raporlar, ilaç prospektüsleri, teknik şartnameler, yazılım arayüzleri ve çok daha fazlasını çeviriyoruz. Aklınızdaki belge türü için bize danışabilirsiniz.'
  },
  {
    q: 'Belgemi nasıl gönderebilirim?',
    a: 'Belgelerinizi info@taksimtercume.com adresine e-posta ile ya da WhatsApp hattımıza fotoğraf veya PDF olarak iletebilirsiniz. Dilerseniz İstiklal Caddesi\'ndeki ofisimize bizzat uğrayabilir, asıl belgeyi teslim edebilirsiniz. Yurt içi ve yurt dışı kargo kabul edilmektedir; noter onaylı çeviriler için orijinal belgenin fiziksel olarak teslimi gerekebilir.'
  },
  {
    q: 'Fiyatlandırma nasıl yapılıyor?',
    a: 'Ücretlerimiz; dil çifti, belge türü, sayfa veya kelime sayısı ve teslimat süresine göre belirlenir. Nadir dil çiftleri veya yüksek uzmanlık gerektiren alanlarda (hukuk, tıp, teknik) fiyatlandırma farklılık gösterebilir. Belgenizi bizimle paylaşır paylaşmaz 15–30 dakika içinde ücretsiz fiyat teklifini e-posta ile iletiyoruz.'
  },
  {
    q: 'ISO 17100 sertifikası ne anlama geliyor?',
    a: 'ISO 17100, profesyonel çeviri hizmetleri için uluslararası alanda kabul görmüş kalite yönetim standardıdır. Bu sertifika; çevirmenlerimizin eğitim ve deneyim şartlarını karşıladığını, her çevirinin çeviri + editör aşamalarından geçtiğini ve hizmet sürecimizin uluslararası kalite kriterlerine uygun olduğunu belgeler.'
  },
  {
    q: 'Belgelerimin gizliliği güvende mi?',
    a: 'Müşteri belgelerinin gizliliği bizim için önceliklidir. Tüm çalışanlarımız ve dış kaynaklı çevirmenlerimiz gizlilik sözleşmesi (NDA) imzalar. Belgeleriniz yalnızca ilgili çeviri ekibiyle paylaşılır, üçüncü taraflara kesinlikle verilmez. İşlem tamamlandıktan sonra dijital kopyalar güvenli protokollerle silinir.'
  },
  {
    q: 'Tercümanlık hizmeti için önceden randevu gerekiyor mu?',
    a: 'Evet, kaliteli hizmet sunabilmek için tercümanlık rezervasyonlarını en az 48 saat öncesinden almamız gerekmektedir. Mahkeme ve savcılık duruşmaları, noter işlemleri, iş toplantıları ve konferanslar için uygun tercümanı önceden tahsis edebilmek adına mümkün olduğunca erken rezervasyon yaptırmanızı öneririz.'
  },
]

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq-section">
      <Skyline position="bottom" color="var(--navy)" opacity={0.18} />
      <div className="container">
        <div className="faq-header reveal">
          <div className="section-label">SSS</div>
          <h2 className="section-title">Sıkça Sorulan <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Sorular</em></h2>
          <p className="faq-subtitle">Aklınızdaki soruların cevaplarını burada bulabilirsiniz.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className={`faq-item${open === i ? ' faq-open' : ''}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PAGES ─── */
function PageWrapper({ children }) {
  useReveal()
  return <>{children}</>
}

function HomePage()      { return <PageWrapper><Hero /><Process /></PageWrapper> }
function ServicesPage()  { return <PageWrapper><Services /></PageWrapper> }
function WhyUsPage()     { return <PageWrapper><WhyUs /></PageWrapper> }
function DillerPage()    { return <PageWrapper><Languages /></PageWrapper> }
function ContactPage()   { return <PageWrapper><Contact /></PageWrapper> }
function FAQPage()       { return <PageWrapper><FAQ /></PageWrapper> }

/* ─── APP ─── */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/hizmetler"     element={<ServicesPage />} />
        <Route path="/neden-biz"     element={<WhyUsPage />} />
        <Route path="/diller"        element={<DillerPage />} />
        <Route path="/iletisim"      element={<ContactPage />} />
        <Route path="/sss"           element={<FAQPage />} />
      </Routes>
      <Footer />
    </>
  )
}
