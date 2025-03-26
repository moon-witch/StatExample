import {ref} from "vue";
import {supabase} from "@/lib/supabaseClient.ts";

export const useUserName = () => {
  const currentUserName = ref<any>('')

  async function getUserNameFromId(id: string): Promise<void> {
    try {
      const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', id)

      if(data) {
        currentUserName.value = data
      }
    } catch(e) {
      console.error(e)
    }
  }

  return { currentUserName, getUserNameFromId }
}
