import { useDebugValue, useState } from "react"

export default function useCustomHook() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  useDebugValue(name ? 'Name has been set' : 'Name has not been set')

  return [name, setName, address, setAddress]
}