<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import TopBar from '../components/TopBar.vue';
import CriarAtividadeModal from '../components/CriarAtividadeModal.vue';

const route = useRoute();
const router = useRouter();
const professorLogado = ref({});
const showCreateAtividadeModal = ref(false);
const atividades = ref([]);

const getProfessor = () => {
  if (!localStorage.getItem('professorLogado')) return router.push({ path: '/' });

  professorLogado.value = JSON.parse(localStorage.getItem('professorLogado'));
  getAtividadesDaTurmaDoProfessorLogado();
};

const getAtividadesDaTurmaDoProfessorLogado = () => {
  let handleLocalStorageTurmas = JSON.parse(localStorage.getItem('turmas'));
  handleLocalStorageTurmas = handleLocalStorageTurmas.filter(
    (turma) => turma.professorDono == professorLogado.value.email && turma.nome == route.params.nome,
  );
  atividades.value = handleLocalStorageTurmas[0].atividades;
};

const createNovaAtividade = (val) => {
  let handleAtividades = [];

  atividades.value.forEach((atividade) => {
    handleAtividades.push(atividade.nome);
  });

  handleAtividades.push(val.value);

  handleAtividades = handleAtividades.map((atividade) => ({ nome: atividade }));

  let handleLocalStorageTurmas = JSON.parse(localStorage.getItem('turmas'));
  handleLocalStorageTurmas = handleLocalStorageTurmas.filter((turma) => {
    if (turma.nome == route.params.nome && turma.professorDono == professorLogado.value.email) return false;
    return true;
  });
  localStorage.setItem('turmas', JSON.stringify(handleLocalStorageTurmas));

  handleLocalStorageTurmas = JSON.parse(localStorage.getItem('turmas'));
  handleLocalStorageTurmas.push({
    nome: route.params.nome,
    professorDono: professorLogado.value.email,
    atividades: handleAtividades,
  });
  localStorage.setItem('turmas', JSON.stringify(handleLocalStorageTurmas));
  getAtividadesDaTurmaDoProfessorLogado();
  showCreateAtividadeModal.value = false;
};

onMounted(() => {
  getProfessor();
});
</script>

<template>
  <CriarAtividadeModal
    @createNovaAtividade="createNovaAtividade"
    @close="showCreateAtividadeModal = false"
    v-if="showCreateAtividadeModal"
  />
  <div class="h-16">
    <TopBar></TopBar>
  </div>
  <main class="p-12 flex flex-col gap-12">
    <div class="flex w-full justify-between">
      <div class="flex items-center gap-1">
        <p @click="$router.push({ path: '/home' })" class="font-materialIcons cursor-pointer">arrow_back_ios</p>
        <p class="font-semibold text-2xl">Atividades da turma: {{ route.params.nome }} 👨‍🏫</p>
      </div>
      <button
        class="bg-green-600 text-white px-8 text-sm active:scale-90 transition-all hover:opacity-80 rounded-md p-2"
        @click="showCreateAtividadeModal = true"
      >
        Cadastrar atividade
      </button>
    </div>
    <table class="w-full border-collapse">
      <tr class="text-left">
        <th>Número</th>
        <th>Nome</th>
      </tr>
      <tr class="text-left border-t border-b" v-for="(atividade, index) in atividades">
        <td>{{ index }}</td>
        <td>{{ atividade.nome }}</td>
      </tr>
    </table>
  </main>
</template>
