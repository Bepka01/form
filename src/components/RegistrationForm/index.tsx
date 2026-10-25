import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../schema/registrationSchema";
import { Button, Box, Stack, Input, Text } from "@chakra-ui/react";
import type { FormData } from "../../schema/registrationSchema";
import { sendTelegramMessage } from "../../api/telegram";
import SelectField from "../Select";
import PhoneMask from "../PhoneMask";

type SubmitFormStatusType = "success" | "error" | null;

const RegistrationForm = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitFormStatusType>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      email: "",
      number: "",
      works: [] as FormData["works"],
    },
  });

  const subHandle = async (data: FormData): Promise<void> => {
    setSubmitStatus(null);
    try {
      await sendTelegramMessage(data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <Box
      maxW='500px'
      mx='auto'
      p='6'
      bg='white'
      borderRadius='xl'
      boxShadow='md'
    >
      <form onSubmit={handleSubmit(subHandle)}>
        <Stack gap='4'>
          <Box>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => <Input {...field} placeholder='ФИО' />}
            />
            {errors.firstName && (
              <Text color='red.500' fontSize='sm' mt='1'>
                {errors.firstName.message}
              </Text>
            )}
          </Box>

          <Box>
            <Controller
              name='email'
              control={control}
              render={({ field }) => <Input {...field} placeholder='email' />}
            />
            {errors.email && (
              <Text color='red.500' fontSize='sm' mt='1'>
                {errors.email.message}
              </Text>
            )}
          </Box>

          <Box>
            <Controller
              name='number'
              control={control}
              render={({ field }) => (
                <PhoneMask
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.number && (
              <Text color='red.500' fontSize='sm' mt='1'>
                {errors.number.message}
              </Text>
            )}
          </Box>

          <Controller
            name='works'
            control={control}
            render={({ field }) => (
              <SelectField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.works && (
            <Text color='red.500' fontSize='sm' mt='1'>
              {errors.works.message}
            </Text>
          )}

          {submitStatus === "success" && (
            <Text color='green.500'>Форма успешно отправлена!</Text>
          )}

          {submitStatus === "error" && (
            <Text color='red.500'>
              Ошибка отправки формы. Попробуйте ещё раз.
            </Text>
          )}

          <Button
            disabled={isSubmitting}
            type='submit'
            colorPalette='red'
            w='full'
          >
            {isSubmitting ? "Отправка" : "Отправить"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
