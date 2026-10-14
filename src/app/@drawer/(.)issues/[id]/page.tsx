import { DialogTitle } from "@radix-ui/react-dialog";

import { IssueDetails } from "@/app/issues/[id]/issue-details";
import { Drawer } from "@/components/drawer";

import { BackButton } from "./back-button";

interface IssueDrawerProps {
  params: Promise<{ id: string }>;
}

export default async function IssueDrawer({ params }: IssueDrawerProps) {
  const { id } = await params;

  return (
    <Drawer>
      <div className="flex flex-col gap-4 p-6">
        <BackButton />

        <DialogTitle className="sr-only">Issue details</DialogTitle>

        <IssueDetails issueId={id} />
      </div>
    </Drawer>
  );
}
