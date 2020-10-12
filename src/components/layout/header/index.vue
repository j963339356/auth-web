<!--  -->
<template>
    <div class="header">
      <div class="left">
        <slot name="left">
          <Logo></Logo>
        </slot>
      </div>
      <div class="center">
      <slot name="center">
        中间的功能
      </slot>
      </div>
      <div class="right">
        <slot name="right">
          <Right></Right>
        </slot>
      </div>
    </div>
</template>

<script>
import Logo from './left/Logo';
import Right from './right/index';

export default {
  name: "HeaderLayout",
  components: {
    Logo,
    Right
  },

  data() {
    return {
    };
  },

  methods: {},

  computed: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
$leftWidth: 200px;
$centerWidth: 50%;
$rightWidth: 20%;

.header {
    & .center{
      // width: $centerWidth;
      flex-grow: 1;
      overflow: hidden;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>