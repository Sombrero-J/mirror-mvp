<script lang="ts">
  export let text = "Default Text";
  export let type: "button" | "submit" | "reset" = "submit";
  export let style: "primary" | "secondary" = "primary";
  export let size: "small" | "large" = "large";
  export let disabled: boolean = false;
  export let onClick: () => void = () => {};
  export let ariaLabel: string = "";
</script>

<button
  class={`btn ${style} ${size}`}
  {type}
  on:click={onClick}
  aria-label={ariaLabel}
  {disabled}
>
  {text}
</button>

<style lang="scss">
  .btn {
    font-family: $ff-button;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    border: none;
    cursor: pointer;
  }

  .large {
    font-size: $fs-button-large;
    padding: 0.5em 1em;
  }

  .small {
    font-size: $fs-button-small;
    padding: 0.25em 0.5em;
  }

  .primary {
    color: $color-button-text-primary-idle;
    background: $color-button-primary-idle;
  }

  .primary:hover {
    color: $color-button-text-primary-hovered;
    background: none;
    box-shadow: 0px 0px 0px 1px $color-button-text-primary-hovered inset;
    transition: background 0.3s ease-out;
  }

  .secondary {
    color: $color-button-text-secondary-idle;
    background: none;
  }

  .secondary:hover {
    color: $color-button-text-secondary-hovered;
  }

  .secondary::after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background: black;
    transition: width 0.3s ease-out;
  }

  .secondary:hover::after {
    width: 100%;
  }
</style>
