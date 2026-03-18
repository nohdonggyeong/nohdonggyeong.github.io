import { useEffect, useRef, useState, useCallback } from 'react'
import { profile, careers, projects } from './data'
import { useScrollAnimation } from './hooks/useScrollAnimation'

// ─── Particle Canvas ────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let W = window.innerWidth, H = window.innerHeight
    canvas.width = W; canvas.height = H
    const particles: { x:number;y:number;vx:number;vy:number;r:number;a:number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
        r: Math.random()*1.5+0.5, a: Math.random() })
    }
    let raf: number
    function draw() {
      ctx.clearRect(0,0,W,H)
      particles.forEach((p,i) => {
        p.x += p.vx; p.y += p.vy
        if(p.x<0)p.x=W; if(p.x>W)p.x=0
        if(p.y<0)p.y=H; if(p.y>H)p.y=0
        ctx.beginPath()
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(0,245,212,${p.a*0.5})`
        ctx.fill()
        particles.slice(i+1).forEach(p2 => {
          const d = Math.hypot(p.x-p2.x,p.y-p2.y)
          if(d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x,p.y); ctx.lineTo(p2.x,p2.y)
            ctx.strokeStyle = `rgba(0,245,212,${(1-d/120)*0.08})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { W=window.innerWidth; H=window.innerHeight; canvas.width=W; canvas.height=H }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',onResize) }
  }, [])
  return <canvas ref={canvasRef} id="particle-canvas" />
}

// ─── Typing Text ─────────────────────────────────────────────────────
function TypingText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const target = texts[idx]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length+1)), 80)
      return () => clearTimeout(t)
    } else if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0,-1)), 40)
      return () => clearTimeout(t)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false); setIdx((idx+1)%texts.length)
    }
  }, [displayed, deleting, idx, texts])
  return <span>{displayed}<span className="cursor-blink text-accent">|</span></span>
}

// ─── Section Wrapper ─────────────────────────────────────────────────
function Section({ id, children, className='' }: { id:string; children:React.ReactNode; className?:string }) {
  const { ref, visible } = useScrollAnimation()
  return (
    <section id={id} ref={ref} className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </section>
  )
}

// ─── Section Label ────────────────────────────────────────────────────
function SectionLabel({ n, label }: { n:string; label:string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-accent text-sm">{n}</span>
      <h2 className="font-display text-3xl font-bold text-text-primary tracking-tight">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
    </div>
  )
}


const accentMap: Record<string, string> = {
  accent: '#00f5d4', purple: '#a855f7', red: '#f87171',
  amber: '#f59e0b', blue: '#60a5fa', green: '#4ade80',
}


