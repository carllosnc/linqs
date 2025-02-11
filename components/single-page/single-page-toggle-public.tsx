import { Switch } from "@/components/ui/switch";
import { Tables, TablesUpdate } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

type Props = {
  page: Tables<'pages'>
  pageId: string
}

export function SinglePageTogglePublic({ pageId, page }: Props) {
  const [isPublic, setIsPublic] = useState<boolean>(page.isPublic)
  const [loading, setLoading] = useState(false);

  async function togglePublic() {
    setLoading(true)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const pageData: TablesUpdate<"pages"> = {
      user_id: user?.id,
      isPublic: !isPublic,
    };

    await supabase.from("pages").update(pageData).eq("id", pageId)
    setLoading(false)
    setIsPublic(!isPublic)
  }

  return (
    <div className="flex items-center gap-[10px]">
      <span className="text-color">
        {loading ? "Loading..." : "Public"}
      </span>
      <Switch
        disabled={loading}
        checked={isPublic}
        onCheckedChange={togglePublic}
      />
    </div>
  )
}