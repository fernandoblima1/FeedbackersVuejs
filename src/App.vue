<script>
import ModalFactory from './components/ModalFactory/index.vue'
import services from './services/index'
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { setCurrentUser } from './store/user'
export default{
  components: { ModalFactory },
  setup(){
    const router = useRouter()
    const route = useRoute()
    watch(() => route.path, 
      async () => {
        if(route.meta.hasAuth){
          const token = window.localStorage.getItem('token')
          if(!token){
            router.push({ name: 'home' })
            return
          }
          const { data } = await services.users.getMe();
          setCurrentUser(data)
        }
    })
  }
}
</script>

<template>
  <div>
    <ModalFactory/>
    <RouterView />
  </div>
</template>