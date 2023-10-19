<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="mx-4 mt-8">

    <h1 class="text-5xl mb-4">Something clearly went wrong!</h1>
    <h2 class="text-xl mb-8">Don't worry, this is on us. Here's what happened on our end:</h2>
    {#if $page}
    <p class="text-xl italic">{$page.status}</p>
    <p class="text-xl italic">{$page.error?.message}</p>
    {/if}
</div>
