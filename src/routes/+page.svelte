<script lang="ts">
  import Mirror from "$lib/components/logo/mirror.ai.svelte";
</script>

<div class="logo">
  <Mirror />
</div>

<div class="upload-container">
  <label for="imageUpload">
    <h1>Upload A <span class="highlight">Full Body</span> Image</h1>
    It works best if the shape of your body is visible
  </label>
  <div class="upload-box">
    <input type="file" id="imageUpload" class="image-input" accept="image/*" />
    <p class="placeholder">Click To Upload Image</p>
  </div>
</div>

<style lang="scss">
  $border-radius: 0.3rem;
  
  .upload-container {
    outline: 1px solid $color-primary;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.875rem;
  }

  .upload-box {
    display: flex;
    height: 23rem;
    width: 22rem;
    justify-content: center;
    align-items: center;

    border-radius: $border-radius;
    border: 1.422px solid var(--background-accent-yellow-bolder, #d6960c);
    background: var(--background-accent-yellow-subtlest, #fff8ea);
    backdrop-filter: blur(0.9479034543037415px);
  }

  .image-input {
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
    position: absolute;
  }

  @media (min-width: 1024px) {
    .upload-container {
      flex-direction: row;
    }
  }

  .logo {
    outline: 1px solid blue;
    // display: inline-block;
    position: absolute;
    bottom: 0.5rem;
    margin: 0 auto;
  }
</style>
