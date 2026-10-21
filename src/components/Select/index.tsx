import { Box } from "@chakra-ui/react";
import Select from "react-select";
import { constructionWorks } from "../../data/index";
import type { FormData } from "../../chema/registrationSchema";

type SelectFieldProps = {
  value: FormData["works"];
  onChange: (value: FormData["works"]) => void;
  onBlur?: () => void;
};

const SelectField = ({ value = [], onChange, onBlur }: SelectFieldProps) => {
  const selectedOptions = constructionWorks.filter((work) =>
    value.includes(work.value),
  );

  return (
    <Box>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={constructionWorks}
        value={selectedOptions}
        onChange={(options) => onChange(options.map((option) => option.value))}
        onBlur={onBlur}
        placeholder='Выберите строительные работы...'
      />
    </Box>
  );
};

export default SelectField;
