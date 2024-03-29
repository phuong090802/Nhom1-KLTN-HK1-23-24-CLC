import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const Filter = () => {
    return <div className="relative h-8 bg-ghost-white flex items-center justify-between text-[13px] text-black/75 pl-4 w-48 rounded-lg border border-black/50">
            Lĩnh vực
            <ArrowDropDownOutlinedIcon className='absolute right-2'/>
    </div>
}

export default Filter