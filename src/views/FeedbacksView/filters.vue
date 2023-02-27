<template>
  <div class="w-full flex flex-col ">
    <h1 class="font-medium text-gray-800 text-xl">Filtros</h1>
    <div>
        <ul class="flex flex-col mt-3 list-none">
            <li
              v-for="filter in state.filters"
              :key="filter.label"
              :class="{
                'bg-gray-200 bg-opacity-50': filter.active
              }"
              @click="() => handleSelect(filter)"
              class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
            >
              <div class="flex items-center">
                <span
                  :class="filter.color.bg"
                  class="inline-block w-2 h-2 mr-2 rounded-full"/> {{ filter.label }}
              </div>
              <span
                :class="filter.active ? filter.color.text : 'text-brand-graydark'"
                class="font-bold"
              >
                {{ filter.amount }}
              </span>
            </li>
          </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import services from '../../services';
import useStore from '../../hooks/useStore'

const LABELS = {
    all: 'Todos',
    issue: 'Problemas',
    idea: 'Ideias',
    other: 'Outros'
}

const COLORS = {
    all: {text: 'text-brand-info', bg: 'bg-brand-info'},
    issue: {text: 'text-brand-danger', bg: 'bg-brand-danger'},
    idea: {text: 'text-brand-warning', bg: 'bg-brand-warning'},
    other:{text: 'text-brand-graydark', bg: 'bg-brand-graydark'}
}

export default {
    async setup(props, { emit }){
        const store = useStore('Global');
        const state = reactive({
            hasErrors: false,
            filters: [
                { label: null, amount: null }
            ]
        })

        function applyFilterStructure(data){
            return Object.keys(data).reduce((acc, cur) => {
                const currentFilter = {
                    label: LABELS[cur],
                    color: COLORS[cur],
                    amount: data[cur]
                }

                if(cur === 'all'){
                    currentFilter.active = true
                }else{
                    currentFilter.type = cur
                }

                return [
                    ...acc, currentFilter
                ]
            }, [])
        }

        try {
            const { data } = await services.feedbacks.getSummary()
            state.filters = applyFilterStructure(data)
        } catch (error) {
            state.hasErrors = !!error
        }

        function handleSelect({type}){
            if(store.isLoading){
                return
            }

            state.filters = state.filters.map((filter) => {
                if(filter.type === type){
                    return {...filter, active: true}
                }
                return {...filter, active: false}
            })

            emit('select', type)
        }
        
        return {
            state,
            handleSelect
        }
    }
}
</script>
