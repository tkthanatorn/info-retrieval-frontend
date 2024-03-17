import { Button, Flex, Modal, Rating, Stack } from "@mantine/core";
import { useState } from "react";
import { useMutation } from "react-query";
import { saveBookmarkAPI } from "../../../api/bookmark";
import { notifications } from "@mantine/notifications";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../../store";

type AddBookmarkModalProps = {
  open: boolean;
  onClose: () => void;
  recipeId: number;
};

const AddBookmarkModal = ({
  onClose,
  open,
  recipeId,
}: AddBookmarkModalProps) => {
  const userId = useRecoilValue(userIdState);
  const [rating, setRating] = useState<number>(3);
  const { mutateAsync } = useMutation(["add-bookmark"], saveBookmarkAPI, {
    onSuccess: () => {
      notifications.show({
        message: "🎉 Bookmark added!",
        color: "teal",
      });
      onClose();
    },
    onError: () => {
      notifications.show({
        message: "🚨 Failed to add bookmark",
        color: "red",
      });
      onClose();
    },
  });

  const addBookmarkHandle = async () => {
    if (!userId) return;
    await mutateAsync({ rating: rating, recipe_id: recipeId, user_id: userId });
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
    >
      <form>
        <Stack
          align="center"
          justify="center"
        >
          <Rating
            size="xl"
            value={rating}
            onChange={(val) => (val > 0 && val <= 5 ? setRating(val) : null)}
          />

          <Flex
            w="100%"
            gap="sm"
          >
            <Button
              onClick={onClose}
              variant="outline"
              style={{ flex: 1 }}
            >
              Cancel
            </Button>

            <Button
              onClick={addBookmarkHandle}
              style={{ flex: 1 }}
            >
              Confirm
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddBookmarkModal;
