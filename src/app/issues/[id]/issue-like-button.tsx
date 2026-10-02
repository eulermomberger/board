"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { LikeButton } from "@/components/like-button";
import { getIssueInteractions } from "@/http/get-issue-interactions";

interface IssueLikeButtonProps {
  issueId: string;
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["issue-likes", issueId],
    queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
  });

  const interaction = data.interactions[0];

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={interaction.likesCount}
      initialLiked={interaction.isLiked}
    />
  );
}
