import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.ts'

export const useSupabaseStore = defineStore('supabase', () => {
  const allProjects = ref<any[]>([])
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

  async function getAllProjects() {
    try {
      const { data } = await supabase
        .from('projects')
        .select()

      if (data) {
        allProjects.value = data
      }
    } catch (e) {
      console.error(e)
    }
  }

  function resetTicketData() {
    projectData.value = []
  }

  async function getTicketsForProject(projectId: string){
    try {
      const { data } = await supabase
        .from('tasks')
        .select()
        .eq('project_id', projectId)

      if (data) {
        projectData.value = data
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { allProjects, projectData, logIn, getAllProjects, resetTicketData, getTicketsForProject }
})
