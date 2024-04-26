import { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { DepheadFaqContext } from "./DepheadFaqStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import { AddFaqModal } from "./AddFaqModal";

export const DepheadFaqContent = () => {
  const { faqs, params, setParams, pages, setHiddenAddFaq } =
    useContext(DepheadFaqContext);

  return (
    <>
      <AddFaqModal />
      <StaffTitleBar
        title={"Quản lý câu hỏi chung"}
        onAdd={() => setHiddenAddFaq(false)}
        setParams={setParams}
      />
      <div className="mt-2 grid gap-2">
        {faqs.map((faq) => (
          <Item key={faq._id} data={faq} />
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <Pagination
          page={params.page || 1}
          setParams={setParams}
          pages={pages}
        />
      </div>
    </>
  );
};
