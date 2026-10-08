"use client";

import { useQuery } from "@tanstack/react-query";
import { ArchiveIcon, MessageCircleIcon } from "lucide-react";
import { useMemo } from "react";
import type z from "zod";

import type { IssuesListResponseSchema } from "@/api/routes/list-issues";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { LikeButton } from "@/components/like-button";
import { Section } from "@/components/section";
import { getIssueInteractions } from "@/http/get-issue-interactions";
import { BoardCard } from "./boar-card";

interface BoardContentProps {
  issues: z.infer<typeof IssuesListResponseSchema>;
}

export function BoardContent({ issues }: BoardContentProps) {
  const allIssuesIds = [
    ...issues.backlog.map((issue) => issue.id),
    ...issues.todo.map((issue) => issue.id),
    ...issues.in_progress.map((issue) => issue.id),
    ...issues.done.map((issue) => issue.id),
  ];

  const { data: interactionsData } = useQuery({
    queryKey: ["issue-likes", allIssuesIds.sort().join(",")],
    queryFn: () => getIssueInteractions({ issueIds: allIssuesIds }),
  });

  const interactions = useMemo(() => {
    if (!interactionsData) {
      return new Map<string, { isLiked: boolean; likesCount: number }>();
    }

    return new Map<string, { isLiked: boolean; likesCount: number }>(
      interactionsData.interactions.map((interaction) => [
        interaction.issueId,
        {
          isLiked: interaction.isLiked,
          likesCount: interaction.likesCount,
        },
      ]),
    );
  }, [interactionsData]);

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <BoardCard
        issues={issues.backlog}
        interactions={interactions}
        sectionTitle="Backlog"
      />

      <BoardCard
        issues={issues.todo}
        interactions={interactions}
        sectionTitle="To Do"
      />

      <BoardCard
        issues={issues.in_progress}
        interactions={interactions}
        sectionTitle="In Progress"
      />

      <BoardCard
        issues={issues.done}
        interactions={interactions}
        sectionTitle="Done"
      />
    </main>
  );
}
