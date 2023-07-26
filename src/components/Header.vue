<script lang="ts" setup>
import { ROUTE_NAME } from "@/router/routeName";
</script>

<template>
  <header>
    <nav class="mx-auto max-w-screen-xl bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
      <!-- <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"> -->
        <RouterLink :to="{ name: ROUTE_NAME.HOME }" class="flex items-center">
          <img
            class="h-6 sm:h-9 w-auto mr-3"
            alt="Vue logo"
            src="@/assets/logo.svg"
            width="125"
            height="125"
          />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-green-800"
            >vContact</span
          >
        </RouterLink>
      <!-- </div> -->
    </nav>
  </header>
</template>
