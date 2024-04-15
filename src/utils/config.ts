// api and base_path both don't endsWith /

export let base_path = ""
export const setBasePath = (path: string) => {
  base_path = path
  if (!base_path.startsWith("/")) {
    base_path = "/" + base_path
  }
  if (base_path.endsWith("/")) {
    base_path = base_path.slice(0, -1)
  }
}
if (window.ALIST.base_path) {
  setBasePath(window.ALIST.base_path)
}

export let api = ""

async function testApiSpeed(urls: string[]): Promise<string> {
  const startTime = new Date().getTime()
  const promises = urls.map((url) =>
    fetch(url + "/api/public/settings", { method: "OPTIONS" }),
  )
  try {
    await Promise.all(promises)
  } catch (error) {
    console.error("Error testing API speed:", error)
  }

  const endTime = new Date().getTime()
  const responseTimes = urls.map((_, index) => endTime - startTime)
  const fastestIndex = responseTimes.indexOf(Math.min(...responseTimes))

  return urls[fastestIndex]
}

async function initializeApi() {
  let configuredApi = import.meta.env.VITE_API_URL as string
  if (window.ALIST.api) {
    configuredApi = window.ALIST.api
  }
  if (configuredApi === "/") {
    configuredApi = location.origin + base_path
  }
  if (configuredApi.endsWith("/")) {
    configuredApi = configuredApi.slice(0, -1)
  }

  const internalApi = "https://base.319.ccsn.dev"
  const publicApi = "https://base.ccsn.dev"
  const apiUrls = [...new Set([internalApi, publicApi, configuredApi])]

  try {
    api = await testApiSpeed(apiUrls)
    console.log("Fastest API:", api)
  } catch (error) {
    console.error("Error selecting fastest API:", error)
    api = configuredApi
  }
}

initializeApi()

export const monaco_cdn =
  window.ALIST.monaco_cdn ||
  "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs"
