import ModalLayout from "../../../atom/modal-layout"
import MaterialIcon from "../../../components/material-icon/MaterialIcon"
import AddUserForm from "./AddUserForm"

const AddUserModal = ({ onClose, reload, hidden }) => {

    return <ModalLayout
        title={'Thêm nhân viên'}
        handleClose={onClose}
        hidden={hidden}>
        <AddUserForm reload={reload} />
    </ModalLayout>
}

export default AddUserModal