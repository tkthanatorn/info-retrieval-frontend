import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./components/RecipeCard";
import { Recipe } from "../../types";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteBookmarkAPI, getBookmarkAPI } from "../../api/bookmark";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../store";
import { notifications } from "@mantine/notifications";

const Bookmark = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdState);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { refetch } = useQuery(
    ["bookmark"],
    async () => {
      if (userId) return await getBookmarkAPI(userId);
    },
    {
      onSuccess: (resp) => {
        if (!resp || !resp.data.success || !resp.data.result) return;
        console.log(resp.data.result);
        setRecipes(resp.data.result);
      },
      onError: () => {
        notifications.show({
          message: "🚨 Failed to get bookmark",
          color: "red",
        });
      },
    }
  );

  const { mutateAsync: deleteBookmark } = useMutation(
    ["remove-bookmark"],
    deleteBookmarkAPI,
    {
      onSuccess: () => {
        notifications.show({
          message: "🎉 Bookmark removed",
          color: "teal",
        });
        refetch();
      },
      onError: () => {
        notifications.show({
          message: "🚨 Failed to remove bookmark",
          color: "red",
        });
      },
    }
  );
  const handleRemoveBookmark = async (recipeId: number) => {
    if (userId) await deleteBookmark({ user_id: userId, recipe_id: recipeId });
  };

  return (
    <Container py="lg">
      <Flex
        my="md"
        align="center"
        justify="space-between"
        direction="row"
      >
        <Title order={1}>Bookmark</Title>
      </Flex>

      <Stack>
        {recipes.length === 0 && (
          <Title
            order={2}
            ta="center"
            c="gray"
          >
            No bookmarked recipe
          </Title>
        )}
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            onRemove={() => handleRemoveBookmark(recipe.id)}
          />
        ))}
      </Stack>
    </Container>
  );
};
export default Bookmark;
