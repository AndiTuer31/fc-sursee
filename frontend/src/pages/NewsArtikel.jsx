import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

// PortableText mit Marks, Listen und Links
function renderSpan(child, i, markDefs) {
  var marks = child.marks || []
  var el = child.text

  var linkKey = marks.find(function(m) {
    return !['strong', 'em', 'underline', 'code'].includes(m)
  })
  if (linkKey) {
    var def = (markDefs || []).find(function(d) { return d._key === linkKey })
    if (def && def.href) {
      var isExternal = def.href.startsWith('http')
      el = (
        <a
          key={'a-' + i}
          href={def.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-fc-rot underline hover:opacity-70 transition-opacity"
        >
          {el}
        </a>
      )
    }
  }

  if (marks.includes('strong'))    el = <strong key={'s-' + i}>{el}</strong>
  if (marks.includes('em'))        el = <em key={'e-' + i}>{el}</em>
  if (marks.includes('underline')) el = <u key={'u-' + i}>{el}</u>
  if (marks.includes('code'))      el = <code key={'c-' + i} className="bg-gray-100 px-1 rounded text-sm font-mono">{el}</code>

  return <span key={i}>{el}</span>
}

function PortableText({ blocks }) {
  if (!blocks || blocks.length === 0) return null
  var nodes = []
  var i = 0

  while (i < blocks.length) {
    var block = blocks[i]

    if (block._type !== 'block') { i++; continue }

    var markDefs = block.markDefs || []
    var children = (block.children || []).map(function(c, ci) {
      return renderSpan(c, ci, markDefs)
    })

    // Listen gruppieren
    if (block.listItem) {
      var listType = block.listItem
      var items = []
      while (i < blocks.length && blocks[i]._type === 'block' && blocks[i].listItem === listType) {
        var b = blocks[i]
        var mDefs = b.markDefs || []
        var ch = (b.children || []).map(function(c, ci) { return renderSpan(c, ci, mDefs) })
        items.push(<li key={i} className="leading-relaxed">{ch}</li>)
        i++
      }
      var Tag = listType === 'number' ? 'ol' : 'ul'
      var cls = listType === 'number'
        ? 'list-decimal list-outside pl-5 mb-4 space-y-1 text-fc-text'
        : 'list-disc list-outside pl-5 mb-4 space-y-1 text-fc-text'
      nodes.push(<Tag key={'list-' + i} className={cls}>{items}</Tag>)
      continue
    }

    switch (block.style) {
      case 'h2':
        nodes.push(<h2 key={i} className="text-2xl font-black mt-8 mb-3 text-fc-dunkel">{children}</h2>)
        break
      case 'h3':
        nodes.push(<h3 key={i} className="text-xl font-bold mt-6 mb-2 text-fc-dunkel">{children}</h3>)
        break
      case 'blockquote':
        nodes.push(<blockquote key={i} className="border-l-4 border-fc-rot pl-4 my-4 text-fc-text italic">{children}</blockquote>)
        break
      default:
        nodes.push(<p key={i} className="mb-4 leading-relaxed text-fc-text">{children}</p>)
    }
    i++
  }

  return <div className="text-fc-dunkel">{nodes}</div>
}

// Bildergalerie + Lightbox
function Bildergalerie({ bilder }) {
  var [aktiv, setAktiv] = useState(null)

  var schliessenLightbox = useCallback(function() { setAktiv(null) }, [])

  useEffect(function() {
    function onKey(e) {
      if (aktiv === null) return
      if (e.key === 'Escape')     schliessenLightbox()
      if (e.key === 'ArrowRight') setAktiv(function(v) { return Math.min(v + 1, bilder.length - 1) })
      if (e.key === 'ArrowLeft')  setAktiv(function(v) { return Math.max(v - 1, 0) })
    }
    window.addEventListener('keydown', onKey)
    return function() { window.removeEventListener('keydown', onKey) }
  }, [aktiv, bilder.length, schliessenLightbox])

  if (!bilder || bilder.length === 0) return null

  var thumbUrls = bilder.map(function(b) { return imageUrl(b, 400) })
  var vollUrls  = bilder.map(function(b) { return imageUrl(b, 1400) })
  var sichtbar  = thumbUrls.slice(0, 3)
  var mehr      = bilder.length - 3

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-1 h-5 bg-fc-rot rounded-full block" />
        <h3 className="text-lg font-black text-fc-dunkel">Bildergalerie</h3>
        <span className="text-fc-text text-sm">({bilder.length} Bilder)</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sichtbar.map(function(url, idx) {
          return (
            <button
              key={idx}
              onClick={function() { setAktiv(idx) }}
              className="relative overflow-hidden rounded-lg aspect-video group focus:outline-none"
            >
              {url && (
                <img
                  src={url}
                  alt={'Bild ' + (idx + 1)}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              )}
              {idx === 2 && mehr > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                  <span className="text-white font-black text-2xl">+{mehr}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
            </button>
          )
        })}
      </div>

      {aktiv !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={schliessenLightbox}
        >
          <img
            src={vollUrls[aktiv]}
            alt={'Bild ' + (aktiv + 1)}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded shadow-2xl"
            onClick={function(e) { e.stopPropagation() }}
          />

          {aktiv > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              onClick={function(e) { e.stopPropagation(); setAktiv(function(v) { return v - 1 }) }}
              aria-label="Vorheriges Bild"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {aktiv < bilder.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              onClick={function(e) { e.stopPropagation(); setAktiv(function(v) { return v + 1 }) }}
              aria-label="Naechstes Bild"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            onClick={schliessenLightbox}
            aria-label="Schliessen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
            {aktiv + 1} / {bilder.length}
          </div>

          {bilder.length > 1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
              {thumbUrls.map(function(url, idx) {
                return (
                  <button
                    key={idx}
                    onClick={function(e) { e.stopPropagation(); setAktiv(idx) }}
                    className={'shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-colors ' + (aktiv === idx ? 'border-fc-rot' : 'border-transparent opacity-60 hover:opacity-100')}
                  >
                    {url && <img src={url} alt="" className="w-full h-full object-cover" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const QUERY = `*[_type == "news" && slug.current == $slug][0] {
  _id, titel, datum, kategorie, gepinnt,
  bild,
  zusammenfassung,
  inhalt,
  autor,
  bilder
}`

export default function NewsArtikel() {
  var { slug } = useParams()
  var [artikel, setArtikel] = useState(null)
  var [laden, setLaden]     = useState(true)

  usePageTitle(
    artikel ? artikel.titel : 'News',
    artikel && artikel.zusammenfassung ? artikel.zusammenfassung : 'Neuigkeiten vom FC Sursee.'
  )

  useEffect(function() {
    client.fetch(QUERY, { slug: slug })
      .then(function(data) { setArtikel(data); setLaden(false) })
      .catch(function() { setLaden(false) })
  }, [slug])

  if (laden) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-fc-grau flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-fc-rot border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  if (!artikel) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-black text-fc-rot mb-4">404</p>
            <p className="text-fc-dunkel font-bold text-xl mb-6">Artikel nicht gefunden</p>
            <Link to="/news" className="bg-fc-rot text-white px-5 py-2.5 rounded font-semibold">
              Zurueck zur News-Uebersicht
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  var bild = imageUrl(artikel.bild)

  return (
    <>
      <Navbar />

      <div className="relative h-72 md:h-[420px] overflow-hidden">
        {bild ? (
          <img src={bild} alt={artikel.titel} loading="eager" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-fc-dunkel" />
        )}
        <div className="absolute inset-0 bg-fc-dunkel/55" />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-3xl mx-auto px-6 pb-8">
            <div className="flex items-center gap-2 mb-3">
              {artikel.gepinnt && (
                <span className="inline-flex items-center gap-1 bg-fc-rot text-white text-xs font-bold px-2.5 py-1 rounded">
                  Gepinnt
                </span>
              )}
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded">
                {artikel.kategorie}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {artikel.titel}
            </h1>
            <p className="text-gray-300 text-sm mt-2">
              {artikel.datum}{artikel.autor ? ' - ' + artikel.autor : ''}
            </p>
          </div>
        </div>
      </div>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            {artikel.zusammenfassung && (
              <p className="text-lg text-fc-dunkel font-medium leading-relaxed mb-6 pb-6 border-b border-gray-100">
                {artikel.zusammenfassung}
              </p>
            )}
            <PortableText blocks={artikel.inhalt} />
            <Bildergalerie bilder={artikel.bilder || []} />
          </div>

          <Link to="/news" className="inline-block mt-8 text-fc-rot font-semibold hover:underline text-sm">
            Zurueck zur News-Uebersicht
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
