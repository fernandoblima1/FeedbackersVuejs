<template>
  <div
  class="rounded-lg h-40 flex flex-col justify-end items-center bg-gray-100">
    <content-loader class="mt-3 rounded-lg" maxWidth="90%" height="30px" animationDuration="2.8s"/>
    <content-loader class="mt-3 rounded-lg" maxWidth="90%" height="30px" animationDuration="2.8s"/>
    <content-loader class="mt-3 rounded-lg" maxWidth="90%" height="30px" animationDuration="2.8s"/>
    <content-loader class="mt-3 rounded-lg" maxWidth="90%" height="30px" animationDuration="2.8s"/>
</div>
</template>

<script>
import contentLoader from '../../components/ContentLoader/index.vue'
export default {
    components:{
        contentLoader
    }
}
</script>

<style>

</style>