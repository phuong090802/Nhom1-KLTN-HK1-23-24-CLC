import { useEffect, useState } from "react";
import FloatInput from "../../atom/float-input";
import MyButton from "../../atom/my-button";
import { createFormInitData, ruleValidators } from "./constance";
import { toast } from "sonner";

const MyForm = ({ formInitData, onSubmit, submitTitle, defaultData }) => {
  const [loading, setLoading] = useState(false);

  const initData = createFormInitData(formInitData.inputs);

  const [formData, setFormData] = useState(initData);

  const [formError, setFormError] = useState(initData);

  const handleBlur = (e, rules) => {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      let errorMessage =
        rule.name === "isConfirm"
          ? ruleValidators[rule.name](e.target.value, formData[rule.value])
          : ruleValidators[rule.name](e.target.value, rule.value);
      setFormError((prev) => ({
        ...prev,
        [e.target.name]: errorMessage,
      }));
      if (errorMessage) break;
    }
  };

  useEffect(() => {
    !!defaultData && setFormData(defaultData);
  }, [defaultData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    try {
      //Kiểm tra các dữ liệu
      setLoading(true);
      let isValid = true;
      const FormElement = document.getElementById(formInitData.id);
      formInitData.inputs.map((input) => {
        const inputValue = FormElement.querySelector(`#${input.name}`).value;

        for (let i = 0; i < input.rules.length; i++) {
          const rule = input.rules[i];
          let errorMessage =
            rule.name === "isConfirm"
              ? ruleValidators[rule.name](inputValue, formData[rule.value])
              : ruleValidators[rule.name](inputValue, rule.value);
          setFormError((prev) => ({ ...prev, [input.name]: errorMessage }));
          if (errorMessage) {
            isValid = false;
            break;
          }
        }
      });
      //Submit
      if (isValid) {
        try {
          await onSubmit(formData);
          setFormData(initData);
        } catch (error) {}
      }
    } catch (error) {
      console.log(formInitData.id, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" id={formInitData.id}>
      {formInitData.inputs.map((input) => {
        return (
          <FloatInput
            key={input.name}
            label={input.label}
            type={input.type || "text"}
            name={input.name}
            value={formData[input.name]}
            error={formError[input.name]}
            id={input.name}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, input.rules)}
          />
        );
      })}
      <MyButton
        variant={"default"}
        size={"fullWidth"}
        loading={loading}
        onClick={handleSubmit}
        className="bg-primary"
      >
        {submitTitle || "Submit"}
      </MyButton>
    </form>
  );
};

export default MyForm;
