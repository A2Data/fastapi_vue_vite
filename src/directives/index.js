import { useUserStore } from '@/store/user'

function hasPermission(roles) {
  const userStore = useUserStore()
  const currentRole = userStore.userInfo.role?.code
  if (!currentRole || !roles.includes(currentRole)) {
    return false
  }
  return true
}

export const pmsBtn = {
  mounted(el, binding) {
    if (!binding.value) return
    const roles = [binding.value].flat()
    if (!hasPermission(roles)) {
      el.remove()
    }
  },
}
