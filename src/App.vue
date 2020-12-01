<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:05:10
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 13:56:14
-->
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive"/>
  </div>
</template>

