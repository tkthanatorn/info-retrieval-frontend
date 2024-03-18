import {
  ActionIcon,
  Button,
  Center,
  Container,
  Flex,
  Pagination,
  SegmentedControl,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconArrowRight,
  IconRefreshDot,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getRecipesAPI,
  searchRecipeByIngredientAPI,
  searchRecipeByInstructionAPI,
  searchRecipeByNameAPI,
} from "../../api";
import { Recipe } from "../../types";
import RecipeCard from "./components/RecipeCard";
import { useNavigate } from "react-router-dom";

type SearchForm = {
  type: "Name" | "Instruction" | "Ingredient";
  query: string;
};

const Home = () => {
  // simple recipe state management
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const { refetch } = useQuery(
    ["recipes", page],
    async () => getRecipesAPI(page),
    {
      onSuccess: (resp) => {
        if (!resp.data.success || !resp.data.result) return;
        const result = resp.data.result;
        setRecipes(result);
        if (result.length == 12 && page == totalPage - 1)
          setTotalPage((val) => val + 1);
      },
      onError: () => {
        notifications.show({
          message: "🚨 Failed to get recipes",
          color: "red",
        });
      },
    }
  );

  // advance search management
  const { mutateAsync: mutateByName } = useMutation(
    ["search-name"],
    searchRecipeByNameAPI,
    {
      onSuccess: (resp) => {
        if (!resp.data.success || !resp.data.result) return;
        const result = resp.data.result;
        setRecipes(result);
      },
      onError: () => {
        notifications.show({
          message: "🚨 Failed to get recipes",
          color: "red",
        });
      },
    }
  );

  const { mutateAsync: mutateByInstruction } = useMutation(
    ["search-instruction"],
    searchRecipeByInstructionAPI,
    {
      onSuccess: (resp) => {
        if (!resp.data.success || !resp.data.result) return;
        const result = resp.data.result;
        setRecipes(result);
      },
      onError: () => {
        notifications.show({
          message: "🚨 Failed to get recipes",
          color: "red",
        });
      },
    }
  );

  const { mutateAsync: mutateByIngredient } = useMutation(
    ["search-ingredient"],
    searchRecipeByIngredientAPI,
    {
      onSuccess: (resp) => {
        if (!resp.data.success || !resp.data.result) return;
        const result = resp.data.result;
        setRecipes(result);
      },
      onError: () => {
        notifications.show({
          message: "🚨 Failed to get recipes",
          color: "red",
        });
      },
    }
  );

  const form = useForm<SearchForm>({
    initialValues: {
      type: "Name",
      query: "",
    },
  });

  const resetSearchHandle = () => {
    refetch();
    form.reset();
    setPage(0);
  };

  const searchHandle = async (fields: SearchForm) => {
    if (fields.type === "Name") await mutateByName(fields.query);
    else if (fields.type === "Instruction")
      await mutateByInstruction(fields.query);
    else if (fields.type === "Ingredient")
      await mutateByIngredient(fields.query);
  };

  return (
    <Container py="lg">
      <Flex
        my="md"
        align="center"
        justify="space-between"
        direction="row"
      >
        <Title order={1}>Recipes</Title>
      </Flex>

      <Stack>
        <form onSubmit={form.onSubmit(searchHandle)}>
          <Stack>
            <Flex
              gap="sm"
              align="center"
            >
              <SegmentedControl
                data={["Name", "Instruction", "Ingredient"]}
                style={{ flex: 1 }}
                value={form.values.type}
                onChange={(value) => {
                  let val = value as "Name" | "Instruction" | "Ingredient";
                  form.setFieldValue("type", val);
                }}
              />

              <Button
                onClick={resetSearchHandle}
                leftSection={<IconRefreshDot size={20} />}
              >
                Reset
              </Button>
            </Flex>

            <TextInput
              placeholder="enter name, instruction or ingredient"
              rightSection={
                <ActionIcon type="submit">
                  <IconSearch size={20} />
                </ActionIcon>
              }
              {...form.getInputProps("query")}
            />
          </Stack>
        </form>

        {recipes.map((recipe, key) => (
          <RecipeCard
            key={key}
            recipe={recipe}
          />
        ))}

        <Center>
          <Pagination
            total={totalPage}
            value={page + 1}
            onChange={(val) => setPage(val - 1)}
          />
        </Center>
      </Stack>
    </Container>
  );
};

export default Home;
