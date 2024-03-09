import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import HiveOutlinedIcon from '@mui/icons-material/HiveOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';





const MaterialIcon = ({ name, style, color }) => {

    let icon
    switch (name) {
        case 'FeedOutlinedIcon':
            icon = <FeedOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'GroupOutlinedIcon':
            icon = <GroupOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'HiveOutlinedIcon':
            icon = <HiveOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'DashboardOutlinedIcon':
            icon = <DashboardOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'HelpCenterOutlinedIcon':
            icon = <HelpCenterOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'QuickreplyOutlinedIcon':
            icon = <QuickreplyOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'ArrowDropUpOutlinedIcon':
            icon = <ArrowDropUpOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'ArrowDropDownOutlinedIcon':
            icon = <ArrowDropDownOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'FilterListOutlinedIcon':
            icon = <FilterListOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'LastPageOutlinedIcon':
            icon = <LastPageOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'FirstPageOutlinedIcon':
            icon = <FirstPageOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'CloseOutlinedIcon':
            icon = <CloseOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'EditOutlinedIcon':
            icon = <EditOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'DeleteOutlineOutlinedIcon':
            icon = <DeleteOutlineOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'GroupsOutlinedIcon':
            icon = <GroupsOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'AccessibleForwardOutlinedIcon':
            icon = <AccessibleForwardOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'ManageAccountsIcon':
            icon = <ManageAccountsIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'LockOutlinedIcon':
            icon = <LockOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'LockOpenOutlinedIcon':
            icon = <LockOpenOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'SearchOutlinedIcon':
            icon = <SearchOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        case 'HighlightOffOutlinedIcon':
            icon = <HighlightOffOutlinedIcon className={style} style={{ color: color || '#000' }} />;
            break;
        default:
            icon = null;
            break;
    }
    return icon;
}

export default MaterialIcon;
