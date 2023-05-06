import useSWRImmutable from "swr/immutable"
import { BackendConfig } from "../../types/backend-config"

const fetcher = async (url: string) => fetch(url).then(async r => r.json())

export const useConfig = () => {
  const { data } = useSWRImmutable<BackendConfig>(
    "https://benwainwright.me/config.json",
    fetcher
  )

  return { config: data }
}
