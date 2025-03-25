import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.ts'

export const useSupabaseStore = defineStore('supabase', () => {
  const projectData = ref<any[]>([])

  async function logIn() {
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: 'admin@admin.com',
        password: 'admin',
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function getProjectData(){
    try {
      const { data } = await supabase.from('projects').select()
      if (data) {
        projectData.value = data
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { projectData, logIn, getProjectData }
})
