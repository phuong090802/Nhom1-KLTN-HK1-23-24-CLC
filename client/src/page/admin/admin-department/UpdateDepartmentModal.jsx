import LabelInput from "../../../atom/label-input/LabelInput"
import ModalLayout from "../../../atom/modal-layout"
import UpdateDepartmentForm from "./UpdateDepartmentForm"

const UpdateDepartmentModal = ({ handleClose, reload, hidden }) => {
    return <ModalLayout
        title={'Cập nhật thông tin khoa'}
        handleClose={handleClose}
        hidden={hidden}
        >
        <UpdateDepartmentForm />
    </ModalLayout>
}
export default UpdateDepartmentModal