import React, { useRef } from "react"
import { useStore } from "."
export default function Input() {
    const actions = useStore((state) => state.incByValue)
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="input">
            <input name="val" id="val" type="text" ref={inputRef} onChange={() => console.log(inputRef.current?.value)
            } />
            <button onClick={() => actions(parseInt(inputRef.current?.value || "1" ))}>
                Add this Value
            </button>
        </div>
    )
}