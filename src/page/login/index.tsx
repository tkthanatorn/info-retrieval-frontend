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
import { useMutation } from "react-query";
import { LoginBody } from "../../types";
import { loginAPI } from "../../api";
import { notifications } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../../store";
import { Link } from "react-router-dom";

const Login = () => {
  const [_, setToken] = useLocalStorage({ key: "token" });
  const setUserIdState = useSetRecoilState(userIdState);

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

  const { mutateAsync } = useMutation(["login"], loginAPI, {
    onSuccess: (resp) => {
      notifications.show({
        message: "🔓 Login success",
        color: "teal",
      });

      const result = resp.data.result;
      if (!resp.data.success || !result) {
        notifications.show({
          message: "🔒 Login failed",
          color: "red",
        });
        return;
      }

      setToken(result.token);
      setUserIdState(result.user_id);
    },
    onError: () => {
      notifications.show({
        message: "🔒 Login failed",
        color: "red",
      });
    },
  });

  const loginHandle = async (body: LoginBody) => await mutateAsync(body);

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
        <form onSubmit={form.onSubmit(loginHandle)}>
          <Stack w="400px">
            <Title order={2}>Login</Title>

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
              If you don't have account,{" "}
              <Link to="/auth/register">Register</Link>
            </Text>

            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default Login;
