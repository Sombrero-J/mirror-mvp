<script lang="ts">
  export let colour = "yellow";
  export let placeholder = "Default Placeholder";
</script>

<div class="upload-container">
  <label for="imageUpload" class="caption">
    <h1>Upload A <span class="highlight">Full Body</span> Image</h1>
    <span class="support"
      >It works best if the shape of your body is visible</span
    >
  </label>
  <div class={`upload-box ${colour}`}>
    <input type="file" id="imageUpload" class="image-input" accept="image/*" />
    <p class="placeholder">{placeholder}</p>
  </div>
</div>

<style lang="scss">
  $border-radius: 0.3rem;
  $small-gap: 1.5rem;
  $lg-gap: 5rem;

  .caption {
    outline: 1px solid red;
    max-width: 25rem;
  }

  h1 {
    font-family: $ff-form-heading;
    font-size: $fs-form-heading-small;
  }

  .highlight {
    color: $color-form-heading-highlight;
  }

  .support {
    color: $color-form-support;
    font-size: $fs-heading-xxxxs;
  }

  .upload-container {
    outline: 1px solid green;
    font-family: $ff-form-body;
    min-width: calc(100% - 4rem);
    padding: 0 2rem; 
    // height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $small-gap;
  }

  .upload-box {
    position: relative;

    display: flex;
    height: 23rem;
    min-width: 20rem;
    max-width: 40rem;
    justify-content: center;
    align-items: center;

    border-radius: $border-radius;
    border: 3px solid $color-form-imagebox-border-yellow;
    background: $color-form-imagebox-background-yellow;
  }

  .image-input {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
  }

  .placeholder {
    color: $color-form-imagebox-yellow;
    font-size: $fs-heading-xxs;
    font-weight: 500;
  }

  @media (min-width: $large-screen) {
    .upload-container {
      flex-direction: row;
      gap: $lg-gap;
    }

    h1 {
      font-size: $fs-form-heading-large;
    }

    .upload-box {
      height: 40rem;
      min-width: 35%;
    }

    .support {
      font-size: $fs-heading-xxs;
    }

    .placeholder {
      font-size: $fs-heading-md;
    }
  }
  @media (min-width: $medium-screen) {
    .upload-container {
      flex-direction: row;
      gap: $lg-gap;
    }

    h1 {
      font-size: $fs-form-heading-medium;
    }

    .placeholder {
      font-size: $fs-heading-sm;
    }
  }
</style>
