<script lang="ts">
  import Mirror from "$lib/components/logo/mirror.ai.svelte";
  import ImageUpload from "$lib/components/form/image-upload.svelte";
  import Button from "$lib/components/button.svelte";

  let page = 1;
  function nextStep() {
    page = page + 1;
    if (fullBodyImageURL) {
      console.log("Success: " + fullBodyImageURL);
    }
  }

  let fullBodyImageURL = "";
  let clothingImageURL = "";
</script>

<div class="logo">
  <Mirror />
</div>

<div class="big-container">
  {#if page == 1}
  <ImageUpload placeholder="Click To Upload Image" colour="yellow" bind:imageUrl = {fullBodyImageURL}>
    <svelte:fragment slot="label">
      <p>
        Upload A <span class={`highlight yellow`}>Full Body</span> Image
      </p>
    </svelte:fragment>
    <div slot="button" class="nav-button">
      <Button text="Next" type="button" style="primary" onClick={nextStep}/>
    </div>
  </ImageUpload>
  {:else if page == 2}
  <ImageUpload placeholder="Click To Upload Image" colour="orange">
    <svelte:fragment slot="label">
      <p>
        Upload A <span class={`highlight orange`}>Clothing</span> Image
      </p>
    </svelte:fragment>
    <div slot="button" class="nav-button">
      <Button text="Back" type="button" style="secondary" />
      <Button text="Next" type="button" style="primary" />
    </div>
  </ImageUpload>
  {/if}
</div>

<style lang="scss">
  .logo {
    width: 100%;
    position: absolute;
    bottom: 0.5rem;
    text-align: center;
  }

  .big-container {
    width: 100%;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .nav-button {
    display: flex;
    justify-content: space-between;
  }

  .highlight {
    font-weight: 700;
  }

  .highlight.yellow {
    color: $color-form-heading-highlight-yellow;
  }

  .highlight.orange {
    color: $color-form-heading-highlight-orange;
  }
</style>
