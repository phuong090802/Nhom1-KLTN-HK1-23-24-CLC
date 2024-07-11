import { createContext, useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../template/modal-layout-2/ModalLayout2";
import { DepheadFaqContext } from "./DepheadFaqStore";
import { AddFaqForm } from "./AddFaqForm";
import { getMyFieldsSv } from "../../../service/counsellor/counsellorField.sv";

export const AddFaqModalContext = createContext({
  fieldData: Array,
  setFieldData: Function,
});

export const AddFaqModal = () => {
  const { hiddenAddFaq, setHiddenAddFaq } = useContext(DepheadFaqContext);

  const [fieldData, setFieldData] = useState([]);

  const getMyField = async () => {
    try {
      const response = await getMyFieldsSv();
      const fields = response.fields.map((item) => {
        return { value: item._id, key: item.fieldName };
      });
      setFieldData(fields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyField();
  }, []);

  return (
    <ModalLayout2
      hidden={hiddenAddFaq}
      setHidden={setHiddenAddFaq}
      text={"Thêm Faq"}
    >
      <AddFaqModalContext.Provider value={{ fieldData }}>
        <AddFaqForm />
      </AddFaqModalContext.Provider>
    </ModalLayout2>
  );
};
