<template>
  <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-xl-3 col-md-3 col-sm-5">
             <slot name="profile"></slot>
          </div>
          <div class="col-lg-9 col-xl-9 col-md-9 col-sm-12">
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
