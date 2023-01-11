<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
  import { supabase } from "$lib/db/supabaseClient";
  import type { PageData } from './$types';

  type LogoutFormState = 'idle' | 'submitting' | Error | 'done';
  let state: LogoutFormState = 'idle'

  export let data: PageData;
</script>
 
<h1>Your profile.</h1>

<form
method="POST"
action="profile"
>
  <label for="username">Change username.</label>
  <input type="text" name="username" id="username" value={data.profile?.username} required maxlength="32" minlength="3">
  <button>Update</button>
</form>
<p>Name: {data.profile?.username}</p>

<h1>Change your username</h1>

<h1>Change your avatar.</h1>

<form method="post" on:submit|preventDefault={async () => {
  try {
    state = 'submitting';
    let { error } = await supabase.auth.signOut();
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