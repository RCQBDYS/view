<template>
  <div class="dashboard-container">
    <el-card shadow="always" style="height: 400px;text-align: center;font-size: xx-large;line-height: 300px">
      欢迎使用测试综合平台
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
