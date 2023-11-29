<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  if (localStorage.getItem('professores')) return;
  const professores = [
    {
      email: 'admin@suporte.com',
      senha: 'admin123',
    },
    {
      email: 'ana@gmail.com',
      senha: 'ana123',
    },
    {
      email: 'danilo@gmail.com',
      senha: 'danilo123',
    },
  ];
  const turmasIniciais = [
    {
      nome: 'Turma 1 - ADMIN',
      professorDono: 'admin@suporte.com',
      atividades: [
        {
          nome: 'Atividade 1 - ADMIN',
        },
      ],
    },
    {
      nome: 'Turma 2 - ANA',
      professorDono: 'ana@gmail.com',
      atividades: [
        {
          nome: 'Atividade 1 - ANA',
        },
      ],
    },
    {
      nome: 'Turma 3 - DANILO',
      professorDono: 'danilo@gmail.com',
      atividades: [
        {
          nome: 'Atividade 1 - DANILO',
        },
      ],
    },
  ];
  localStorage.setItem('professores', JSON.stringify(professores));
  localStorage.setItem('turmas', JSON.stringify(turmasIniciais));
});
</script>

<template>
  <RouterView />
</template>
