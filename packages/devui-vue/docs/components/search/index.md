# Search 搜索框

搜索框。

#### 何时使用

当用户需要在数据集中搜索所需数据时，输入所需数据的内容（或部分内容），返回所有匹配内容的搜索结果。

### 基本用法

:::demo 使用`sm`，`''`，`lg`来定义`Search`基本类型

```vue
<template>
  <div>
    Small
    <d-search size="sm" auto-focus style="width: 200px" @search="onSearch"></d-search>
    Middle
    <d-search style="width: 200px" is-keyup-search :delay="1000" @search="onSearch"></d-search>
    Large
    <d-search size="lg" style="width: 200px" @search="onSearch"></d-search>
    Disabled
    <d-search disabled style="width: 200px" @search="onSearch"></d-search>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      onSearch: (val) => {
        console.log(val);
      },
    };
  },
});
</script>
```

:::

### 搜索图标左置

:::demo 使用`left`，`right`来定义`Search`搜索图标位置， 默认`right`

```vue
<template>
  <div>
    <d-search icon-position="left" style="width: 200px" placeholder="请输入"></d-search>
  </div>
</template>
```

:::

### 无边框

:::demo 使用`no-border`来定义`Search`无边框

```vue
<template>
  <div>
    <d-search icon-position="left" no-border style="width: 200px"></d-search>
  </div>
</template>
```

:::

### 双向绑定

:::demo 使用`v-model`双向绑定

```vue
<template>
  <d-search css-class="ipt" v-model="searchText" :max-length="5" style="width: 200px"></d-search>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const searchText = ref('Devui');
    return {
      searchText,
    };
  },
});
</script>
```

:::

### d-search 参数

| 参数            | 类型             | 默认    | 说明                                           | 跳转 Demo                     | 全局配置项 |
| --------------- | :--------------- | ------- | ---------------------------------------------- | ----------------------------- | ---------- |
| size            | `'sm'\|''\|'lg'` | ''      | 可选，搜索框尺寸，有三种选择 lg、''、sm        | [基本用法](#基本用法)         |            |
| placeholder     | `string`         | --      | 可选，输入框 placeholder                       | [搜索图标左置](#搜索图标左置) |            |
| max-length      | `number`         | --      | 可选，输入框的 max-length                      | [双向绑定](#双向绑定)         |            |
| delay           | `number`         | 300     | 可选，debounceTime 的延迟                      | [基本用法](#基本用法)         |            |
| disabled        | `boolean`        | false   | 可选，输入框是否被禁用                         | [基本用法](#基本用法)         |            |
| auto-focus      | `boolean`        | false   | 可选，输入框是否自动对焦                       | [基本用法](#基本用法)         |            |
| is-keyup-search | `boolean`        | false   | 可选，是否支持输入值立即触发 `search`          | [基本用法](#基本用法)         |            |
| icon-position   | `string`         | 'right' | 可选，搜索图标位置，有两种选择'left' / 'right' | [搜索图标左置](#搜索图标左置) |            |
| no-border       | `boolean`        | false   | 可选，是否显示边框                             | [无边框](#无边框)             |            |
| css-class       | `string`         | ''      | 可选，支持传入类名到输入框上                   | [双向绑定](#双向绑定)         |            |

### d-search 事件

| 事件   | 类型     | 说明                                                 | 跳转 Demo             |
| ------ | -------- | ---------------------------------------------------- | --------------------- |
| search | `string` | 回车或点击搜索按钮触发的回调函数，返回文本框输入的值 | [基本用法](#基本用法) |
