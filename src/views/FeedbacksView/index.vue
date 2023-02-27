<template>
  <div>
    <HeaderLogged />
    <div class="flex flex-col bg-brand-gray justify-center items-center h-64 w-full">
      <h1 class="text-gray-800 text-center font-black text-5xl">Feedbacks</h1>
      <p class="text-gray-800 text-center font-regular text-lg">Detalhes de todos os feedbacks recebidos</p>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-4/5 grid grid-cols-4 gap-2 mt-8">
        <div>
          <h1 class="text-3xl font-black text-gray-800">Listagem</h1>
          <suspense>
            <template #default>
              <Filters class="mt-8 animate__animated animate__fadeIn animate__faster"/>
            </template>
            <template #fallback>
              <FiltersLoading class="mt-8"/>
            </template>
          </suspense>
        </div>
        <div class="px-10 mt-16 py-1 mb-40 col-span-3">
          <span>
            <p v-if="state.hasErrors" class="text-lg text-center text-gray-800 font-bold">Aconteceu um erro ao carregar os Feedbacks</p>
            <p v-if="!state.feedbacks.length && !state.isLoading" class="text-lg text-center text-gray-800 font-bold">Ainda não há nenhum feedback</p>

            <feedbacks-card-loading v-if="state.isLoading"/>
            <feedbacks-card v-else v-for="(feedback, index) in state.feedbacks"
              :key="feedback.id"
              :is-opened="index === 0"
              :feedback="feedback"
              class="mb-8"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import FeedbacksCardLoading from '../../components/FeedbackCard/FeedbackCardLoading.vue'
import FeedbacksCard from '../../components/FeedbackCard/FeedbackCard.vue'
import HeaderLogged from '../../components/HeaderLogged/index.vue'
import Filters from './filters.vue'
import FiltersLoading from './filtersLoading.vue'
import services from '../../services'
export default {
  components:{
    HeaderLogged,
    FiltersLoading,
    FeedbacksCard,
    FeedbacksCardLoading,
    Filters
  },
  setup(){
    const state = reactive({
      hasErrors: false,
      isLoading: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0
      }
    })
    function handleErrors(error){

    }
    async function fetchFeedbacks(){
      try {
        state.isLoading = true
        const data = await services.feedbacks.getAll({
          type: currentFeedbackType, ...pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false

      } catch (error) {
        
      }
    }
    return{
      state
    }
  }
}
</script>

<style>

</style>