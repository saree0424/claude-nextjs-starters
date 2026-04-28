import { useState, useCallback } from "react"

type AsyncStatus = "idle" | "pending" | "success" | "error"

interface AsyncState<T> {
  status: AsyncStatus
  value: T | null
  error: Error | null
}

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    value: null,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ status: "pending", value: null, error: null })
    try {
      const result = await asyncFn()
      setState({ status: "success", value: result, error: null })
    } catch (err) {
      setState({
        status: "error",
        value: null,
        error: err instanceof Error ? err : new Error(String(err)),
      })
    }
  }, [asyncFn])

  return { ...state, execute }
}
