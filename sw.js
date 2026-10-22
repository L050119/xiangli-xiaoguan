const CACHE_NAME = 'xiangli-pwa-v1'
const CORE_FILES = [
  './',
  './manifest.webmanifest',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './images/noodles.jpg',
  './images/braised-meat.jpg',
  './images/seafood.jpg',
  './images/soup.jpg',
  './images/grill.jpg',
  './images/salad.jpg',
  './images/dessert.jpg',
  './images/tea.jpg',
]

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    const pageUrl = new URL('./', self.registration.scope)
    const pageResponse = await fetch(pageUrl)
    await cache.put(pageUrl, pageResponse.clone())

    const html = await pageResponse.text()
    const builtAssets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)]
      .map((match) => new URL(match[1], pageUrl).href)
    await cache.addAll([...CORE_FILES.map((path) => new URL(path, self.registration.scope).href), ...builtAssets])
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.filter((name) => name.startsWith('xiangli-pwa-') && name !== CACHE_NAME).map((name) => caches.delete(name)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cachedPage = await caches.match(new URL('./', self.registration.scope))
      if (cachedPage) {
        fetch(request).then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME)
            await cache.put(new URL('./', self.registration.scope), response)
          }
        }).catch(() => {})
        return cachedPage
      }
      try {
        const response = await fetch(request)
        const cache = await caches.open(CACHE_NAME)
        await cache.put(new URL('./', self.registration.scope), response.clone())
        return response
      } catch {
        return (await caches.match(new URL('./', self.registration.scope))) || Response.error()
      }
    })())
    return
  }

  event.respondWith((async () => {
    const cached = await caches.match(request)
    if (cached) return cached
    const cache = await caches.open(CACHE_NAME)
    const requestedPath = new URL(request.url).pathname
    const key = (await cache.keys()).find((candidate) => new URL(candidate.url).pathname === requestedPath)
    if (key) return cache.match(key)
    try {
      const response = await fetch(request)
      if (response.ok) await cache.put(request, response.clone())
      return response
    } catch {
      return Response.error()
    }
  })())
})
