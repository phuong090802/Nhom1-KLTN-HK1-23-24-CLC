import ModalLayout from "../../../atom/modal-layout/ModalLayout"
import AddDepartmentForm from "./AddDepartmentForm"

const AddDepartmentModal = ({ handleClose, reload, hidden }) => {
    return <ModalLayout
        handleClose={handleClose}
        title={'Tạo khoa'}
        hidden={hidden}>
        <AddDepartmentForm
            reload={reload} />
    </ModalLayout>
}

export default AddDepartmentModal