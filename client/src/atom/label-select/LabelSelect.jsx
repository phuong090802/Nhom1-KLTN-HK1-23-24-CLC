const LabelSelect = ({ label, data, value, name, onChange, disable }) => {


    return <div className=" border-black/15">
        <p className="text-sm font-bold mt-2">{label}</p>
        <select
            className={`min-w-80 outline-none border p-1 rounded-lg ${disable ? 'bg-gray-300/50 ' : ''}`}
            value={value || 'COUNSELLOR'}
            name={name || ''}
            onChange={(e) => onChange(e)}
            disabled={disable}>
            {
                data?.map && data.map((opt, index) => <option key={index} value={opt.value}>{opt.key}</option>)
            }
        </select>
    </div>
}

export default LabelSelect