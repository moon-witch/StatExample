import {ref} from "vue";

export const useNavbar = () => {
  const navOpen = ref(true)

  const toggleNav = () => {
    navOpen.value = !navOpen.value
  }

  return {
    navOpen,
    toggleNav,
  }
}
