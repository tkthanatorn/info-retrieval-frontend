import {
  Badge,
  Button,
  Flex,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Recipe } from "../../../types";
import { IconBookmark } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";
import AddBookmarkModal from "./AddBookmarkModal";
import { useDisclosure } from "@mantine/hooks";
import RecipeModal from "./RecipeModal";

type RecipeCardProps = {
  recipe: Recipe;
};
const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [opened, { open, close }] = useDisclosure();
  const [recipeOpened, { open: openRecipe, close: closeRecipe }] =
    useDisclosure();

  return (
    <Fragment>
      <Paper
        onClick={openRecipe}
        shadow="md"
        px="lg"
        py="md"
        style={{ cursor: "pointer" }}
      >
        <Grid>
          <Grid.Col span={4}>
            {recipe.images.length ? (
              <Image src={recipe.images[0]} />
            ) : (
              <Image src="https://via.placeholder.com/150" />
            )}
          </Grid.Col>

          <Grid.Col span={8}>
            <Stack
              h="100%"
              justify="space-between"
            >
              <Stack>
                <Title order={2}>{recipe.name}</Title>
                <Text>{recipe.description}</Text>
                {recipe.score ? (
                  <Flex
                    gap="xs"
                    direction="row"
                    align="center"
                  >
                    <Text>score: </Text>
                    <Badge>{recipe.score.toFixed(2)}</Badge>
                  </Flex>
                ) : null}
              </Stack>

              <Button
                variant="outline"
                leftSection={<IconBookmark size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
              >
                Add to Bookmark
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      <AddBookmarkModal
        open={opened}
        onClose={close}
        recipeId={recipe.id}
      />

      <RecipeModal
        open={recipeOpened}
        onClose={closeRecipe}
        recipe={recipe}
      />
    </Fragment>
  );
};

export default RecipeCard;
