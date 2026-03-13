"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function UploadLinkModal({
  open,
  onOpenChange,
  ticketId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string;
}) {
  const fakeLink = `https://upload.gooclaim.local/${ticketId.toLowerCase()}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Link Generated</DialogTitle>
          <DialogDescription>Share only through approved templates. This modal does not allow custom outbound text.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{fakeLink}</div>
        <div className="mt-5 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
