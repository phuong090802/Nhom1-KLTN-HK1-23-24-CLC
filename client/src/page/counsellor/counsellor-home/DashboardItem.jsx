import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';

const DashboardItem = ({ type }) => {

    const style = {
        questions: {
            style: 'bg-[#C3D1FF] border-[#3B66FF]',
            icons: <HelpOutlineOutlinedIcon />,
        },
        answers: {
            style: 'bg-[#CBFFCA] border-[#49FF45]',
            icons: <CheckCircleOutlinedIcon />,
        },
        fields: {
            style: 'bg-[#EEC9FF] border-[#BB2EFE]',
            icons: <LayersOutlinedIcon />,
        },
        forward: {
            style: 'bg-[#F9FFD4] border-[#E2FF32]',
            icons: <ArrowOutwardOutlinedIcon />,
        },
    }

    return <div className={`w-full border-l-4 px-6 py-4 rounded-2xl shadow-md ${style[type].style}`}>
        <h1 className='flex gap-2 text-[18px] font-bold'>
            {style[type].icons}
            Đã trả lời
        </h1>
        <p className='text-3xl font-semibold mt-4 text-end'>
            120
        </p>
        
    </div>
}

export default DashboardItem