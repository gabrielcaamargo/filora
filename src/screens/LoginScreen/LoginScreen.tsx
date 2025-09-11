import { FormTextInput, TextInput } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthScreenProps } from "@routes";
import { themedStyleSheet } from "@theme";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import z from "zod";

const testSchema = z.object({
  email: z.string().email("Email inválido"),
});

type TestSchema = z.infer<typeof testSchema>;

export function LoginScreen({}: AuthScreenProps<"LoginScreen">) {
  const {
    control,
    formState: { errors },
  } = useForm<TestSchema>({
    resolver: zodResolver(testSchema),
    mode: "onChange",
    delayError: 500,
  });

  return (
    <View style={styles.container}>
      <FormTextInput
        name="email"
        control={control}
        placeholder="Email"
        label="Email"
        iconVariant="AntDesign"
        iconName="mail"
        errors={errors}
        // disabled
        onPressIcon={() => Alert.alert("Email")}
      />
      {/* <Icon variant="AntDesign" name="mail" color="primaryColor" /> */}
    </View>
  );
}

const styles = themedStyleSheet(({ spacing }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.s20,
  },
}));
