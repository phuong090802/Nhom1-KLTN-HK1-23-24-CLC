import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const DepartmentListItems = ({ isSelected }) => {
    return <div className={`${isSelected ? 'text-white bg-primary cursor-pointer' : 'text-black/75 hover:bg-primary/25'} flex py-[6px] items-center px-6 duration-500 cursor-pointer`}>
        <ArrowRightOutlinedIcon className='p-0 ml-[-8px] items-start self-start' />
        <p>
            Tất cả khoa
        </p>
    </div>
}
export default DepartmentListItems