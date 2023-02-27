<template>
  <div 
  @click="handleToggle"
  class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray">
    <div class="flex items-center justify-between mb-8 w-full">
        <badge :type="feedback.type"/>
        <span>{{feedback.creatAt}}</span>
    </div>
  </div>
</template>

<script>
import Badge from './Badge.vue'
export default {
    components:{
        badge
    },
    props:{
        feedback: { type: Object, required: true },
    },
    setup(){
        function handleToggle(){

        }
        return{
            handleToggle
        }
    }
}
</script>
