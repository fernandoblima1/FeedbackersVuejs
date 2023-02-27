<template>
  <span class="rounded-full p-2 text-cs font-black uppercase text-white">
    :class="`bg-color`"
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'
export default {
    props:{
        type: {
            type: String, required: true
        }
    },
    setup(props){
        const label = computed(() => {
            if(props.type === 'ISSUE'){
                return 'problema'
            }
            if(props.type === 'IDEA'){
                return 'ideia'
            }
            return 'outro'
        })
        const color = computed(() => {
            if(props.type === 'ISSUE'){
                return 'brand-danger'
            }
            if(props.type === 'IDEA'){
                return 'brand-warning'
            }
            return 'brand-graydark'
        })
        return{
            label,
            color
        }
    }
}
</script>

<style>

</style>