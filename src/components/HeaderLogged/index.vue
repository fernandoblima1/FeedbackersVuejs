<template>
  <div class="w-full bg-brand-main flex justify-center">
    <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
      <div class="w-28 lg:w-36">
        <img class="w-full" src="../../assets/img/logo_white.png" alt="Logo feedbackers">
      </div>
      <div class="flex justify-center items-center">
        <a class="font-bold text-white py-2 px-4 focus:outline-none" href="/credentials">credenciais</a>
        <a class="font-bold text-white py-2 px-4 mr-2  focus:outline-none" href="/feedbacks">feedbacks</a>
        <button @click="loggout" class="bg-white font-bold text-brand-main py-2 px-6 rounded-full focus:outline-none">
          <span>{{loggoutLabel}}</span> 
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'
export default {
  setup(){
    const router = useRouter()
    const store  = useStore('User')
    const loggoutLabel = computed(()=>{
      if(!store.currentUser.name){
        return '...'
      }
      return `${store.currentUser.name} (sair)`
    })
    function loggout(){
      window.localStorage.setItem('token', '')
      router.push({
        path: '/'
      })
    }
    return {
      loggout,
      loggoutLabel
    }
  }
}
</script>
