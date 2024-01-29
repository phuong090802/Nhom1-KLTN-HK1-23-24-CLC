import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = () => {
    return (
        <div
            className='relative'>
            <input
                className='rounded-2xl border px-4 py-2 bg-ghost-white w-[350px] outline-none text-black/75'
                placeholder='Tìm kiếm câu hỏi...' />
            <SearchOutlinedIcon className='absolute right-2 top-2 text-black/50' />
        </div>
    )

}

export default SearchBar