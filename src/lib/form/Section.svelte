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
    <p>{description}</p>
    <slot />
  </div>
</section>

<style>
  .title {
    position: relative;
    margin-right: auto;
  }

  section {
    position: relative;
  }

  h2, .content {
    width: fit-content;
    padding-left: 2rem;
  }

  .line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    
    width: 1rem;
    height: 2px;
    
    background: var(--red);
  }
</style>