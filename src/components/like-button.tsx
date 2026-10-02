import { ThumbsUpIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "./button";

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
  const liked = initialLiked;

  return (
    <Button
      {...props}
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:hover:bg-indigo-500 data-[liked=true]:text-white"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
}
