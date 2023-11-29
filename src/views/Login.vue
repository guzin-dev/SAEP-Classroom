<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const professoresList = ref([]);
const email = ref('');
const password = ref('');

professoresList.value = JSON.parse(localStorage.getItem('professores'));

if (localStorage.getItem('professorLogado')) router.push({ path: '/home' });

const login = () => {
  let hasFindedEmail = false;
  let hasLoginOccurred = false;
  professoresList.value.forEach((professor) => {
    if (professor.email == email.value) {
      hasFindedEmail = true;
      if (professor.senha == password.value) {
        hasLoginOccurred = true;
        alert('Login realizado com sucesso!');
        localStorage.setItem('professorLogado', JSON.stringify(professor));
        router.push({ path: '/home' });
      }
    }
  });
  if (!hasFindedEmail) return alert('E-mail não cadastrado');
  if (!hasLoginOccurred) return alert('E-mail ou senha incorretos');
};
</script>

<template>
  <main class="w-screen h-screen flex flex-col items-center justify-center">
    <div class="flex gap-2 font-semibold text-sm items-center m-4 bg-gray-100 p-4 rounded-full">
      <img src="classroom.svg" />
      <p>Classroom</p>
    </div>
    <div class="flex flex-col gap-1 items-center border rounded-md p-5 border-gray-300">
      <p class="font-bold text-2xl tracking-tighter">Bem-vindo</p>
      <p class="text-sm tracking-tighter">Faça seu login para acessar suas turmas</p>
      <div class="w-full my-4 h-[1px] bg-gray-300"></div>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border-gray-300 border rounded-md p-2 w-full"
        @keyup.enter="login"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="border-gray-300 border rounded-md p-2 w-full"
        @keyup.enter="login"
      />
      <div class="w-full my-4 h-[1px] bg-gray-300"></div>
      <button
        @click="login"
        class="w-full text-white bg-green-600 text-sm active:scale-90 transition-all hover:opacity-80 rounded-md p-2"
      >
        Continuar
      </button>
    </div>
  </main>
</template>
