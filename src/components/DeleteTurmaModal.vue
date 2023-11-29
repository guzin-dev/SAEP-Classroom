<script setup>
import { ref } from 'vue';

const turma = ref({});

const emit = defineEmits(['close', 'remove']);
const props = defineProps({ turma: Object });

const deleteTurma = () => {
  emit('remove');
  emit('close');
};

turma.value = props.turma;
</script>

<template>
  <main class="bg-black bg-opacity-50 w-screen h-screen absolute z-10 flex items-center justify-center">
    <div class="bg-white rounded-md p-6 flex flex-col w-96">
      <div class="flex justify-between">
        <p class="font-semibold">Remover turma</p>
        <p @click="$emit('close')" class="font-materialIcons cursor-pointer hover:text-red-600">close</p>
      </div>
      <div class="w-full my-4 h-[1px] bg-gray-300"></div>
      <p>
        Tem certeza que deseja remover a turma: <b>{{ turma.nome }}</b
        >?
      </p>
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
          @click="deleteTurma"
        >
          Confirmar
        </button>
      </div>
    </div>
  </main>
</template>
