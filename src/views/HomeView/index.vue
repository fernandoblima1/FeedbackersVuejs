<template>
  <div>
    <costum-header
    @create-account="handleAccountCreate"
    @login="handleLogin"
    />
    <contact/>
    <div class="flex py-10 justify-center bg-brand-gray">
      <p class="font-medium text-center text-gray-800">feedbacker © 2023</p>
    </div>
  </div>
</template>

<script>
import CostumHeader from './costumHeader.vue'
import Contact from './contact.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useModal from '../../hooks/useModal'
export default {
  components: {
    CostumHeader,
    Contact
  },
  setup(){

    const router = useRouter();
    const modal = useModal();
    onMounted(() => {
      const token = window.localStorage.getItem('token');

      if(token){
        router.push({name: 'feedbacks'});
      }
    });
    function handleLogin(){
      modal.open({
        component: 'ModalLogin'
      })
    };
    function handleAccountCreate(){
      modal.open({
        component: 'ModalCreateAccount'
      })
    };
    return{
      handleAccountCreate,
      handleLogin
    }
  }
}
</script>

<style>

</style>