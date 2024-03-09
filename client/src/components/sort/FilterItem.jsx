import { useCallback } from "react";

const FilterItem = ({ label, data, onChange }) => {

    const handleChange = useCallback((value) => {
        if (value === 'None') {
            onChange(prev => {
                const newState = { ...prev };
                if (newState[label.value]) {
                    delete newState[label.value];
                }
                return newState;
            });
        } else {
            console.log({ [label.value]: value });
            onChange(prev => ({
                ...prev,
                [label.value]: value
            }));
        }
    }, [onChange]);


    return <div className="flex justify-between items-center w-72 py-1 text-black/75">
        <h1 className="min-w-24">{label.key}:</h1>
        <select
            className="w-44 outline-none border border-black/20 rounded-md"
            onChange={e => handleChange(e.target.value)}>
            <option value={'None'}>None</option>
            {data.map((opt) => {
                return <option key={opt.key} value={opt.value}>{opt.key}</option >;
            })}
        </select>
    </div>
}

export default FilterItem