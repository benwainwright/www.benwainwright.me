import { useCallback } from "react"
import { BackendConfig } from "../types/backend-config"

export const makeFetcher = (
  config: BackendConfig | undefined,
  path: string | false,
  token: string | undefined,
  setToken: (token: string | undefined) => void
) => {
  return useCallback(
    async <R>(init?: Partial<RequestInit>): Promise<R> => {
      const fullPath = `https://${config?.apiUrl}/${path}`

      const withToken = token
        ? {
            headers: {
              authorization: token,
            },
          }
        : {}

      const finalInit = init ? { ...init, ...withToken } : withToken

      const response = await fetch(fullPath, finalInit)

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setToken(undefined)
        }
        throw new Error(
          `Tried to make a request to ${fullPath} but the server returned a ${response.status} status code with the message "${data.error}"`
        )
      }
      return data
    },
    [config, path, token, setToken]
  )
}
