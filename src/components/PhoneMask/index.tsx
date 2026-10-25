import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Box } from "@chakra-ui/react";

type PhoneMaskProps = {
  value: string;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
};

function PhoneMask({ value, onChange, onBlur }: PhoneMaskProps) {
  return (
    <Box
      border='1px solid'
      borderColor='gray.200'
      borderRadius='md'
      px='3'
      minH='42px'
      display='flex'
      alignItems='center'
      _focusWithin={{
        borderColor: "blue.500",
        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
      }}
    >
      <PhoneInput
        placeholder='Введите номер телефона'
        value={value || undefined}
        onChange={onChange}
        onBlur={onBlur}
        defaultCountry='BY'
        international
        countryCallingCodeEditable={false}
      />
    </Box>
  );
}

export default PhoneMask;
