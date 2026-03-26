import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { profile, mainProjects, sideProjects, type Project } from './data'
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
      const t = setTimeout(() => { setDeleting(false); setIdx((idx+1)%texts.length) }, 0)
      return () => clearTimeout(t)
    }
  }, [displayed, deleting, idx, texts])
  return <span>{displayed}<span className="cursor-blink text-accent">|</span></span>
}

// ─── Section Wrapper ─────────────────────────────────────────────────
function Section({ id, children, className='' }: { id:string; children:React.ReactNode; className?:string }) {
  const { ref, visible } = useScrollAnimation()
  return (
    <section id={id} ref={ref} className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}>
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

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const nav = document.querySelector('nav')
  const navOffset = nav instanceof HTMLElement ? nav.getBoundingClientRect().height + 12 : 12
  const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - navOffset)
  window.scrollTo({ top, behavior: 'smooth' })
  const url = new URL(window.location.href)
  url.hash = sectionId
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}


// ─── Scroll Progress Bar ──────────────────────────────────────────────
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fn = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(0,245,212,0.7)' }}
      />
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { id:'main-project', label:'Main Project' },
    { id:'side-project', label:'Side Project' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? 'bg-bg/90 backdrop-blur-md border-b border-accent/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-accent text-base md:text-lg text-glow">Donggyeong's Portfolio</a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.id} type="button" onClick={() => scrollToSection(l.id)}
               className="font-mono text-sm text-text-secondary hover:text-accent transition-colors duration-200">
              {l.label}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden text-accent text-xl leading-none px-1" onClick={() => setMenuOpen(o => !o)} aria-label="메뉴">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-t border-accent/10 px-6 py-5 flex flex-col gap-5">
          {links.map(l => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setMenuOpen(false)
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => scrollToSection(l.id))
                })
              }}
               className="font-mono text-sm text-text-secondary hover:text-accent transition-colors duration-200">
              {l.label}
            </button>
          ))}
        </div>
      )}
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
        <div className="inline-flex items-center gap-2 mb-8 md:mb-16 clip-corner-sm border border-accent/30 bg-accent/5 px-3 py-1.5 md:px-4 md:py-2">
          <span className="font-mono text-accent text-xs md:text-sm">Backend Engineer | MSA • Platform Systems</span>
        </div>

        {/* Name */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold mb-6 md:mb-10 leading-none tracking-widest">
          <span className="text-text-primary">{profile.name}</span>
        </h1>

        {/* Typing */}
        <div className="font-mono text-base sm:text-xl md:text-2xl text-accent mb-12 md:mb-20 min-h-[3rem] md:min-h-[2rem]">
          <TypingText texts={['MSA 기반 플랫폼 시스템을 End-to-End로 개발하는 백엔드 엔지니어입니다.', '서비스 분리 설계부터 API 구현, 배포 자동화까지 전 과정을 수행합니다.', '확장 가능하고 안정적인 시스템 아키텍처 설계를 지향합니다.']} />
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={() => scrollToSection('main-project')} className="clip-corner bg-accent text-bg font-display font-bold px-8 py-4 text-sm hover:shadow-glow-accent transition-all duration-300 hover:scale-105">
            프로젝트 보기
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────
function Projects() {
  const allProjects = [...mainProjects, ...sideProjects]
  const [openedProjectId, setOpenedProjectId] = useState<string | null>(null)
  const [openedGallery, setOpenedGallery] = useState<{ images: string[]; index: number; title: string } | null>(null)
  const closeButtonClass = 'inline-flex items-center justify-center clip-corner bg-accent text-bg font-display font-bold px-3 py-2 text-[11px] md:text-xs tracking-wide leading-none border border-white/20 shadow-[0_0_16px_rgba(0,245,212,0.38)] hover:brightness-110 transition-all duration-200'
  const galleryNavButtonClass = 'clip-corner bg-accent text-bg font-display font-bold px-2.5 py-1 text-[9px] md:text-[10px] tracking-wide border border-white/20 shadow-[0_0_10px_rgba(0,245,212,0.3)] hover:brightness-110 transition-all duration-200'
  const toList = (value: string | string[]) => (Array.isArray(value) ? value : [value])
  const renderTextWithLinks = (text: string) => {
    const nodes: React.ReactNode[] = []
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
    let lastIndex = 0
    let match: RegExpExecArray | null = null

    while ((match = markdownLinkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const segment = text.slice(lastIndex, match.index)
        nodes.push(...segment.split(/(https?:\/\/[^\s]+)/g).map((part, idx) => {
          if (/^https?:\/\/[^\s]+$/.test(part)) {
            return (
              <a key={`url-${match?.index}-${idx}`} href={part} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                링크
              </a>
            )
          }
          return <span key={`txt-${match?.index}-${idx}`}>{part}</span>
        }))
      }

      const label = match[1]
      const href = match[2]
      nodes.push(
        <a key={`md-${match.index}`} href={href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
          {label}
        </a>
      )

      lastIndex = markdownLinkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      const tail = text.slice(lastIndex)
      nodes.push(...tail.split(/(https?:\/\/[^\s]+)/g).map((part, idx) => {
        if (/^https?:\/\/[^\s]+$/.test(part)) {
          return (
            <a key={`tail-url-${idx}`} href={part} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              링크
            </a>
          )
        }
        return <span key={`tail-txt-${idx}`}>{part}</span>
      }))
    }

    return nodes
  }

  const syncFromUrl = useCallback(() => {
    const id = new URLSearchParams(window.location.search).get('project')
    if (id && allProjects.some((p) => p.id === id)) {
      setOpenedProjectId(id)
      return
    }
    setOpenedProjectId(null)
  }, [allProjects])

  useEffect(() => {
    syncFromUrl()
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [syncFromUrl])

  useEffect(() => {
    const body = document.body
    if (openedProjectId || openedGallery) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }
    return () => {
      body.style.overflow = ''
    }
  }, [openedProjectId, openedGallery])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openedGallery) {
        setOpenedGallery(null)
        return
      }
      if (e.key === 'ArrowLeft' && openedGallery && openedGallery.images.length > 1) {
        setOpenedGallery({
          ...openedGallery,
          index: (openedGallery.index - 1 + openedGallery.images.length) % openedGallery.images.length,
        })
        return
      }
      if (e.key === 'ArrowRight' && openedGallery && openedGallery.images.length > 1) {
        setOpenedGallery({
          ...openedGallery,
          index: (openedGallery.index + 1) % openedGallery.images.length,
        })
        return
      }
      if (e.key === 'Escape' && openedProjectId) {
        closeModal()
      }
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [openedProjectId, openedGallery])

  const setProjectInUrl = (id: string | null) => {
    const url = new URL(window.location.href)
    if (id) {
      url.searchParams.set('project', id)
    } else {
      url.searchParams.delete('project')
    }
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }

  const openModal = (id: string) => {
    setOpenedProjectId(id)
    setProjectInUrl(id)
  }

  const closeModal = () => {
    setOpenedProjectId(null)
    setProjectInUrl(null)
  }

  const openedProject = allProjects.find((p) => p.id === openedProjectId) ?? null
  const openedGalleryImage = openedGallery ? openedGallery.images[openedGallery.index] : null

  const ProjectSection = ({ id, n, title, projects }: { id: string; n: string; title: string; projects: Project[] }) => (
    <div id={id} className="mb-20 last:mb-0 scroll-mt-24 md:scroll-mt-28">
      <SectionLabel n={n} label={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => openModal(p.id)}
            className="relative clip-corner border border-surface-2 bg-surface p-5 md:p-8 text-left hover:border-accent/40 transition-colors cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: accentMap[p.color], opacity: 0.3 }} />
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block font-mono text-xs px-2 py-0.5 rounded-sm"
                  style={{ color: accentMap[p.color], backgroundColor: accentMap[p.color] + '15', border: `1px solid ${accentMap[p.color]}30` }}
                >
                  {p.org}
                </span>
                <span className="font-mono text-xs text-muted">{p.period}</span>
              </div>
              <p className="font-display font-bold text-text-primary leading-snug text-base">{p.name}</p>
            </div>
            <ul className="mb-6 space-y-1.5">
              {toList(p.summary).map((line, idx) => (
                <li key={`${p.id}-summary-${idx}`} className="text-sm leading-relaxed text-text-secondary">
                  • {line}
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs text-accent mb-2">주요 화면</p>
            <div className="clip-corner-sm border border-surface-2 bg-surface/70 p-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenedGallery({
                    images: p.galleryImages && p.galleryImages.length > 0 ? p.galleryImages : [p.previewImage],
                    index: 0,
                    title: p.name,
                  })
                }}
                className="block w-full"
              >
                <img
                  src={p.previewImage}
                  alt={`${p.name} 주요 화면`}
                  className="w-full h-52 rounded-sm object-cover object-top hover:opacity-90 transition-opacity"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ProjectSection id="main-project" n="01" title="메인 프로젝트" projects={mainProjects} />
        <ProjectSection id="side-project" n="02" title="사이드 프로젝트" projects={sideProjects} />

        {openedProject && createPortal(
          <div className="fixed inset-0 z-[100]">
            <button type="button" aria-label="모달 닫기 배경" className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" onClick={closeModal} />
            <div className="relative z-10 h-full w-full overflow-y-auto">
              <div className="min-h-full grid place-items-center p-4">
                <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto clip-corner border border-accent/30 bg-bg p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h4 className="font-display font-bold text-xl text-text-primary mb-1">{openedProject.name}</h4>
                      <p className="font-mono text-xs text-text-secondary">{openedProject.period}</p>
                    </div>
                    <button type="button" onClick={closeModal} className={closeButtonClass}>
                      CLOSE
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="inline-block mb-2 font-mono text-xs px-2 py-0.5 rounded-sm border border-accent/30 bg-accent/10 text-accent">
                        {openedProject.kind === 'main' ? '과제 설명' : '제작 의도'}
                      </p>
                      <ul className="space-y-2">
                        {toList(openedProject.detail).map((line, idx) => (
                          <li key={`${openedProject.id}-detail-${idx}`} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                            <span className="text-accent mt-0.5">•</span>
                            <span>{renderTextWithLinks(line)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="inline-block mb-2 font-mono text-xs px-2 py-0.5 rounded-sm border border-accent/30 bg-accent/10 text-accent">
                        {openedProject.kind === 'main' ? '담당 부분' : '구현 사항'}
                      </p>
                      <ul className="space-y-2">
                        {toList(openedProject.contributions).map((line, idx) => (
                          <li key={`${openedProject.id}-contrib-${idx}`} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                            <span className="text-accent mt-0.5">•</span>
                            <span>{renderTextWithLinks(line)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="inline-block mb-3 font-mono text-xs px-2 py-0.5 rounded-sm border border-accent/30 bg-accent/10 text-accent">적용 기술</p>
                      <div className="flex flex-wrap gap-2">
                        {openedProject.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2.5 py-1 border clip-corner-sm text-text-primary/90"
                            style={{
                              borderColor: accentMap[openedProject.color] + '45',
                              backgroundColor: accentMap[openedProject.color] + '12',
                              boxShadow: `inset 0 0 0 1px ${accentMap[openedProject.color]}18`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {openedProject.kind === 'main' ? (
                      <div>
                        <p className="inline-block mb-3 font-mono text-xs px-2 py-0.5 rounded-sm border border-accent/30 bg-accent/10 text-accent">참고 도식</p>
                        <img src={openedProject.architectureImage} alt={`${openedProject.name} architecture`} className="w-full h-[360px] rounded-md border border-surface-2 bg-surface object-contain" />
                      </div>
                    ) : (
                      <div>
                        <p className="inline-block mb-3 font-mono text-xs px-2 py-0.5 rounded-sm border border-accent/30 bg-accent/10 text-accent">
                          {openedProject.demoUrl ? '포트폴리오 접속' : '시연 영상'}
                        </p>
                        {openedProject.demoUrl ? (
                          <a
                            href={openedProject.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block font-mono text-sm text-accent hover:underline leading-tight"
                          >
                            portfolio_ver1.html
                          </a>
                        ) : openedProject.video ? (
                          <video controls className="w-full h-[360px] rounded-md border border-surface-2 bg-surface object-contain">
                            <source src={openedProject.video} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="w-full h-[360px] rounded-md border border-surface-2 bg-surface flex items-center justify-center text-sm text-text-secondary">
                            시연 영상이 없습니다.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {openedGallery && openedGalleryImage && createPortal(
          <div className="fixed inset-0 z-[110]">
            <button
              type="button"
              aria-label="이미지 닫기 배경"
              className="absolute inset-0 bg-black/85"
              onClick={() => setOpenedGallery(null)}
            />
            <div className="relative z-10 h-full w-full p-4 md:p-8 grid place-items-center">
              <button
                type="button"
                onClick={() => setOpenedGallery(null)}
                className={`absolute top-4 right-4 md:top-8 md:right-8 z-20 ${closeButtonClass}`}
              >
                CLOSE
              </button>
              {openedGallery.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenedGallery({
                        ...openedGallery,
                        index: (openedGallery.index - 1 + openedGallery.images.length) % openedGallery.images.length,
                      })
                    }
                    className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 ${galleryNavButtonClass}`}
                  >
                    PREV
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenedGallery({
                        ...openedGallery,
                        index: (openedGallery.index + 1) % openedGallery.images.length,
                      })
                    }
                    className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 ${galleryNavButtonClass}`}
                  >
                    NEXT
                  </button>
                </>
              )}
              <img
                src={openedGalleryImage}
                alt={`${openedGallery.title} 확대 이미지`}
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-md border border-surface-2 bg-surface"
              />
              {openedGallery.images.length > 1 && (
                <p className="absolute bottom-4 md:bottom-8 font-mono text-xs text-text-secondary">
                  {openedGallery.index + 1} / {openedGallery.images.length}
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
    </Section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-surface-2 text-center">
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
        <ScrollProgressBar />
        <Navbar />
        <Hero />
        <Projects />

        <Footer />
      </div>
    </div>
  )
}
