import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const AddButton = ({ onClick }) => {
    return <div
        className="w-[30px] h-[30px] bg-[#14FF72] flex justify-center items-center rounded-lg cursor-pointer"
        onClick={onClick}>
        <AddBoxOutlinedIcon className='text-white' />
    </div>
}

export default AddButton

