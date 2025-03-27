import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.ts'

export const useUserStore = defineStore('user', () => {
  const currentUserAuthData = ref<Record<string, any>>([])
  const currentUserProfileData = ref<Record<string, any>>([])
  const allUsers = ref<Record<string, any>>([])

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

  async function getCurrentUser() {
    try {
      const { data: { user }} = await supabase.auth.getUser()
      if (user) {
        currentUserAuthData.value = user
      }
    } catch (error) {
      console.error(error)
    }

    try {
      const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', currentUserAuthData.value.id )

      if (data) {
        currentUserProfileData.value = data
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getUserList() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')

      if(data) {
        allUsers.value = data
      }

      if (error) {
        console.error(error)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return { currentUserAuthData, currentUserProfileData, allUsers, getUserList, logIn, getCurrentUser }
})
