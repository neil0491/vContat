<script lang="ts" setup>
import { ROUTE_NAME } from "@/router/routeName";
</script>

<template>
  <header class="mx-auto max-w-screen-xl bg-white border-gray-200 px-4 lg:px-6 py-5">
    <nav class="w-max">
      <RouterLink :to="{ name: ROUTE_NAME.HOME }" class="flex items-center justify-start">
        <img
          class="h-10 sm:h-9 w-auto mr-3"
          alt="Vue logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-green-700"
          >vContact</span
        >
      </RouterLink>
    </nav>
  </header>
</template>
