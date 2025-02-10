import { useRouter } from "next/navigation";
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/database.types";

type Props = {
  pageId: string
  page: Tables<'pages'>
}

export function SinglePageDeleteButton({ pageId, page }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deletePage() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase
      .from("pages")
      .delete()
      .eq("id", pageId)
      .eq("user_id", user?.id)

    setLoading(false);

    router.push("/protected")
    toast(
      `Page ${page.title} was deleted`,
      {
        description: "All links from this page was deleted too",
      }
    )
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button size="icon" variant="outline">
            { loading
              ? <Spinner size="sm" color="danger" />
              : <Trash className="text-color" size={15} />
            }
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              All links from this page will be deleted too.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-row justify-end gap-[10px]">
            <AlertDialogCancel className="m-0">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={deletePage}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}