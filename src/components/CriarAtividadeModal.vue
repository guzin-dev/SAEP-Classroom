<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const emit = defineEmits(['close', 'createNovaAtividade']);

const create = () => {
  if (!name.value) return alert('De um nome para esta atividade');
  emit('createNovaAtividade', name);
  emit('close');
};
</script>

<template>
  <main class="bg-black bg-opacity-50 w-screen h-screen absolute z-10 flex items-center justify-center">
    <div class="bg-white rounded-md p-6 flex flex-col w-96">
      <div class="flex justify-between">
        <p class="font-semibold">Cadastrar nova atividade</p>
        <p @click="$emit('close')" class="font-materialIcons cursor-pointer hover:text-red-600">close</p>
      </div>
      <div class="w-full my-4 h-[1px] bg-gray-300"></div>
      <input
        v-model="name"
        type="text"
        placeholder="Nome da atividade"
        class="border-gray-300 border rounded-md p-2 w-full"
      />
      <div class="w-full my-4 h-[1px] bg-gray-300"></div>
      <div class="flex gap-2">
        <button
          class="w-full text-green-600 border border-green-600 text-sm active:scale-90 transition-all hover:opacity-80 rounded-md p-2"
          @click="$emit('close')"
        >
          Cancelar
        </button>
        <button
          class="w-full text-white bg-green-600 text-sm active:scale-90 transition-all hover:opacity-80 rounded-md p-2"
          @click="create"
        >
          Criar
        </button>
      </div>
    </div>
  </main>
</template>
