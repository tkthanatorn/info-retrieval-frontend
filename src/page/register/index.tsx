import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "react-query";
import { registerAPI } from "../../api";
import { LoginBody } from "../../types";
import { Link } from "react-router-dom";

const Register = () => {
  const form = useForm<LoginBody>({
    validate: {
      username: (value) => {
        if (!value) return "Username is required";
      },
      password: (value) => {
        if (!value) return "Password is required";
      },
    },
  });

  const { mutateAsync } = useMutation(["register"], registerAPI, {
    onSuccess: () => {
      notifications.show({
        message: "🎉 Register success",
        color: "teal",
      });
    },
    onError: () => {
      notifications.show({
        message: "🚨 Login failed",
        color: "red",
      });
    },
  });

  const registerHandle = async (body: LoginBody) => await mutateAsync(body);

  return (
    <Stack
      h="100vh"
      align="center"
      justify="center"
    >
      <Paper
        shadow="md"
        p="md"
      >
        <form onSubmit={form.onSubmit(registerHandle)}>
          <Stack w="400px">
            <Title order={2}>Register</Title>

            <TextInput
              withAsterisk
              label="Username"
              placeholder="your username"
              {...form.getInputProps("username")}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="your password"
              {...form.getInputProps("password")}
            />

            <Text>
              If you already had account, <Link to="/auth/login">Login</Link>
            </Text>

            <Button type="submit">Register</Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default Register;
