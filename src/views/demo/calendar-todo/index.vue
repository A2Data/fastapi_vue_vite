<template>
  <n-card>
    <n-calendar v-model:value="value" class="flex-shrink-0">
      <template #default="{ year, month, date }">
        <div v-if="getTodos(`${year}-${month}-${date}`)?.length > 0" class="h-full flex-col py-12">
          <component
            :is="item.done ? 'del' : 'span'"
            v-for="item in getTodos(`${year}-${month}-${date}`).slice(0, 1)"
            :key="item.id"
            class="hover:text-primary cursor-pointer"
            @click="handleEdit(`${year}-${month}-${date}`, item)"
          >
            {{ item.do }}
          </component>

          <n-popover
            v-if="getTodos(`${year}-${month}-${date}`).length > 1"
            trigger="click"
            placement="top-start"
          >
            <template #trigger>
              <span class="mt-auto text-gray-400 flex items-center">
                还有{{ getTodos(`${year}-${month}-${date}`).length - 1 }} 项
                <i
                  class="i-material-symbols:add ml-auto"
                  @click.stop="handleAdd(`${year}-${month}-${date}`)"
                />
              </span>
            </template>
            <div class="flex-col">
              <component
                :is="item.done ? 'del' : 'span'"
                v-for="item in getTodos(`${year}-${month}-${date}`).slice(1)"
                :key="item.id"
                class="py-4 hover:text-primary cursor-pointer"
                @click="handleEdit(`${year}-${month}-${date}`, item)"
              >
                {{ item.do }}
              </component>
            </div>
          </n-popover>
          <i
            v-else
            class="i-material-symbols:add mt-auto ml-auto text-gray-400"
            @click.stop="handleAdd(`${year}-${month}-${date}`)"
          />
        </div>

        <div v-else class="flex-col h-full py-12">
          <span>{{ year }}-{{ month }}-{{ date }}</span>
          <i
            class="i-material-symbols:add mt-auto ml-auto text-gray-400"
            @click.stop="handleAdd(`${year}-${month}-${date}`)"
          />
        </div>
      </template>
    </n-calendar>
  </n-card>
  <TodoEdit ref="$todoEdit" @refresh="initTodos" />
</template>

<script setup>
import TodoEdit from './todo-edit.vue'

const value = ref(Date.now())
const todos = ref({})
function initTodos() {
  // TODO 调接口获取对应用户的todo数据，如果是管理员则调用所有用户的todo数据
  todos.value = {
    '2023-10-22': [
      {
        do: '陪老婆逛街',
        done: true,
        id: 1,
      },
      {
        do: '早餐吃2个鸡蛋',
        done: true,
        id: 2,
      },
      {
        do: '早餐喝5杯牛奶',
        done: false,
        id: 3,
      },
    ],
    '2023-10-23': [
      {
        do: '吃早餐',
        done: false,
        id: 4,
      },
    ],
  }
}
initTodos()
function getTodos(date) {
  return todos.value[date] || []
}

const $todoEdit = ref(null)
function handleAdd(date) {
  $todoEdit.value?.handleOpen('add', { date })
}
function handleEdit(date, item) {
  $todoEdit.value?.handleOpen('edit', { date, ...item })
}
</script>
