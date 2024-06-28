<script lang="ts">
  export let colour = "yellow";
  export let placeholder = "Default Placeholder";
  export let support = "Default Support Text";
  export let name = "";
  export let imageUrl = "";
  export let imageName = "";
  export let required = false;

  function handleFileChange(event: any) {
    imageUrl = URL.createObjectURL(event.target.files[0]);
    imageName = event.target.files[0].name;
  }
</script>

<div class="upload-container">
  <label for="imageUpload" class="caption">
    <slot name="label">Insert Label Here</slot>
    <span class="support">
      {support}
    </span>
  </label>
  <div class="box-button">
    <div class={`upload-box ${colour}`}>
      {#if imageUrl}
        <img src={imageUrl} alt="A Full Body" class="uploaded-img" />
      {:else}
        <input
          {name}
          type="file"
          id="imageUpload"
          class="image-input"
          accept="image/*"
          {required}
          on:change={handleFileChange}
        />
        <p class="placeholder">{placeholder}</p>
      {/if}
    </div>
    <slot name="button"></slot>
  </div>
</div>

<style lang="scss">
  $border-radius: 0.3rem;
  $small-gap: 1.5rem;
  $lg-gap: 5rem;

  .uploaded-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  // .caption {
  //   max-width: 25rem;
  // }

  .caption {
    max-width: 25rem;
    font-family: $ff-form-heading;
    font-size: $fs-form-heading-small;
  }

  .support {
    color: $color-form-support;
    font-size: $fs-heading-xxxxs;
  }

  .upload-container {
    font-family: $ff-form-body;
    max-width: calc(100% - 8rem);
    // padding: 0 2rem;
    // height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $small-gap;
  }

  .upload-box {
    position: relative;
    text-align: center;
    padding: 0 2rem;

    display: flex;
    height: 23rem;
    min-width: 10rem;
    max-width: 40rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;

    border-radius: $border-radius;
  }

  .upload-box.yellow {
    color: $color-form-imagebox-yellow;

    border: 3px solid $color-form-imagebox-border-yellow;
    background: $color-form-imagebox-background-yellow;
  }

  .upload-box.orange {
    color: $color-form-imagebox-orange;
    border: 3px solid $color-form-imagebox-border-orange;
    background: $color-form-imagebox-background-orange;
  }

  .image-input {
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .placeholder {
    font-size: $fs-heading-xxs;
    font-weight: 500;
    position: absolute;
  }

  @media (min-width: $medium-screen) {
    .upload-container {
      flex-direction: row;
      gap: $lg-gap;
    }

    .caption {
      font-size: $fs-form-heading-medium;
    }

    .placeholder {
      font-size: $fs-heading-sm;
    }
  }
  @media (min-width: $large-screen) {
    .upload-container {
      flex-direction: row;
      gap: $lg-gap;
    }

    .caption {
      font-size: $fs-form-heading-large;
    }

    .upload-box {
      height: 40rem;
      min-width: 30rem;
    }

    .support {
      font-size: $fs-heading-xxs;
    }

    .placeholder {
      font-size: $fs-heading-md;
    }
  }
</style>
