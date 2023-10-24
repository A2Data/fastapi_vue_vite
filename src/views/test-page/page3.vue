<template>
  <h1>测试按钮权限</h1>

  <div class="mt-12">
    <n-button v-pms-btn="'admin'" class="mx-4" type="success">新增</n-button>
    <n-button v-pms-btn="'admin'" class="mx-4" type="warning">修改</n-button>
    <n-button v-pms-btn="['admin', 'test']" class="mx-4" type="info">查询</n-button>
    <n-button v-pms-btn="'admin'" class="mx-4" type="error">删除</n-button>
  </div>

  <p class="mt-12">
    管理员拥有权限:
    <span class="text-red ml-12">新增、修改、查询、删除</span>
  </p>
  <p class="mt-4">
    测试员拥有权限:
    <span class="text-red ml-12">查询</span>
  </p>

  <p class="opacity-60 mt-12">请切换不同的角色尝试</p>
</template>
