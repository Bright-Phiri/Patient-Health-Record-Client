<template>
  <div class="container-fluid">
        <div class="row">
          <div class="col-3">
             <slot name="profile"></slot>
          </div>
          <div class="col-9">
            <slot name="page-content"></slot>
          </div>
        </div>
  </div>
</template>

<style>

</style>

<script>
export default {
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
