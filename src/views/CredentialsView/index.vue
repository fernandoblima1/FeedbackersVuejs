<template>
  <div>
    <HeaderLogged />
    <div class="flex flex-col bg-brand-gray justify-center items-center h-64 w-full">
      <h1 class="text-gray-800 text-center font-black text-5xl">Credenciais</h1>
      <p class="text-gray-800 text-center font-regular text-lg">Guia de instalação e geração de suas credenciais</p>
    </div>
    <div class="flex justify-center w-full h-full mb-36">
      <div class="w-4/5 max-w-6xl flex flex-col">

        <h1 class="text-gray-700 font-black text-3xl py-8">Instalação e configuração</h1>

        <p class="text-gray-700 font-regular mt-5 text-lg ">Este aqui é a sua chave de api</p>

        <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded mt-1"
        maxWidth="840px"
        minWidth="50px"
        height="50px"
        />

        <div v-else class="flex justify-between py-3 mt-1 pl-10 pr-5 lg:w-3/4 w-full bg-gray-100 rounded-lg">

          <span v-if="!state.hasErrors" class="font-medium text-gray-700">{{apiKey}}</span>
          <span v-else class="font-medium text-gray-700">Erro ao carregar a chave da API</span>
          <div v-if="!state.hasErrors" class="flex">
            <Icon @click="handleCopy" class="mr-4 cursor-pointer" name="copy" color="#A9A9A9"/>
            <Icon @click="loadNewApiKey" name="loading" class="cursor-pointer" color="#A9A9A9"/>
          </div>

        </div>

        <p class="text-gray-700 font-regular mt-10 text-lg">Coloque o script abaixo no seu site para começar a receber feedbacks</p>

        <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded mt-1"
        maxWidth="840px"
        minWidth="50px"
        height="50px"
        />

        <div v-else class="flex justify-between pl-10 mt-1 pr-5 py-3 lg:w-3/4 w-full overflow-x-auto bg-gray-100 rounded-lg ">
          <span v-if="state.hasErrors">Erro ao carregar o script</span>
          <pre v-else class="font-medium text-gray-700">&lt;script src:"https://fernandoblima1-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged/index.vue'
import Icon from '../../components/Icon/index.vue'
import ContentLoader from '../../components/ContentLoader/index.vue'
import useStore from '../../hooks/useStore'
import { setApiKey } from '../../store/user'
import {computed, reactive, watch} from 'vue'
import services from '../../services/index'
import {useToast} from 'vue-toastification'
export default {
  components:{
    HeaderLogged,
    ContentLoader,
    Icon
  },
  setup(){
    const store = useStore();
    const toast = useToast()

    watch(()=>{
      store.User.currentUser
    }, () => {
      if(!store.User.currentUser.apiKey && !store.Global.isLoading){
        state.hasErrors = true;
        handleError(true)
      }
    })

    const state = reactive({
      isLoading: false,
      hasErrors: false
    })
    
    function handleError(error){
      state.isLoading = false
      state.hasErrors = !!error
    }

    async function handleCopy(){
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    async function loadNewApiKey(){
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()
        console.log(data)
        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    const apiKey = computed(()=>{
      if(!store.User.currentUser.apiKey){
        return '...'
      }
      return store.User.currentUser.apiKey
    })
    return{
      loadNewApiKey,
      handleError,
      handleCopy,
      apiKey,
      store,
      state
    }
  }
}
</script>

<style>

</style>