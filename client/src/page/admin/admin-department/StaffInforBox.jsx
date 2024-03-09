
import user_avater from '../../../assets/svg/user_avatar.svg'
import IconButton from '../../../atom/icon-button';

const StaffInforBox = ({ isDepHead, counsellor, setDepHead }) => {
    return <div className='flex items-center justify-between py-1'>
        <div className='flex items-center gap-2 mt-2 ml-6'>
            <img src={(counsellor && counsellor.avatar) ? counsellor.avatar : user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
            <p>{counsellor ? counsellor.fullName : isDepHead ? 'Chưa có trưởng khoa' : 'Unknown'}</p>
        </div>
        {
            !isDepHead &&
            <IconButton
                icon={'ManageAccountsIcon'}
                iconColor={'#fff'}
                onClick={setDepHead}
            />
        }
    </div>
}
export default StaffInforBox