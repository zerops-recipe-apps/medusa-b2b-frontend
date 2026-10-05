import Medusa from "@medusajs/js-sdk"
import {
  getBrowserMedusaBackendUrl,
  getMedusaBackendUrl,
  getMedusaPublishableKey,
} from "@/lib/util/env"

function createMedusaClient() {
  const baseUrl =
    typeof window !== "undefined"
      ? getBrowserMedusaBackendUrl()
      : getMedusaBackendUrl()

  return new Medusa({
    baseUrl,
    debug: process.env.NODE_ENV === "development",
    publishableKey: getMedusaPublishableKey() || undefined,
  })
}

export const sdk = new Proxy({} as Medusa, {
  get(_target, prop) {
    const client = createMedusaClient()
    const value = (client as Medusa)[prop as keyof Medusa]
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client)
    }
    return value
  },
})
