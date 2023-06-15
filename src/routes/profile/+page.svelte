<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
  import { supabaseClient } from "$lib/supabase";
  import type { PageData } from './$types';
  import { Icon } from "@steeze-ui/svelte-icon";
  import { UserCircle } from "@steeze-ui/heroicons";

  type LogoutFormState = 'idle' | 'submitting' | Error | 'done';
  let state: LogoutFormState = 'idle'

  export let data: PageData;

  let { session, profile } = data;

</script>
 
<div class="flex flex-row mb-8 justify-between mx-4 items-center">
  <div>
    <h1 class="text-4xl font-bold">Your profile{#if session}, {profile?.username ? profile?.username : ''}{/if}
    </h1>
    <h2 class="text-lg text-cararra-900 font-bold">Feel free to edit your info</h2>
  </div>
  {#if profile?.avatar_url}
    <img src={profile?.avatar_url} class="w-16 h-16 mr-4" alt="your profile avatar"/>
  {:else} <Icon src={UserCircle} class="w-16 h-16 mr-4" />
  {/if}
</div>

<div class="flex flex-col mb-4 mx-4">
  <!-- Username -->
  <div class="flex flex-col w-full">
  <form
  method="POST"
  action="profile"
  >
    <label for="username" class="text-lg">Change username</label>
    <input type="text" name="username" id="username" value={data.profile?.username} required maxlength="32" minlength="3" class="p-2 mt-1 text-md border-cinnabar border-2 rounded-lg w-full bg-log-cabin">
    <button class="text-md border-cinnabar bg-log-cabin">Update</button>
  </form>
</div>
<p>username: {data.profile?.username}</p>
  <!-- Avatar stuff -->
  <h1>Change your avatar.</h1>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-cinnabar-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          aria-hidden="true"
          class="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          /></svg
        >
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Interact to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">WEBP, JPG (MAX. 1920x1080px)</p>
      </div>
      <input id="file" type="file" class="hidden" />
    </label>
  </div>
</div>

<div>
  <h1>Saved jam sessions</h1>
</div>

<div>
<!-- Logout -->
<form method="post" on:submit|preventDefault={async () => {
  try {
    state = 'submitting';
    let { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    state = 'done';
    await goto('/');
  } catch (error) {
    if (error instanceof Error) state = error;
    else state = new Error('Something went wrong logging you out.')
  }
}}>
<button disabled={state === 'submitting'}>Logout</button>
</form>
</div>