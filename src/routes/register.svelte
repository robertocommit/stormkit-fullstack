<script lang="ts">
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let error = '';

  async function handleSubmit() {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      goto('/login');
    } else {
      error = data.error;
    }
  }
</script>

<h1>Register</h1>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} required>
  </div>
  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required>
  </div>
  <button type="submit">Register</button>
</form>

{#if error}
  <p class="error">{error}</p>
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
