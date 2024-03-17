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
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";
import { Recipe } from "../../../types";
import RecipeModal from "./RecipeModal";

type RecipeCardProps = {
  recipe: Recipe;
  onRemove?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
const RecipeCard = ({ recipe, onRemove }: RecipeCardProps) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <Fragment>
      <Paper
        onClick={open}
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
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={onRemove}
              >
                Remove
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      <RecipeModal
        open={opened}
        onClose={close}
        recipe={recipe}
      />
    </Fragment>
  );
};

export default RecipeCard;