// ─── Navbar ───────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { href:'#career', label:'경력사항' },
    { href:'#projects', label:'프로젝트' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-accent/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-accent text-lg text-glow">Donggyeong's Portfolio</a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
               className="font-mono text-sm text-text-secondary hover:text-accent transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noreferrer"
             className="clip-corner-sm bg-accent/10 border border-accent/30 text-accent font-mono text-xs px-4 py-2 hover:bg-accent/20 transition-all duration-200">
            LinkedIn →
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid" onMouseMove={onMouseMove}>
      {/* Radial glow following mouse */}
      <div className="pointer-events-none fixed inset-0 z-0 transition-all duration-200"
           style={{ background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0,245,212,0.06) 0%, transparent 70%)` }} />
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-16 clip-corner-sm border border-accent/30 bg-accent/5 px-4 py-2">
          <span className="font-mono text-accent text-sm">Backend Engineer | MSA • Platform Systems</span>
        </div>

        {/* Name */}
        <h1 className="font-display text-7xl md:text-8xl font-extrabold mb-10 leading-none tracking-tighter">
          <span className="text-text-primary">{profile.name}</span>
        </h1>

        {/* Typing */}
        <div className="font-mono text-xl md:text-2xl text-accent mb-20 h-8">
          <TypingText texts={['MSA 기반 플랫폼 시스템을 E2E로 개발하는 백엔드 개발자', '서비스 분리 설계부터 API 개발, 배포 파이프라인 구축까지 전 과정 수행 가능', '확장성과 안정성을 고려한 시스템 아키텍처 설계에 강점 보유']} />
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#career" className="clip-corner bg-accent text-bg font-display font-bold px-8 py-4 text-sm hover:shadow-glow-accent transition-all duration-300 hover:scale-105">
            바로 보기
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Career ───────────────────────────────────────────────────────────
function Career() {
  return (
    <Section id="career" className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <SectionLabel n="01" label="경력사항" />
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />
          <div className="space-y-12 pl-12">
            {careers.map((c, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[2.25rem] top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-bg"
                     style={{ boxShadow: c.current ? '0 0 12px rgba(0,245,212,0.8)' : 'none' }} />
                <div className={`clip-corner border ${c.current ? 'border-accent/40 bg-accent/5' : 'border-surface-2 bg-surface'} p-8`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display font-bold text-xl text-text-primary">{c.company}</h3>
                        {c.current && <span className="font-mono text-xs bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 clip-corner-sm">재직중</span>}
                      </div>
                      <p className="font-mono text-sm text-accent mb-2">{c.role}</p>
                      {c.dept && <p className="text-xs text-text-secondary">{c.dept}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-text-secondary">{c.period}</p>
                      <p className="font-mono text-xs text-muted mt-2">{c.duration}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {c.desc.split('.').map(s => s.trim()).filter(s => s.length > 0).map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-text-secondary text-sm leading-relaxed">
                        <span className="text-accent mt-0.5 shrink-0">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────
function Projects() {
  const highlighted = projects.filter(p => p.highlight)
  const rest = projects.filter(p => !p.highlight)

  const ProjectCard = ({ p, large=false }: { p: typeof projects[0]; large?: boolean }) => {
    const bullets = p.desc.split('.').map(s => s.trim()).filter(s => s.length > 0)
    return (
      <div className={`relative clip-corner border ${p.org === '에스코어' ? 'border-accent/40 bg-accent/5' : 'border-surface-2 bg-surface'} ${large ? 'p-10' : 'p-8'}`}>
        {/* corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
             style={{ borderColor: accentMap[p.color], opacity: 0.3 }} />
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block font-mono text-xs px-2 py-0.5 rounded-sm"
                  style={{ color: accentMap[p.color], backgroundColor: accentMap[p.color]+'15', border: `1px solid ${accentMap[p.color]}30` }}>
              {p.org}
            </span>
            <span className="font-mono text-xs text-muted">{p.period}</span>
          </div>
          <h3 className={`font-display font-bold text-text-primary leading-snug ${large ? 'text-xl' : 'text-base'}`}>{p.name}</h3>
        </div>
        <ul className="space-y-2.5 mb-6">
          {bullets.map((b, j) => (
            <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span style={{ color: accentMap[p.color] }} className="mt-[3px] shrink-0 text-xs">•</span>
              <span className="text-text-secondary">{b}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(t => (
            <span key={t} className="font-mono text-xs px-2 py-0.5 border clip-corner-sm"
                  style={{ color: accentMap[p.color], borderColor: accentMap[p.color]+'30', backgroundColor: accentMap[p.color]+'08' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel n="02" label="프로젝트" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {highlighted.map((p, i) => <ProjectCard key={i} p={p} large />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      </div>
    </Section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-surface-2 text-center">
      <p className="font-mono text-sm text-text-secondary mb-2">
        보다 자세한 정보는{' '}
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">LinkedIn 프로필</a>
        에서 확인하실 수 있습니다.
      </p>
      <p className="font-mono text-xs text-muted/50 mt-4">© 2026. Donggyeong Noh. All rights reserved.</p>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary">
      <ParticleCanvas />
      <div className="scanline" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Career />
        <Projects />

        <Footer />
      </div>
    </div>
  )
}
