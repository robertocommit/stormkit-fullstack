<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let isLoggedIn = false;

  onMount(() => {
    isLoggedIn = !!localStorage.getItem('token');
  });

  function logout() {
    localStorage.removeItem('token');
    isLoggedIn = false;
    goto('/login');
  }
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    {#if isLoggedIn}
      <li><button on:click={logout}>Logout</button></li>
    {:else}
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    {/if}
  </ul>
</nav>

<main>
  <slot />
</main>

<style>
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 1rem;
  }
</style>
