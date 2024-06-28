<script lang="ts">
  import Mirror from "$lib/components/logo/mirror.ai.svelte";
  import ImageUpload from "$lib/components/form/image-upload.svelte";
  import ImageGen from "$lib/components/form/image-gen.svelte";
  import Button from "$lib/components/button.svelte";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let page = 1;

  function nextStep() {
    page = page + 1;
  }

  function prevStep() {
    page = page - 1;
  }

  let fullBodyImageURL: string;
  let clothingImageURL: string;
  let fullBodyImageName: string;
  let clothingImageName: string;
</script>

<div class="logo">
  <Mirror />
</div>

<div class="big-container">
  {#if page == 1}
    <ImageUpload
      placeholder="Click To Upload Image"
      support="It works best if the shape of your body is visible"
      colour="yellow"
      name="fullBodyImage"
      required={true}
      bind:imageUrl={fullBodyImageURL}
      bind:imageName={fullBodyImageName}
    >
      <svelte:fragment slot="label">
        <p>
          Upload A <span class={`highlight yellow`}>Full Body</span> Image
        </p>
      </svelte:fragment>
      <div slot="button" class="nav-button">
        <div></div>
        <Button
          text="Next"
          type="button"
          style="primary"
          onClick={nextStep}
          disabled={!fullBodyImageURL}
        />
      </div>
    </ImageUpload>
  {:else if page == 2}
    <ImageUpload
      placeholder="Click To Upload Image"
      support="Only front side of the clothing is needed"
      colour="orange"
      name="clothingImage"
      required={true}
      bind:imageUrl={clothingImageURL}
      bind:imageName={clothingImageName}
    >
      <svelte:fragment slot="label">
        <p>
          Upload A <span class={`highlight orange`}>Clothing</span> Image
        </p>
      </svelte:fragment>
      <div slot="button" class="nav-button">
        <Button
          text="Back"
          type="button"
          style="secondary"
          onClick={prevStep}
        />
        <form
          class="form-container"
          method="post"
          action="?/tryon"
          use:enhance={() => {
            nextStep();
          }}
        >
          <input
            type="hidden"
            name="fullBodyImageURL"
            value={fullBodyImageURL}
            required
          />
          <input
            type="hidden"
            name="clothingImageURL"
            value={clothingImageURL}
            required
          />
          <input
            type="hidden"
            name="fullBodyImageName"
            value={fullBodyImageName}
            required
          />
          <input
            type="hidden"
            name="clothingImageName"
            value={clothingImageName}
            required
          />
          <Button
            text="Try On"
            type="submit"
            style="primary"
            disabled={!clothingImageURL}
          />
        </form>
      </div>
    </ImageUpload>
  {/if}
  {#if page === 3}
    <ImageGen support="Please wait a few moments..." 
    {#if form?.success}
      imageUrl={form?.message}
    {/if}
  >
      <svelte:fragment slot="label">
        <p>
          Virtual <br /><span class={`highlight orange`}>Try On</span> Generation
        </p>
      </svelte:fragment>
      <div slot="button" class="nav-button">
        <Button
          text="Back"
          type="button"
          style="secondary"
          onClick={prevStep}
        />
        <Button text="Share" type="button" style="primary" />
      </div>
    </ImageGen>
    {#if form?.success}
      <p>Successful {form.message}</p>
    {/if}
  {/if}
</div>

<style lang="scss">
  // .form-container {
  //   width: 100%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
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
