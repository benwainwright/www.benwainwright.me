import useSWR from "swr"
import { useConfig } from "../use-config/use-config"
import { useLocalStorage } from "../use-localstorage/use-localstorage"
import { TOKEN_KEY } from "../../constants"

const domainName = `benwainwright.me`

const getHashVars = (hash: string) => {
  return Object.fromEntries(
    hash
      .slice(1)
      .split("&")
      .map(pair => pair.split("="))
  )
}

export const useApiRequest = <T>(path: string) => {
  const [token, setToken] = useLocalStorage(TOKEN_KEY, "")
  const { config } = useConfig()

  if (!token && config) {
    const params = getHashVars(window.location.hash)
    if ("id_token" in params) {
      setToken(params[`id_token`])
    } else {
      window.location.href =
        window.location.hostname === "localhost"
          ? config.authSignInUrlForLocal
          : config.authSignInUrl
    }
  }

  const fetcher = async <R>(init?: RequestInit): Promise<R> => {
    const fullPath = `https://${domainName}/${path}`
    const response = await fetch(fullPath, init)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        `Tried to make a request to ${fullPath} but the server returned a ${response.status} status code with the message "${data.error}"`
      )
    }
    return data
  }

  return useSWR<T>(config && path, fetcher)
}
