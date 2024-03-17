import {
  Container,
  Flex,
  Image,
  Modal,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { Recipe } from "../../../types";

type RecipeModalProps = {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
};

const RecipeModal = ({ open, onClose, recipe }: RecipeModalProps) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      fullScreen
      centered
    >
      <Container>
        <Image
          mb="xl"
          src={
            recipe.images.length
              ? recipe.images[0]
              : "https://via.placeholder.com/150"
          }
        />

        <Flex
          direction="row"
          justify="space-between"
        >
          <Title
            mb="lg"
            style={{ flex: 1 }}
          >
            Menu: {recipe.name}
          </Title>
        </Flex>

        <Stack>
          <Stack gap={2}>
            <Title order={4}>Description</Title>
            <Text>{recipe.description}</Text>
          </Stack>

          <Stack gap={2}>
            <Title order={4}>Instructions</Title>
            {recipe.instructions.map((instruction, index) => (
              <Flex
                key={index}
                direction="row"
              >
                <Text
                  fw="bold"
                  mr="xs"
                >
                  {index + 1}.
                </Text>
                <Text>{instruction}</Text>
              </Flex>
            ))}
          </Stack>

          <Stack gap={2}>
            <Table
              withTableBorder
              striped
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Ingredient</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recipe.ingredient_parts.map((part, index) => {
                  let amount = "0";
                  if (recipe.ingredient_quantities.length > index)
                    amount = recipe.ingredient_quantities[index];

                  return (
                    <Table.Tr key={index}>
                      <Table.Td>{part}</Table.Td>
                      <Table.Td>{amount}</Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
};
export default RecipeModal;
