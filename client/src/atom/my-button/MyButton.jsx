const MyButton = ({ size, outline, title, onClick }) => {

    const style = {
        base: 'inline-flex justify-center items-center rounded-lg cursor-pointer',
        type: {
            fulfill: 'bg-primary text-white',
            outline: 'bg-white text-primary border border-primary'
        },
        size: {
            large: 'px-12 py-4',
            medium: 'px-8 py-3',
            small: 'px-3 py-1'
        }
    }

    const buttonStyle = `${style.base} 
        ${(size === 'large') ?
            style.size.large :
            (size === 'medium') ?
                style.size.medium :
                style.size.small} 
        ${outline ?
            style.type.outline :
            style.type.fulfill}`

    return <div
        className={buttonStyle}
        onClick={onClick}>
        <h1>{title}</h1>
    </div>
}

export default MyButton