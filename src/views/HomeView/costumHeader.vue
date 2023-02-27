<template>
  <div>
    <header class="header">
        <div class="header-group">
            <div class="flex items-center justify-between py-10">
                <div class="w-28 lg:w-36"> 
                    <img class="w-full" src="../../assets/img/logo_white.png" alt="Logotipo da feedbacker">
                </div>
                <div class="flex">
                    <button @click="()=>emit('create-account')" class="px-6 py-2 font-bold text-white focus:outline-none">
                        Criar uma conta
                    </button>
                    <button @click="()=> emit('login')" class="px-6 py-2 font-bold bg-white text-brand-main rounded-full focus:outline-none">
                        Entrar
                    </button>
                </div>
            </div>
            <div class="flex flex-col mt-28">
                <h1 class="text-4xl text-white font-black">
                    Tenha um feedback. <br>
                    E faça seus clientes mais<br class="hidden lg:inline-block">
                    felizes
                </h1>
                <p class="text-lg font-medium text-white">
                    Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
                    simples widget na página.
                </p>
                <div>
                    <button @click="()=>emit('create-account')"  class="px-6 py-2 mt-10 font-bold bg-white text-brand-main rounded-full focus:outline-none">
                        Crie uma conta grátis
                    </button>
                </div>
            </div>
        </div>
    </header>
  </div>
</template>

<script>
export default {
    setup(teste, {emit}){
        return {emit}
    }
}
</script>

<style lang="postcss" scoped>
.header{
    @apply bg-brand-main w-full flex justify-center;
    height: 700px;
}
.header-group{
    @apply flex flex-col max-w-6xl w-4/5;
}

@media (min-width: 640px){
    .header-group{
        background-image: url(../../assets/img/blue_balloons.png);
        background-size: 628px;
        background-position: 90% 100%;
        background-repeat: no-repeat;
    }
}
</style>