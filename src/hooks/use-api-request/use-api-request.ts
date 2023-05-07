import useSWR from "swr"
import { useToken } from "../use-token/use-token"
import { useConfig } from "../use-config/use-config"

export const useApiRequest = <T>(path: string) => {
  const token = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = async <R>(init?: RequestInit): Promise<R> => {
    const fullPath = `https://${config?.apiUrl}/${path}`

    const withToken = {
      headers: {
        authorization: token,
      },
    }

    const finalInit = init ? { ...init, ...withToken } : withToken

    const response = await fetch(fullPath, finalInit)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        `Tried to make a request to ${fullPath} but the server returned a ${response.status} status code with the message "${data.error}"`
      )
    }
    return data
  }

  return useSWR<T>(config && token && path, fetcher)
}
