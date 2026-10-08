import { ArchiveIcon, MessageCircleIcon } from "lucide-react";
import type z from "zod";

import type { IssueCardSchema } from "@/api/routes/list-issues";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { LikeButton } from "@/components/like-button";
import { Section } from "@/components/section";

interface BoardCardProps {
  issues: z.infer<typeof IssueCardSchema>[];
  interactions: Map<
    string,
    {
      isLiked: boolean;
      likesCount: number;
    }
  >;
  sectionTitle: string;
}

export function BoardCard({
  interactions,
  issues,
  sectionTitle,
}: BoardCardProps) {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>
          <ArchiveIcon className="size-3" />
          {sectionTitle}
        </Section.Title>

        <Section.IssueCount>{issues.length}</Section.IssueCount>
      </Section.Header>

      {/* Content */}
      <Section.Content>
        {issues.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-center">
            <p className="text-sm text-navy-300">
              No issues matching your filters
            </p>
          </div>
        ) : (
          issues.map((issue) => {
            const interaction = interactions.get(issue.id);

            return (
              <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <LikeButton
                    issueId={issue.id}
                    initialLikes={interaction?.likesCount ?? 0}
                    initialLiked={interaction?.isLiked ?? false}
                  />

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            );
          })
        )}
      </Section.Content>
    </Section.Root>
  );
}
