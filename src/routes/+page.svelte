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

<h1>Welcome to SvelteKit</h1>

{#if isLoggedIn}
  <p>You are logged in.</p>
  <button on:click={logout}>Logout</button>
{:else}
  <p>Please log in or register to continue.</p>
  <a href="/login">Login</a>
  <a href="/register">Register</a>
{/if}

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style>
  a, button {
    margin-right: 10px;
  }
</style>
