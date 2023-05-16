import useSWR from "swr"
import { useToken } from "../use-token/use-token"
import { useConfig } from "../use-config/use-config"
import { makeFetcher } from "../../utils/make-fetcher"

interface Options {
  trigger?: boolean
  resource: string
  id?: string
}

const getPath = (
  trigger: boolean,
  resource: string,
  id: string | undefined
) => {
  if (!trigger) {
    return false
  }

  if (!id) {
    return resource
  }

  return `${resource}/${id}`
}

export const useApiRequest = <T>({ trigger = true, resource, id }: Options) => {
  const path = getPath(trigger, resource, id)
  const [token, setToken] = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = makeFetcher(config, path, token, setToken)
  return useSWR<T>(config && token && path, fetcher)
}
