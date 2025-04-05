import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.ts'

export const useSupabaseStore = defineStore('supabase', () => {
  const allProjects = ref<any[]>([])
  const projectData = ref<any[]>([])
  const ticketsLoading = ref<boolean>(true)
  const projectsLoading = ref<boolean>(true)

  async function getAllProjects() {
    try {
      projectsLoading.value = true
      const { data } = await supabase
        .from('projects')
        .select()

      if (data) {
        allProjects.value = data
      }
    } catch (e) {
      console.error(e)
    } finally {
      projectsLoading.value = false
    }
  }

  async function createNewProject(newProjectData: Record<string, any>) {
    try {
      const { error } = await supabase
        .from('projects')
        .insert(newProjectData)

      await getAllProjects()

      if (error) console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteProject(id: number) {
    try {
      await supabase
        .from('projects')
        .delete()
        .eq('id', id)
    } catch (error) {
      console.error(error)
    } finally {
      await getAllProjects()
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

  async function updateSingleTicketField(field: string, newVal: string, ticketId: string, projectId: string) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ [field]: newVal })
        .eq('id', ticketId)

      await getTicketsForProject(projectId)

      if (error) console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  async function createNewTicket(newTicketData: Record<string, any>) {
    try {
      const { error } = await supabase
        .from('tasks')
        .insert(newTicketData)

      await getTicketsForProject(newTicketData.project_id)

      if (error) console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTicketData(updatedData: Record<string, any>) {
    try {
      const {error} = await supabase
        .from('tasks')
        .update(updatedData)
        .eq('id', updatedData.id)

      await getTicketsForProject(updatedData.project_id)

      if (error) console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteTicket(id: number, projectId: string) {
    try {
      await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
    } catch (error) {
      console.error(error)
    } finally {
      await getTicketsForProject(projectId)
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
    } finally {
      window.location.reload()
    }
  }

  return {
    allProjects,
    projectData,
    ticketsLoading,
    projectsLoading,
    getAllProjects,
    createNewProject,
    deleteProject,
    resetTicketData,
    getTicketsForProject,
    updateSingleTicketField,
    updateTicketData,
    createNewTicket,
    deleteTicket,
    resetDemoData }
})
