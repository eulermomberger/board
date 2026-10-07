import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUpIcon } from "lucide-react";
import type { ComponentProps } from "react";
import type { z } from "zod";

import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { toggleLike } from "@/http/toggle-like";
import { Button } from "./button";

type IssueInteractionResponse = z.infer<typeof IssueInteractionsResponseSchema>;

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string;
  initialLikes: number;
  initialLiked?: boolean;
}

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: handleToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueryData<IssueInteractionResponse>([
        "issue-likes",
        issueId,
      ]);

      queryClient.setQueryData<IssueInteractionResponse>(
        ["issue-likes", issueId],
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                };
              }

              return interaction;
            }),
          };
        },
      );

      return { previousData };
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<IssueInteractionResponse>(
          ["issue-likes", issueId],
          context.previousData,
        );
      }
    },
  });

  const liked = initialLiked;

  return (
    <Button
      {...props}
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:hover:bg-indigo-500 data-[liked=true]:text-white"
      aria-label={liked ? "Unlike" : "Like"}
      disabled={isPending}
      onClick={() => handleToggleLike()}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
}
