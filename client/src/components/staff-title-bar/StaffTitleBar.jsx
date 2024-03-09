import Search from '../../atom/search'
import Sort from '../sort'
import AddButton from './AddButton'
import './style.css'

const StaffTitleBar = ({ title, handleAddButton, sort, filter, setParams }) => {


    return <div className="title-container flex justify-between">
        <h1 className="staff-title">{title}</h1>
        <div className='flex justify-center gap-2 '>
            <Sort
                sortData={sort}
                filterData={filter}
                setParams={setParams} />
            <Search />
            <AddButton onClick={handleAddButton} />
        </div>
    </div>
}

export default StaffTitleBar