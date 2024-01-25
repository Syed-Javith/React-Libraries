import React from "react"
import { useStore } from "."
export default function Button() {
    const actions = useStore((state) => state)
    return (
        <div className="actions">
        <button style={{backgroundColor : "green"}} onClick={() => actions.inc()}>Add</button>
        <button style={{backgroundColor : "red"}} onClick={() => actions.dec()}>Subtract</button>
        <button style={{backgroundColor : "blue"}}  onClick={() => actions.reset()}>Reset</button>
        </div>
    )
}