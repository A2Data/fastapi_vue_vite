<template>
  <n-modal
    v-model:show="show"
    :title="'TODO - ' + formModel.date"
    preset="card"
    size="huge"
    class="w-600"
    :bordered="false"
  >
    <n-form
      ref="formRef"
      label-placement="left"
      require-mark-placement="left"
      :label-width="80"
      :model="formModel"
    >
      <n-form-item label="TODO" path="do" :rule="required">
        <n-input v-model:value="formModel.do" />
      </n-form-item>

      <n-form-item label="已完成" path="done">
        <n-switch v-model:value="formModel.done">
          <template #checked>是</template>
          <template #unchecked>否</template>
        </n-switch>
      </n-form-item>
    </n-form>
    <template #footer>
      <footer flex justify-end>
        <slot name="footer">
          <n-button @click="show = false">取消</n-button>
          <n-button class="ml-20" type="primary" @click="onSave">保存</n-button>
        </slot>
      </footer>
    </template>
  </n-modal>
</template>

<script setup>
const show = ref(false)
const modalAction = ref('')
const required = {
  required: true,
  message: '此为必填项',
  trigger: ['blur', 'change'],
}

const emit = defineEmits(['refresh'])
const formRef = ref(null)
const formModel = ref({})
function onSave() {
  formRef.value?.validate(async (err) => {
    if (err) return
    // TODO 掉接口保存todo数据，保存之后刷新日历的todo数据
    $message.success('保存成功')
    emit('refresh')
    show.value = false
  })
}

function handleOpen(action, row) {
  modalAction.value = action
  show.value = true
  formModel.value = row
  if (action === 'add') {
    formModel.value.done = false
  }
}
defineExpose({
  handleOpen,
})
</script>
