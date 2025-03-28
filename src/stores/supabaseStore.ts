import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.ts'

export const useSupabaseStore = defineStore('supabase', () => {
  const allProjects = ref<any[]>([])
  const projectData = ref<any[]>([])
  const ticketsLoading = ref<boolean>(true)

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
    ticketsLoading.value = true
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
    } finally {
      ticketsLoading.value = false
    }
  }

  async function updateTicketData(field: string, newVal: string, ticketId: string) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ [field]: newVal })
        .eq('id', ticketId)

      if (error) console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  async function createNewTicket(newTicketData: Record<string, any>) {
    try {
      await supabase
        .from('tasks')
        .insert(newTicketData)

      await getTicketsForProject(newTicketData.project_id)
    } catch (error) {
      console.error(error)
    }
  }

  async function resetDemoData() {
    try {
      const { error } = await supabase.rpc('reset_demo_data')

      if (error) {
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { allProjects, projectData, ticketsLoading, getAllProjects, resetTicketData, getTicketsForProject, updateTicketData, createNewTicket, resetDemoData }
})
