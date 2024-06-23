<script lang="ts">
  import Mirror from "$lib/components/logo/mirror.ai.svelte";
  import ImageUpload from "$lib/components/form/image-upload.svelte";
  import Button from "$lib/components/button.svelte";
</script>

<div class="logo">
  <Mirror />
</div>

<div class="big-container">
  <ImageUpload />
  <Button text="Upload" style="secondary" />
</div>

<style lang="scss">
  .logo {
    width: 100%;
    position: absolute;
    bottom: 0.5rem;
    text-align: center;
  }

  .big-container {
    outline: 1px solid blue;
    width: 100%;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
