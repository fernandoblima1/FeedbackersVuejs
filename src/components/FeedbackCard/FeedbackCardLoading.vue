<template>
    <div class="rounded-lg flex flex-col justify-center items-center py-8 bg-gray-100">
        <div class="w-11/12 flex justify-between items-center">
            <content-loader class="mt-3 rounded-lg" maxWidth="10%" height="30px" animationDuration="1.8s"/>
            <content-loader class="mt-3 rounded-lg" maxWidth="20%" height="30px" animationDuration="1.8s"/>
        </div>
        <div class="w-11/12 flex justify-start flex-col">
            <content-loader class="mt-3 rounded-lg" maxWidth="100%" height="30px" animationDuration="1.8s"/>
            <content-loader class="mt-3 rounded-lg" maxWidth="70%" height="30px" animationDuration="1.8s"/>
            <content-loader class="mt-3 rounded-lg" maxWidth="80%" height="30px" animationDuration="1.8s"/>
        </div>
    </div>
</template>

<script>
    import contentLoader from '../ContentLoader/index.vue'
    export default {
        components:{
            contentLoader
        }
    }
</script>

<style>

</style>