<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const professorLogado = ref({});

if (localStorage.getItem('professorLogado'))
  professorLogado.value = JSON.parse(localStorage.getItem('professorLogado'));

const logout = () => {
  localStorage.removeItem('professorLogado');
  router.push({ path: '/' });
};
</script>

<template>
  <main class="absolute h-16 bg-green-600 w-full flex items-center justify-between p-6">
    <p class="text-white font-semibold">{{ professorLogado.email }}</p>
    <button
      class="border-red-600 border text-white px-6 text-sm active:scale-90 transition-all hover:bg-red-500 rounded-md p-2"
      @click="logout"
    >
      Sair
    </button>
  </main>
</template>
