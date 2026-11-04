/*
 * fb_tab.js —— 可复用的 Tab 选项卡组件
 * 作者：24002120314
 * 建立时间：2026-11-04
 * 使用大模型：DeepSeek-V4.1-Flash
 * 功能名称：Tab 选项卡切换（可复用组件）
 * 功能说明：为页面上任意 .fb_tab 容器提供选项卡切换能力，一个页面可存在多个实例。
 *
 * 使用方式：
 * 1. 容器加类 fb_tab；
 * 2. 选项卡按钮加类 fb_tab_item，并写 data-fb_target="对应面板的 id"；
 * 3. 面板加类 fb_tab_panel，id 与 data-fb_target 一致；
 * 4. 默认项加类 fb_active（不写则自动取第一个）。
 */

(function () {
  "use strict";

  /**
   * 功能：清除指定容器内全部选项卡的选中状态（按钮取消选中、面板统一隐藏）
   * @param {Element} fb_tabRoot 选项卡容器
   */
  function fb_clearAll(fb_tabRoot) {
    var fb_items = fb_tabRoot.querySelectorAll(".fb_tab_item");
    var fb_panels = fb_tabRoot.querySelectorAll(".fb_tab_panel");
    var fb_i;

    // 逐个清除按钮的选中状态，并同步无障碍属性
    for (fb_i = 0; fb_i < fb_items.length; fb_i++) {
      fb_items[fb_i].classList.remove("fb_active");
      fb_items[fb_i].setAttribute("aria-selected", "false");
    }

    // 逐个隐藏面板，保证切换时只显示一个
    for (fb_i = 0; fb_i < fb_panels.length; fb_i++) {
      fb_panels[fb_i].classList.remove("fb_active");
    }
  }

  /**
   * 功能：把指定按钮及其对应面板设为选中状态（应在清除全部状态之后调用）
   * @param {Element} fb_tabRoot 选项卡容器
   * @param {Element} fb_item    被选中的选项卡按钮
   */
  function fb_select(fb_tabRoot, fb_item) {
    var fb_targetId = fb_item.getAttribute("data-fb_target");
    var fb_panel = fb_tabRoot.querySelector("#" + fb_targetId);

    // 设置当前按钮为选中状态
    fb_item.classList.add("fb_active");
    fb_item.setAttribute("aria-selected", "true");

    // 显示该按钮对应的内容面板
    if (fb_panel) {
      fb_panel.classList.add("fb_active");
    }
  }

  /**
   * 功能：初始化单个选项卡容器——绑定点击监听，并按默认项设置初始选中状态
   * @param {Element} fb_tabRoot 选项卡容器
   */
  function fb_initTab(fb_tabRoot) {
    var fb_items = fb_tabRoot.querySelectorAll(".fb_tab_item");
    var fb_defaultItem;
    var fb_k;

    if (!fb_items.length) {
      return;
    }

    // 监听事件：为每个选项卡按钮绑定点击，容器内任意子元素点击同样会冒泡触发
    for (fb_k = 0; fb_k < fb_items.length; fb_k++) {
      fb_items[fb_k].addEventListener("click", function () {
        // 第一步：先清除所有选项卡的选中状态
        fb_clearAll(fb_tabRoot);
        // 第二步：再设置当前点击元素的选中状态
        fb_select(fb_tabRoot, this);
      });
    }

    // 读取默认项：优先使用带 fb_active 的按钮，没有则退化为第一个
    fb_defaultItem = fb_tabRoot.querySelector(".fb_tab_item.fb_active") || fb_items[0];

    // 先清空 HTML 上可能出现的多重选中标记，再单独设置默认项，保证初始状态唯一
    fb_clearAll(fb_tabRoot);
    fb_select(fb_tabRoot, fb_defaultItem);
  }

  /**
   * 功能：扫描页面上所有 .fb_tab 容器并逐个初始化，支持一个页面多个选项卡互不干扰
   */
  function fb_initTabs() {
    var fb_tabs = document.querySelectorAll(".fb_tab");
    var fb_n;

    for (fb_n = 0; fb_n < fb_tabs.length; fb_n++) {
      fb_initTab(fb_tabs[fb_n]);
    }
  }

  // 功能：DOM 就绪后自动初始化全部选项卡；若脚本晚于 DOM 加载则立即执行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fb_initTabs);
  } else {
    fb_initTabs();
  }

  // 暴露到全局：页面动态插入新的选项卡结构后，可手动调用 fb_initTabs() 重新初始化
  window.fb_initTabs = fb_initTabs;
})();
