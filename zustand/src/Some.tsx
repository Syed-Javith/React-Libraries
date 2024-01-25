import { useStore } from "."

export default function Some() {
    const count = useStore((state) => state.count)
    return <div>
       <p> the count is <span>{count}</span> here</p>
    </div>
}