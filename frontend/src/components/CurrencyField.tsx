import {
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface CurrencyFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "value" | "defaultValue"> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const CurrencyField = <T extends FieldValues>({
  name,
  control,
  ...props
}: CurrencyFieldProps<T>) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const displayValue = formatCurrency(field.value ?? 0);

        const handleChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const digits = event.target.value.replace(/\D/g, "");

          if (!digits) {
            field.onChange(0);
            return;
          }

          const value = Number(digits) / 100;

          field.onChange(value);
        };

        return (
          <TextField
            {...props}
            value={displayValue}
            onChange={handleChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    R$
                  </InputAdornment>
                ),
              },
            }}
          />
        );
      }}
    />
  );
};