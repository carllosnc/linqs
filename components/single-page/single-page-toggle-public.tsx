import { Switch } from "@/components/ui/switch";
import { Tables, TablesUpdate } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

type Props = {
  page: Tables<'pages'>
  pageId: string
}

export function SinglePageTogglePublic({ pageId, page }: Props) {
  const [is_public, setis_public] = useState<boolean>(page.is_public)
  const [loading, setLoading] = useState(false);

  async function togglePublic() {
    setLoading(true)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const pageData: TablesUpdate<"pages"> = {
      user_id: user?.id,
      is_public: !is_public,
    };

    await supabase.from("pages").update(pageData).eq("id", pageId)
    setLoading(false)
    setis_public(!is_public)
  }

  return (
    <div className="flex items-center gap-[10px]">
      <span className="text-color">
        {loading ? "Loading..." : "Public"}
      </span>
      <Switch
        disabled={loading}
        checked={is_public}
        onCheckedChange={togglePublic}
      />
    </div>
  )
}