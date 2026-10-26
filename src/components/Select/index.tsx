import Select from "react-select";
import { CONSTRUCTION_WORK } from "../../constants/index.js";
import type { FormData } from "../../schema/registrationSchema";

type SelectFieldProps = {
  value: FormData["works"];
  onChange: (value: FormData["works"]) => void;
  onBlur?: () => void;
};

const SelectField = ({ value = [], onChange, onBlur }: SelectFieldProps) => {
  const selectedOptions = CONSTRUCTION_WORK.filter((work) =>
    value.includes(work.value),
  );

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      options={CONSTRUCTION_WORK}
      value={selectedOptions}
      onChange={(options) => onChange(options.map((option) => option.value))}
      onBlur={onBlur}
      placeholder='Выберите строительные работы...'
    />
  );
};

export default SelectField;
