import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../chema/registrationSchema";
import { Button, Box, Stack, Input, Text } from "@chakra-ui/react";
import type { FormData } from "../../chema/registrationSchema";
import { sendTelegramMessage } from "../../api/telegram";

import SelectField from "../Select";

const RegistrationForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      number: "",
      works: [] as FormData["works"],
    },
  });

  const subHandle = async (data: FormData) => {
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
            <Input {...register("firstName")} placeholder='ФИО' />
            {errors.firstName && (
              <Text color='red.500' fontSize='sm' mt='1'>
                {errors.firstName.message}
              </Text>
            )}
          </Box>

          <Box>
            <Input {...register("email")} type='email' placeholder='Email' />
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
                <InputMask
                  mask='+375 (__) ___-__-__'
                  replacement={{ _: /\d/ }}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  placeholder='+375 (__) ___-__-__'
                  type='tel'
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

          <Button type='submit' colorPalette='red' w='full'>
            Отправить
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
