import { useCallback } from "react";

const SortItem = ({ data, onChange }) => {

    const handleChange = useCallback((value) => {
        onChange(prev => (
            { ...prev, [data.sortBy]: value }
        ))
    }, [onChange])

    return <div className="flex justify-between items-center w-72 py-1 text-black/75">
        <p className="min-w-24">{data.key}:</p>
        <select
            className="w-44 outline-none border border-black/20 rounded-md"
            onChange={e => handleChange(e.target.value)}>
            {data.sortType.map((opt) => {
                return <option key={opt.key} value={opt.value}>{opt.key}</option >;
            })}
        </select>
    </div>
}

export default SortItem