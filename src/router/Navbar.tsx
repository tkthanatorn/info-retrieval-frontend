import { Button, Flex, Paper, Stack } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { userIdState } from "../store";

const Navbar = () => {
  const navigate = useNavigate();
  const resetUserId = useResetRecoilState(userIdState);

  const handleLogout = () => {
    resetUserId();
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <Stack w="100vw">
      <Paper
        w="100%"
        shadow="md"
        p="md"
      >
        <Flex
          direction="row"
          justify="center"
          gap="sm"
        >
          <Button
            variant="outline"
            onClick={() => navigate("/")}
          >
            📃 Recipe
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/bookmark")}
          >
            📌 Bookmark
          </Button>
          <Button
            variant="subtle"
            color="red"
            onClick={handleLogout}
          >
            🔐 Logout
          </Button>
        </Flex>
      </Paper>
      <Outlet />
    </Stack>
  );
};

export default Navbar;
