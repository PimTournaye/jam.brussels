<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1 class="text-5xl">Something clearly went wrong!</h1>
<h2 class="text-xl">Here's what happened according to the server:</h2>
<h1>{$page.status}: {$page.error?.message}</h1>