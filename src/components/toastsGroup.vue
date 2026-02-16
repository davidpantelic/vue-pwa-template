<script setup lang="ts"></script>

<template>
  <Toast group="upToDateToastGroup" position="bottom-right" />

  <Toast
    group="screenWakeLockToastGroup"
    success-icon="pi pi-lightbulb"
    position="bottom-right"
  />

  <Toast
    group="notificationsToastGroup"
    success-icon="pi pi-bell"
    position="bottom-right"
  />
</template>
