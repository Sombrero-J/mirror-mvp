<script lang="ts">
  import { enhance } from "$app/forms";

  let page = 1;

  function someFunction() {
    console.log("Form submitted here too");
  }
</script>

<form
  method="post"
  use:enhance={() => {
    page = page + 1;
  }}
>
  <label>
    Email
    <input name="email" type="email" required />
  </label>
  <label>
    Password
    <input name="password" type="password" required />
  </label>
  <button type="submit">Log in</button>
</form>

{#if page == 2}
  <p>Page 2</p>
{/if}