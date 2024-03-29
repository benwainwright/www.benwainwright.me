import { useConfig } from "../use-config/use-config"
import { useLocalStorage } from "../use-localstorage/use-localstorage"

const getHashVars = (hash: string) => {
  return Object.fromEntries(
    hash
      .slice(1)
      .split("&")
      .map(pair => pair.split("="))
  )
}

export const TOKEN_KEY = `benwainwright-dot-me-token`

interface TokenOptions {
  redirectIfNotPresent: boolean
}

export const useToken = ({
  redirectIfNotPresent,
}: TokenOptions): [string | undefined, (token: string | undefined) => void] => {
  const [{ token }, setToken] = useLocalStorage<{ token: string | undefined }>(
    TOKEN_KEY,
    {
      token: "",
    }
  )
  const { config } = useConfig()

  const params = getHashVars(
    typeof window !== "undefined" ? window.location.hash : ""
  )

  if (!token && config) {
    if ("id_token" in params) {
      setToken({ token: params[`id_token`] })
    } else if (redirectIfNotPresent) {
      window.location.href =
        window.location.hostname === "localhost"
          ? config.authSignInUrlForLocal
          : config.authSignInUrl
    }
  }

  if ("id_token" in params && token) {
    window.location.href = window.location.origin + window.location.pathname
  }

  return [
    token,
    (incomingToken: string | undefined) =>
      setToken(incomingToken ? { token: incomingToken } : { token: undefined }),
  ]
}
