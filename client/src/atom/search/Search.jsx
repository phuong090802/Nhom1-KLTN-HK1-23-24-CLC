import MaterialIcon from "../../components/material-icon/MaterialIcon"

const Search = () => {
    return <div className="flex">
        <input
            type="search"
            className="outline-none border border-black/10 h-8 pl-4 border-r-transparent rounded-l-2xl" />
        <div className="h-8 w-8 inline-flex justify-center items-center border border-l-transparent border-black/10 rounded-r-2xl bg-white">
            <MaterialIcon
                name='HighlightOffOutlinedIcon'
                style={'cursor-pointer'}
                color={'#2785DC'}
            />
        </div>
    </div>
}

export default Search