import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.ts'

export const useUserStore = defineStore('user', () => {
  const currentUserAuthData = ref<Record<string, any>>([])
  const currentUserProfileData = ref<Record<string, any>>([])
  const allUsers = ref<Record<string, any>>([])
  const authDataLoading = ref<boolean>(true)
  const profileDataLoading = ref<boolean>(true)

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
      authDataLoading.value = true
      const { data: { user }} = await supabase.auth.getUser()
      if (user) {
        currentUserAuthData.value = user
      }
    } catch (error) {
      console.error(error)
    } finally {
      authDataLoading.value = false
    }

    try {
      profileDataLoading.value = true
      const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', currentUserAuthData.value.id )

      if (data) {
        currentUserProfileData.value = data
      }
    } catch (error) {
      console.error(error)
    } finally {
      profileDataLoading.value = false
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

  async function updateProfileData(field: string, data: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ [field]: data })
        .eq('id', currentUserAuthData.value.id )

      await getCurrentUser()

      if (error) console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    currentUserAuthData,
    authDataLoading,
    currentUserProfileData,
    profileDataLoading,
    allUsers,
    getUserList,
    logIn,
    getCurrentUser,
    updateProfileData,
  }
})
