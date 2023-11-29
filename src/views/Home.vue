<script setup>
import TopBar from '../components/TopBar.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import CriarTurmaModal from '../components/CriarTurmaModal.vue';
import DeleteTurmaModal from '../components/DeleteTurmaModal.vue';

const router = useRouter();

const turmas = ref([]);
const professorLogado = ref({});
const showCreateTurmaModal = ref(false);
const showDeleteTurmaModal = ref(false);
const selectedTurma = ref({});

const getProfessor = () => {
  if (!localStorage.getItem('professorLogado')) return router.push({ path: '/' });

  professorLogado.value = JSON.parse(localStorage.getItem('professorLogado'));
};

const getTurmasDoProfessorLogado = () => {
  const handleTurmas = [];
  const handleLocalStorageTurmas = JSON.parse(localStorage.getItem('turmas'));
  handleLocalStorageTurmas.forEach((turma) => {
    if (turma.professorDono == professorLogado.value.email) handleTurmas.push(turma);
  });
  turmas.value = handleTurmas;
};

const createNovaTurma = (val) => {
  const handleLocalStorageTurmas = JSON.parse(localStorage.getItem('turmas'));
  let hasTurma = false;
  handleLocalStorageTurmas.forEach((turma) => {
    if (turma.professorDono == professorLogado.value.email && turma.nome == val.value) hasTurma = true;
  });
  if (hasTurma) return alert('Você não pode criar turmas com um nome repetido');

  handleLocalStorageTurmas.push({
    nome: val.value,
    professorDono: professorLogado.value.email,
    atividades: [],
  });
  localStorage.setItem('turmas', JSON.stringify(handleLocalStorageTurmas));
  getTurmasDoProfessorLogado();
};

const deleteTurma = () => {
  let handleLocalStorageTurmas = JSON.parse(localStorage.getItem('turmas'));
  handleLocalStorageTurmas = handleLocalStorageTurmas.filter((turma) => {
    if (turma.nome == selectedTurma.value.nome && turma.professorDono == professorLogado.value.email) return false;
    return true;
  });
  localStorage.setItem('turmas', JSON.stringify(handleLocalStorageTurmas));
  getTurmasDoProfessorLogado();
};

const openDeleteTurmaModal = (val) => {
  selectedTurma.value = val;
  showDeleteTurmaModal.value = true;
};

onMounted(() => {
  getProfessor();
  getTurmasDoProfessorLogado();
});
</script>

<template>
  <CriarTurmaModal
    @createNovaTurma="createNovaTurma"
    @close="showCreateTurmaModal = false"
    v-if="showCreateTurmaModal"
  />
  <DeleteTurmaModal
    @remove="deleteTurma"
    :turma="selectedTurma"
    @close="showDeleteTurmaModal = false"
    v-if="showDeleteTurmaModal"
  />
  <div class="h-16">
    <TopBar></TopBar>
  </div>
  <main class="p-12 flex flex-col gap-12">
    <div class="flex w-full justify-between">
      <p class="font-semibold text-2xl">Suas turmas 👨‍🏫</p>
      <button
        class="bg-green-600 text-white px-8 text-sm active:scale-90 transition-all hover:opacity-80 rounded-md p-2"
        @click="showCreateTurmaModal = true"
      >
        Cadastrar turma
      </button>
    </div>
    <table class="w-full border-collapse">
      <tr class="text-left">
        <th>Número</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
      <tr class="text-left border-t border-b" v-for="(turma, index) in turmas">
        <td>{{ index }}</td>
        <td>{{ turma.nome }}</td>
        <td class="flex gap-2">
          <p
            class="cursor-pointer hover:opacity-50 transition-all active:scale-90 font-materialIcons text-xl"
            title="Visualizar atividades"
            @click="$router.push({ path: `/atividades/${turma.nome}` })"
          >
            fact_check
          </p>
          <p
            class="cursor-pointer hover:opacity-50 transition-all active:scale-90 font-materialIcons text-xl"
            title="Excluir turma"
            @click="openDeleteTurmaModal(turma)"
          >
            delete
          </p>
        </td>
      </tr>
    </table>
  </main>
</template>
