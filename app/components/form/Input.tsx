import React from "react";
import { type ForwardedRef, forwardRef } from "react";
import { TextInput, type TextInputProps, Pressable } from "react-native";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Text, View } from "@tamagui/core";
import { blue } from "@tamagui/colors";
import { useDisclosure } from "@/hooks";
import ViewIcon from "@/assets/images/icons/view.svg";
import ViewOffIcon from "@/assets/images/icons/hide.svg";

type InputType = "password";

type InputProps<T extends FieldValues> = Omit<TextInputProps, "children" | "style"> & {
  label: string;
  name: Path<T>;
  isRequired?: boolean;
  type?: InputType;
  multiline?: boolean;
  control: Control<T, any>;
};

export const Input = forwardRef(function InputComponent<T extends FieldValues>(
  props: InputProps<T>,
  ref?: ForwardedRef<TextInput>,
) {
  const { isOpen, onToggle } = useDisclosure();
  const {
    control,
    name,
    label,
    type,
    isRequired = false,
    multiline = false,
    ...fieldProps
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <View>
          <Text color="#252525" marginBottom={2} fontSize={14}>
            {label}
            {isRequired ? "*" : null}
          </Text>
          <View flexDirection="row" borderWidth={1} borderRadius={4} borderColor="#868686">
            <TextInput
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                fontSize: 16,
                width: type !== undefined ? "90%" : "100%",
              }}
              multiline={multiline}
              cursorColor={blue.blue11}
              selectionColor={blue.blue8}
              secureTextEntry={type === "password" && !isOpen}
              autoCapitalize="none"
              onChangeText={field.onChange}
              {...field}
              {...fieldProps}
              ref={ref}
            />
            {type === "password" ? (
              <Pressable
                onPress={onToggle}
                style={{
                  width: "10%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingEnd: 8,
                }}
              >
                {isOpen ? <ViewOffIcon /> : <ViewIcon />}
              </Pressable>
            ) : null}
          </View>
          <Text marginBottom={2} color="#FF2121" fontSize={12}>
            {fieldState.error?.message}
          </Text>
        </View>
      )}
    />
  );
});
