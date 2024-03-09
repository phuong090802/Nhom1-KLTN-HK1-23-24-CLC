const LabelInput = ({ label, name, type, onChange, onBlur, value }) => {

    return <div>
        <p className="text-sm font-bold mt-2">{label}</p>
        <input
            className="min-w-80 outline-none border p-1 rounded-lg"
            type={type || 'text'}
            name={name || ''}
            value={value}
            onChange={e => { onChange(e) }}
            onBlur={onBlur} />
    </div>
}

export default LabelInput