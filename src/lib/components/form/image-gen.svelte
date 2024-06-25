<script lang="ts">
  export let imageUrl = "";
  export let support = "Default Support Text";
</script>

<div class="gen-container">
  <div class="caption">
    <slot name="label">Insert Label Here</slot>
    <span class="support">
      {support}
    </span>
  </div>
  <div class="box-button">
    <div class="gen-box">
      {#if imageUrl}
        <img src={imageUrl} alt="Virtual Try On" class="uploaded-img" />
      {:else}
        <p class="placeholder">"Generating..."</p>
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

  .caption {
    max-width: 25rem;
    font-family: $ff-form-heading;
    font-size: $fs-form-heading-small;
    line-height: normal;
  }

  .support {
    color: $color-form-support;
    font-size: $fs-heading-xxxxs;
  }

  .gen-container {
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

  .gen-box {
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

  .placeholder {
    color: $color-form-imagebox-gray;
    font-size: $fs-heading-xxs;
    font-weight: 300;
    position: absolute;
  }

  @media (min-width: $medium-screen) {
    .gen-container {
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
    .gen-container {
      flex-direction: row;
      gap: $lg-gap;
    }

    .caption {
      font-size: $fs-form-heading-large;
    }

    .gen-box {
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
