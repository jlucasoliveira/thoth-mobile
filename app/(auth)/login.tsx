import React, { useRef } from "react";
import { View, Image, Button } from "tamagui";
import { KeyboardAvoidingView, type TextInput } from "react-native";
import { type InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "@/components/form/Input";

const schema = object().shape({
  username: string().required("Campo obrigatório"),
  password: string().required("Campo obrigatório"),
});

type FormType = InferType<typeof schema>;

export default function Login(): React.JSX.Element {
  const passwordRef = useRef<TextInput>(null);
  const { control } = useForm<FormType>({ resolver: yupResolver(schema) });

  return (
    <View flexGrow={1} backgroundColor="white" justifyContent="center">
      <KeyboardAvoidingView contentContainerStyle={{ flexGrow: 1 }}>
        <View alignSelf="center">
          <Image
            width={120}
            height={120}
            alignSelf="center"
            resizeMode="contain"
            source={require("../../assets/images/splash-icon.png")}
          />
        </View>
        <View marginHorizontal="$10" marginTop="$10">
          <Input
            isRequired
            control={control}
            label="Nome de usuário"
            name="username"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus?.()}
          />
          <Input
            isRequired
            ref={passwordRef}
            control={control}
            label="Senha"
            name="password"
            type="password"
          />
          <Button>Entrar</Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
