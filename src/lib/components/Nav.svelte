<script>
  const openDrawer = () => {
    console.log("open drawer");
  }
</script>

<div class="flex justify-between h-20 px-8 py-5 bg-black">
  <div class="text-white align-middle scale-150 mt-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" on:click={openDrawer}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </div>
  <h1 class="text-white text-xl align-middle mt-1">jam.brussels</h1>
</div>