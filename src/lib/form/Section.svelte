<script lang='ts'>
  export let title: string;
  export let description: string;
</script>

<section>
  <div class="title">
    <div class="line" />
    <h2>{title}</h2>
  </div>
  <div class="content">
    <p>{@html description}</p>
    <slot />
  </div>
</section>

<style lang="postcss">
  .title {
    position: relative;
    margin-right: auto;
    font-weight: 500;
    font-size: 1.5rem;
  }

  section {
    position: relative;
    margin-bottom: 24px;
  }

  p {
    margin-bottom: 16px;
    font-size: 1rem;
    font-weight: 300;
  }

  h2, .content {
    width: fit-content;
    padding-left: 2rem;
    margin-right: 0;
    width: 100%;
  }

  .line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    
    width: 1rem;
    height: 2px;
    
    @apply bg-cinnabar;
  }
</style>