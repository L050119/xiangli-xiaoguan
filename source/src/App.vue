<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, MapPin, Minus,
  Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Store, Tag, Truck,
  Utensils, UserRound, X, Zap, Flame, Leaf, CircleHelp, ClipboardList, Trash2,
} from '@lucide/vue'

const makeDish = (id, name, category, price, desc, image, tags = [], options = []) => ({
  id, name, category, price, desc, image, tags, options,
})
const imageFiles = {
  'photo-1569718212165-3a8278d5f624': 'noodles.jpg',
  'photo-1544025162-d76694265947': 'braised-meat.jpg',
  'photo-1519708227418-c8fd9a32b7a2': 'seafood.jpg',
  'photo-1547592180-85f173990554': 'soup.jpg',
  'photo-1555939594-58d7cb561ad1': 'grill.jpg',
  'photo-1540189549336-e6e99c3679fe': 'salad.jpg',
  'photo-1488477181946-6428a0291777': 'dessert.jpg',
  'photo-1556679343-c7306c1976bc': 'tea.jpg',
  'photo-1546069901-ba9599a7e63c': 'salad.jpg',
  'photo-1555126634-323283e090fa': 'noodles.jpg',
  'photo-1559847844-5315695dadae': 'seafood.jpg',
  'photo-1604908176997-125f25cc6f3d': 'braised-meat.jpg',
}
const photo = (id) => new URL(`${import.meta.env.BASE_URL}images/${imageFiles[id] ?? 'noodles.jpg'}`, document.baseURI).href
const dishPhoto = (file) => new URL(`${import.meta.env.BASE_URL}images/${file}`, document.baseURI).href

const stores = [
  {
    id: 'xiangli', name: '巷里小馆', style: '杭帮家常菜', rating: '4.9', reviews: '2,380', eta: '25–35', distance: '1.2 km', delivery: 3, minOrder: 20,
    address: '滨江区 · 星光大道', status: '营业中', accent: 'green',
    heroImage: photo('photo-1569718212165-3a8278d5f624', 1800),
    intro: '把巷子里的热乎饭，准时送到你手边。',
    dishes: [
      makeDish('hl01', '葱油拌面', '招牌热卖', 18, '手熬葱油拌开细面，香而不腻。', dishPhoto('scallion-noodles.jpg'), ['店长推荐', '微辣'], ['不辣', '微辣', '加辣']),
      makeDish('hl02', '糖醋小排', '招牌热卖', 36, '酸甜收汁，外酥里嫩，米饭搭档。', dishPhoto('sweet-sour-ribs.jpg'), ['人气必点']),
      makeDish('hl03', '龙井虾仁', '招牌热卖', 42, '鲜嫩河虾仁，带一缕龙井茶香。', dishPhoto('longjing-shrimp.jpg'), ['清爽鲜香']),
      makeDish('hl04', '笋干老鸭煲', '家常热菜', 48, '慢火煨出鲜味，笋干吸饱鸭汤。', dishPhoto('duck-bamboo-soup.jpg'), ['暖胃推荐']),
      makeDish('hl05', '梅干菜烧肉', '家常热菜', 38, '肥瘦相间，梅干菜咸香下饭。', dishPhoto('pork-rice.jpg'), ['下饭神器']),
      makeDish('hl06', '香煎小黄鱼', '家常热菜', 32, '煎至两面金黄，外脆里嫩。', dishPhoto('yellow-croaker.jpg'), ['每日鲜做']),
      makeDish('hl07', '手打虾滑汤', '汤与小食', 22, 'Q弹虾滑配时蔬，清鲜热乎。', dishPhoto('shrimp-ball-soup.jpg'), ['清淡']),
      makeDish('hl08', '桂花酒酿圆子', '甜品饮品', 16, '软糯小圆子，桂花蜜轻轻点甜。', dishPhoto('osmanthus-rice-balls.jpg'), ['饭后甜品']),
      makeDish('hl09', '桂花乌龙冷泡', '甜品饮品', 12, '轻焙乌龙与桂花，清香回甘。', dishPhoto('osmanthus-oolong.jpg'), ['0 糖清爽']),
    ],
  },
  {
    id: 'mian', name: '山野面社', style: '现煮手工面', rating: '4.8', reviews: '1,126', eta: '20–30', distance: '0.8 km', delivery: 2.5, minOrder: 18,
    address: '滨江区 · 江南大道', status: '营业中', accent: 'red',
    heroImage: photo('photo-1569718212165-3a8278d5f624', 1800),
    intro: '一碗现煮手工面，汤头每天慢熬。',
    dishes: [
      makeDish('my01', '红烧牛肉面', '招牌热卖', 28, '牛腱肉慢炖入味，汤浓面劲道。', photo('photo-1569718212165-3a8278d5f624'), ['招牌必点'], ['不辣', '微辣', '中辣']),
      makeDish('my02', '番茄牛腩面', '招牌热卖', 30, '番茄自然酸甜，牛腩软烂入味。', photo('photo-1569718212165-3a8278d5f624'), ['酸甜汤底']),
      makeDish('my03', '藤椒鸡丝拌面', '招牌热卖', 26, '藤椒鲜麻，鸡丝嫩滑不柴。', dishPhoto('scallion-noodles.jpg'), ['鲜麻'], ['不辣', '微麻', '加麻']),
      makeDish('my04', '葱香排骨面', '现炒热菜', 32, '排骨煎香后焖烧，葱香浓郁。', dishPhoto('sweet-sour-ribs.jpg')),
      makeDish('my05', '香菇青菜面', '现煮面食', 20, '鲜香菇与当季青菜，清爽不腻。', photo('photo-1547592180-85f173990554'), ['素食']),
      makeDish('my06', '炸酱拌面', '现煮面食', 22, '自炒肉酱配爽口黄瓜丝。', dishPhoto('scallion-noodles.jpg')),
      makeDish('my07', '卤蛋豆干拼盘', '汤与小食', 14, '每日现卤，入味不咸。', dishPhoto('shrimp-ball-soup.jpg')),
      makeDish('my08', '冰豆花', '甜品饮品', 12, '嫩豆花配红糖水与花生碎。', dishPhoto('osmanthus-rice-balls.jpg')),
      makeDish('my09', '酸梅汤', '甜品饮品', 8, '乌梅山楂慢煮，解腻清口。', photo('photo-1556679343-c7306c1976bc')),
    ],
  },
  {
    id: 'rice', name: '小满食堂', style: '元气简餐', rating: '4.7', reviews: '986', eta: '25–40', distance: '1.6 km', delivery: 3.5, minOrder: 22,
    address: '滨江区 · 滨盛路', status: '营业中', accent: 'yellow',
    heroImage: photo('photo-1546069901-ba9599a7e63c', 1800),
    intro: '新鲜现做的一餐，给今天添点好能量。',
    dishes: [
      makeDish('xm01', '照烧鸡腿能量碗', '招牌热卖', 32, '照烧鸡腿、牛油果与时蔬搭配。', photo('photo-1555939594-58d7cb561ad1'), ['高蛋白']),
      makeDish('xm02', '香煎三文鱼碗', '招牌热卖', 42, '香煎三文鱼配糙米与柠檬汁。', photo('photo-1546069901-ba9599a7e63c'), ['人气推荐']),
      makeDish('xm03', '黑椒牛肉饭', '招牌热卖', 36, '黑椒牛肉现炒，洋葱脆甜。', photo('photo-1544025162-d76694265947')),
      makeDish('xm04', '菌菇豆腐煲', '暖心热菜', 28, '多种菌菇与嫩豆腐，鲜香浓郁。', dishPhoto('duck-bamboo-soup.jpg'), ['素食']),
      makeDish('xm05', '脆皮鸡排饭', '暖心热菜', 30, '金黄鸡排现炸，搭配清爽小菜。', photo('photo-1555939594-58d7cb561ad1')),
      makeDish('xm06', '时蔬藜麦沙拉', '轻盈沙拉', 26, '藜麦、牛油果与每日鲜蔬。', photo('photo-1540189549336-e6e99c3679fe'), ['轻食']),
      makeDish('xm07', '南瓜浓汤', '汤与小食', 12, '南瓜与牛奶慢煮，细滑温润。', dishPhoto('duck-bamboo-soup.jpg')),
      makeDish('xm08', '酸奶水果杯', '甜品饮品', 16, '当季水果搭配浓醇酸奶。', photo('photo-1488477181946-6428a0291777'), ['新鲜水果']),
      makeDish('xm09', '柠檬气泡水', '甜品饮品', 10, '现挤柠檬与冰气泡，清新解渴。', photo('photo-1556679343-c7306c1976bc')),
    ],
  },
]

const categories = ['全部', '招牌热卖', '家常热菜', '现煮面食', '汤与小食', '甜品饮品', '轻盈沙拉']
const STORAGE_KEY = 'xiangli-ordering-demo-v1'
const activeStoreId = ref('xiangli')
const currentPage = ref('menu')
const search = ref('')
const selectedCategory = ref('全部')
const cartByStore = ref({})
const orders = ref([])
const activeModal = ref('')
const detailDish = ref(null)
const detailOption = ref('')
const checkout = ref({ name: '林同学', phone: '15800000000', address: '星光大道 · 2 号楼 1203', note: '' })
const toastMessage = ref('')
const toastVisible = ref(false)
const orderFilter = ref('全部')
const placedOrder = ref(null)
const searchField = ref(null)
const addressReturnPage = ref('checkout')
let toastTimer

const currentStore = computed(() => stores.find((store) => store.id === activeStoreId.value) ?? stores[0])
const cart = computed(() => cartByStore.value[activeStoreId.value] ?? [])
const filteredDishes = computed(() => currentStore.value.dishes.filter((dish) => {
  const categoryMatches = selectedCategory.value === '全部' || dish.category === selectedCategory.value
  const query = search.value.trim().toLowerCase()
  const searchMatches = !query || `${dish.name} ${dish.desc} ${dish.tags.join(' ')}`.toLowerCase().includes(query)
  return categoryMatches && searchMatches
}))
const itemCount = computed(() => cart.value.reduce((sum, row) => sum + row.quantity, 0))
const subtotal = computed(() => cart.value.reduce((sum, row) => sum + row.price * row.quantity, 0))
const deliveryFee = computed(() => subtotal.value > 0 ? currentStore.value.delivery : 0)
const firstOrderDiscount = computed(() => orders.value.length === 0 && subtotal.value >= 35 ? 5 : 0)
const total = computed(() => Math.max(0, subtotal.value + deliveryFee.value - firstOrderDiscount.value))
const amountLeft = computed(() => Math.max(0, currentStore.value.minOrder - subtotal.value))
const visibleOrders = computed(() => orderFilter.value === '全部' ? orders.value : orders.value.filter((order) => order.status === orderFilter.value))
const maskedPhone = computed(() => checkout.value.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2'))
const orderStatuses = ['全部', '备餐中', '配送中', '已送达']

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeStoreId: activeStoreId.value, cartByStore: cartByStore.value, orders: orders.value, checkout: checkout.value }))
}

function showToast(message) {
  toastMessage.value = message
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2400)
}

function switchStore(store) {
  activeStoreId.value = store.id
  selectedCategory.value = '全部'
  search.value = ''
  activeModal.value = ''
}

function openDish(dish) {
  detailDish.value = dish
  detailOption.value = dish.options[0] ?? ''
  activeModal.value = 'dish'
}

function itemKey(dish, option = '') {
  return `${dish.id}::${option}`
}

function addDish(dish, option = '') {
  const next = [...cart.value]
  const key = itemKey(dish, option)
  const existing = next.find((row) => row.key === key)
  if (existing) existing.quantity += 1
  else next.push({ key, dishId: dish.id, name: dish.name, option, price: dish.price, image: dish.image, quantity: 1 })
  cartByStore.value = { ...cartByStore.value, [activeStoreId.value]: next }
  persist()
  showToast(`${dish.name} 已加入餐篮`)
}

function changeQuantity(key, delta) {
  const next = cart.value.map((row) => row.key === key ? { ...row, quantity: row.quantity + delta } : row).filter((row) => row.quantity > 0)
  cartByStore.value = { ...cartByStore.value, [activeStoreId.value]: next }
  persist()
}

function clearCart() {
  cartByStore.value = { ...cartByStore.value, [activeStoreId.value]: [] }
  persist()
  showToast('餐篮已清空')
}

function beginCheckout() {
  if (!cart.value.length) return
  if (amountLeft.value > 0) {
    showToast(`还差 ¥${amountLeft.value.toFixed(0)} 起送，去菜单再选一点吧`)
    return
  }
  activeModal.value = 'checkout'
}

function placeOrder() {
  if (!checkout.value.name.trim() || !/^1\d{10}$/.test(checkout.value.phone.trim()) || !checkout.value.address.trim()) {
    showToast('请填写正确的联系人、手机号和地址')
    return
  }
  const order = {
    id: `XL${Date.now().toString().slice(-8)}`,
    storeId: currentStore.value.id,
    storeName: currentStore.value.name,
    items: cart.value.map((row) => ({ ...row })),
    subtotal: subtotal.value,
    deliveryFee: deliveryFee.value,
    discount: firstOrderDiscount.value,
    total: total.value,
    address: checkout.value.address.trim(),
    name: checkout.value.name.trim(),
    phone: checkout.value.phone.trim(),
    note: checkout.value.note.trim(),
    status: '备餐中',
    createdAt: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    eta: currentStore.value.eta,
  }
  orders.value = [order, ...orders.value]
  cartByStore.value = { ...cartByStore.value, [activeStoreId.value]: [] }
  placedOrder.value = order
  activeModal.value = 'success'
  persist()
}

function showOrders(status = '全部') {
  activeModal.value = 'orders'
  orderFilter.value = status
}

function continueShopping() {
  currentPage.value = 'menu'
  activeModal.value = ''
  placedOrder.value = null
}

function showProfile() {
  currentPage.value = 'profile'
  activeModal.value = ''
}

function editAddress(returnPage) {
  addressReturnPage.value = returnPage
  activeModal.value = 'address'
}

function returnFromAddress() {
  activeModal.value = addressReturnPage.value === 'checkout' ? 'checkout' : ''
}

function reorder(order) {
  const storeId = stores.some((store) => store.id === order.storeId) ? order.storeId : activeStoreId.value
  const next = [...(cartByStore.value[storeId] ?? [])]
  for (const row of order.items ?? []) {
    const existing = next.find((item) => item.key === row.key)
    if (existing) existing.quantity += row.quantity
    else next.push({ ...row })
  }
  cartByStore.value = { ...cartByStore.value, [storeId]: next }
  activeStoreId.value = storeId
  currentPage.value = 'menu'
  activeModal.value = ''
  persist()
  showToast('上次点的菜已加入餐篮')
}

function scrollToMenu() {
  document.querySelector('.dish-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

async function copyOrderId(id) {
  try {
    await navigator.clipboard.writeText(id)
    showToast('订单号已复制')
  } catch {
    showToast(`订单号：${id}`)
  }
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    activeModal.value = ''
    detailDish.value = null
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchField.value?.focus()
  }
}

watch(activeStoreId, () => persist())
watch(cartByStore, () => persist(), { deep: true })
watch(orders, () => persist(), { deep: true })
watch(checkout, () => persist(), { deep: true })

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (saved) {
      if (stores.some((store) => store.id === saved.activeStoreId)) activeStoreId.value = saved.activeStoreId
      cartByStore.value = saved.cartByStore ?? {}
      orders.value = saved.orders ?? []
      if (saved.checkout) checkout.value = { ...checkout.value, ...saved.checkout }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(toastTimer)
})
</script>

<template>
  <div class="app-shell" :class="{ 'with-mobile-cart': cart.length && currentPage === 'menu' }">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#top" aria-label="巷里小馆首页">
          <span class="brand-mark"><Utensils :size="19" stroke-width="2.5" /></span>
          <span class="brand-words"><strong>巷里</strong><small>LOCAL TABLE</small></span>
        </a>
        <button class="delivery-location" type="button" @click="activeModal = 'stores'">
          <MapPin :size="17" />
          <span><b>送到</b><strong>{{ currentStore.address }}</strong></span>
          <ChevronDown :size="15" />
        </button>
        <label class="global-search">
          <Search :size="18" />
          <input ref="searchField" v-model="search" type="search" placeholder="搜菜名、口味" aria-label="搜索菜品" />
          <span class="search-shortcut">Ctrl K</span>
        </label>
        <nav class="top-actions" aria-label="主导航">
          <button class="nav-item" :class="{ active: currentPage === 'menu' }" type="button" @click="continueShopping"><Utensils :size="17" /><span>点餐</span></button>
          <button class="nav-item" :class="{ active: activeModal === 'orders' }" type="button" @click="showOrders()"><ClipboardList :size="17" /><span>订单</span><i v-if="orders.length">{{ orders.length }}</i></button>
          <button class="profile-button" :class="{ active: currentPage === 'profile' }" type="button" aria-label="个人中心" @click="showProfile">{{ checkout.name.trim().slice(0, 1) || '林' }}</button>
        </nav>
      </div>
    </header>

    <main v-if="currentPage === 'menu'" id="top" class="page-wrap">
      <section class="store-hero" :style="{ '--hero-image': `url('${currentStore.heroImage}')` }">
        <div class="hero-content">
          <div class="hero-kicker"><span class="open-dot"></span> {{ currentStore.status }} <span class="kicker-divider"></span> {{ currentStore.style }}</div>
          <h1>{{ currentStore.name }}</h1>
          <p>{{ currentStore.intro }}</p>
          <div class="hero-meta">
            <span class="rating"><Sparkles :size="15" fill="currentColor" /> {{ currentStore.rating }} <small>({{ currentStore.reviews }}条评价)</small></span>
            <span><Clock3 :size="15" /> {{ currentStore.eta }} 分钟</span>
            <span><Truck :size="15" /> 配送 ¥{{ currentStore.delivery.toFixed(1) }}</span>
          </div>
          <button class="store-switch" type="button" @click="activeModal = 'stores'">附近好店 <ArrowRight :size="15" /></button>
        </div>
        <div class="hero-stamp"><span>现点</span><b>现做</b><i></i><small>热乎送到</small></div>
        <div class="hero-note"><span class="note-icon"><Leaf :size="14" /></span> 食材每日鲜采</div>
      </section>

      <section class="content-layout" aria-label="在线点餐">
        <div class="menu-column">
          <div class="menu-heading">
            <div><p class="eyebrow">FROM OUR KITCHEN</p><h2>今天吃点好的</h2></div>
            <div class="menu-count"><span>{{ currentStore.dishes.length }}</span> 道现做菜</div>
          </div>
          <div class="menu-toolbar">
            <div class="category-strip" role="tablist" aria-label="菜品分类">
              <button v-for="category in categories" :key="category" class="category-tab" :class="{ selected: selectedCategory === category }" type="button" role="tab" :aria-selected="selectedCategory === category" @click="selectedCategory = category">{{ category }}</button>
            </div>
            <button class="filter-button" type="button" @click="selectedCategory = '全部'; search = ''"><SlidersHorizontal :size="15" /> <span>重置</span></button>
          </div>

          <div v-if="filteredDishes.length" class="dish-list">
            <article v-for="(dish, index) in filteredDishes" :key="dish.id" class="dish-row" :style="{ '--row-index': index }">
              <button class="dish-photo-button" type="button" :aria-label="`查看${dish.name}详情`" @click="openDish(dish)">
                <img class="dish-photo" :src="dish.image" :alt="dish.name" />
                <span v-if="dish.tags[0]" class="photo-tag">{{ dish.tags[0] }}</span>
              </button>
              <div class="dish-copy">
                <button class="dish-name" type="button" @click="openDish(dish)">{{ dish.name }}</button>
                <p class="dish-description">{{ dish.desc }}</p>
                <div class="dish-tags"><span v-for="tag in dish.tags.slice(1)" :key="tag">{{ tag }}</span><span v-if="dish.options.length" class="custom-tag">可选口味</span></div>
                <div class="dish-price-line"><strong>¥{{ dish.price.toFixed(0) }}</strong><small>月售 {{ 160 + index * 73 }}</small></div>
              </div>
              <button class="add-button" type="button" :aria-label="`添加${dish.name}`" @click="dish.options.length ? openDish(dish) : addDish(dish)"><Plus :size="18" stroke-width="2.7" /></button>
            </article>
          </div>
          <div v-else class="empty-menu"><Search :size="24" /><strong>没找到这道菜</strong><span>换个关键词，或者看看别的分类。</span></div>

          <div class="menu-footnote"><span class="footnote-mark"><Leaf :size="16" /></span><span><strong>一餐一做，趁热到家</strong><small>所有菜品接单后制作，图片仅供参考。</small></span><ArrowRight :size="16" /></div>
        </div>

        <aside class="cart-column" aria-label="购物车">
          <div class="cart-panel">
            <div class="cart-heading"><div><span class="cart-icon"><ShoppingBag :size="17" /></span><h2>你的餐篮</h2></div><button v-if="cart.length" class="text-action" type="button" @click="clearCart"><Trash2 :size="14" />清空</button></div>
            <div class="cart-store"><span class="store-avatar"><Store :size="16" /></span><span>{{ currentStore.name }}</span><span class="cart-time"><Clock3 :size="13" /> {{ currentStore.eta }}分钟</span></div>
            <div v-if="cart.length" class="cart-items">
              <div v-for="row in cart" :key="row.key" class="cart-item">
                <img :src="row.image" :alt="row.name" />
                <div class="cart-item-copy"><strong>{{ row.name }}</strong><small v-if="row.option">{{ row.option }}</small><b>¥{{ row.price.toFixed(0) }}</b></div>
                <div class="quantity-control"><button type="button" :aria-label="`减少${row.name}`" @click="changeQuantity(row.key, -1)"><Minus :size="13" /></button><span>{{ row.quantity }}</span><button type="button" :aria-label="`增加${row.name}`" @click="changeQuantity(row.key, 1)"><Plus :size="13" /></button></div>
              </div>
            </div>
            <div v-else class="cart-empty"><div class="empty-bag"><ShoppingBag :size="24" /></div><strong>餐篮还是空的</strong><span>挑几样喜欢的，热饭很快就来。</span><button type="button" @click="scrollToMenu">去选菜 <ArrowDown :size="14" /></button></div>
            <div v-if="cart.length" class="cart-summary">
              <div class="delivery-progress" :class="{ reached: amountLeft === 0 }"><span class="progress-icon"><Truck :size="15" /></span><span>{{ amountLeft > 0 ? `再选 ¥${amountLeft.toFixed(0)} 起送` : '已达到起送金额' }}</span><Check v-if="amountLeft === 0" :size="14" /></div>
              <div class="summary-row"><span>菜品小计</span><strong>¥{{ subtotal.toFixed(2) }}</strong></div>
              <div class="summary-row"><span>配送费</span><strong>¥{{ deliveryFee.toFixed(2) }}</strong></div>
              <div v-if="firstOrderDiscount" class="summary-row discount-row"><span>新客优惠</span><strong>−¥{{ firstOrderDiscount.toFixed(2) }}</strong></div>
              <div class="summary-total"><span>合计</span><strong>¥{{ total.toFixed(2) }}</strong></div>
              <button class="checkout-button" :disabled="amountLeft > 0" type="button" @click="beginCheckout"><span>去结算</span><span>¥{{ total.toFixed(2) }} <ArrowRight :size="16" /></span></button>
              <p class="cart-assurance"><Zap :size="13" /> 在线下单 · 送达付款</p>
            </div>
            <div v-else class="cart-promo"><span><Tag :size="14" /> 新客下单立减 ¥5</span><small>满 ¥35 自动抵扣 · 本地演示券</small></div>
          </div>
          <div class="help-line"><CircleHelp :size="15" /><span>需要帮助？</span><button type="button" @click="showToast('客服在线时间：10:00–21:00')">联系小馆</button></div>
        </aside>
      </section>

      <footer class="page-footer"><span>巷里小馆 <i></i> 把寻常日子，吃得热气腾腾。</span><span>杭州 · {{ currentStore.distance }} · 营业至 21:30</span></footer>
    </main>

    <main v-else class="page-wrap profile-page">
      <section class="profile-banner">
        <div class="profile-identity">
          <span class="profile-avatar">{{ checkout.name.trim().slice(0, 1) || '林' }}</span>
          <div class="profile-user-copy">
            <span class="eyebrow">XIANGLI MEMBER</span>
            <h1>{{ checkout.name.trim() || '林同学' }}</h1>
            <p>{{ maskedPhone }} <i></i> 巷里会员</p>
          </div>
          <button class="profile-edit" type="button" @click="editAddress('profile')">个人资料 <ArrowRight :size="15" /></button>
        </div>
        <div class="member-figures">
          <button type="button" @click="showOrders()"><strong>{{ orders.length }}</strong><span>我的订单</span></button>
          <button type="button" @click="showToast('当前有 2 张可用优惠券')"><strong>2</strong><span>优惠券</span></button>
          <button type="button" @click="showToast('当前有 286 积分')"><strong>286</strong><span>会员积分</span></button>
        </div>
      </section>

      <div class="profile-content-grid">
        <section class="profile-section profile-orders">
          <div class="profile-section-heading"><h2>我的订单</h2><button type="button" @click="showOrders()">全部订单 <ArrowRight :size="14" /></button></div>
          <div class="order-shortcuts">
            <button type="button" @click="showOrders()"><span><ClipboardList :size="21" /></span><small>全部</small></button>
            <button type="button" @click="showOrders('备餐中')"><span><Clock3 :size="21" /></span><small>备餐中</small></button>
            <button type="button" @click="showOrders('配送中')"><span><Truck :size="21" /></span><small>配送中</small></button>
            <button type="button" @click="showOrders('已送达')"><span><Check :size="21" /></span><small>已送达</small></button>
          </div>
          <article v-if="orders.length" class="recent-order">
            <div class="recent-order-heading"><strong>{{ orders[0].storeName }}</strong><span>{{ orders[0].status }}</span></div>
            <p>{{ orders[0].items.map((item) => item.name).join('、') }}</p>
            <div class="recent-order-footer"><small>{{ orders[0].createdAt }} · 共 {{ orders[0].items.reduce((sum, item) => sum + item.quantity, 0) }} 件</small><strong>¥{{ orders[0].total.toFixed(2) }}</strong><button type="button" @click="reorder(orders[0])">再来一单</button></div>
          </article>
          <div v-else class="profile-empty"><span>还没有订单</span><button type="button" @click="continueShopping">去点餐 <ArrowRight :size="14" /></button></div>
        </section>

        <section class="profile-section profile-delivery">
          <div class="profile-section-heading"><h2>配送地址</h2><button type="button" @click="editAddress('profile')">编辑 <ArrowRight :size="14" /></button></div>
          <button class="saved-address" type="button" @click="editAddress('profile')">
            <span class="saved-address-icon"><MapPin :size="19" /></span>
            <span class="saved-address-copy"><strong>{{ checkout.address || '添加收货地址' }}</strong><small>{{ checkout.name || '联系人' }} · {{ maskedPhone }}</small></span>
            <ArrowRight :size="16" />
          </button>
          <div class="profile-service-links">
            <button type="button" @click="showToast('当前有 2 张可用优惠券')"><Tag :size="17" /><span>优惠券</span><strong>2 张可用</strong><ArrowRight :size="14" /></button>
            <button type="button" @click="showToast('客服在线时间：10:00–21:00')"><CircleHelp :size="17" /><span>帮助与客服</span><strong>10:00–21:00</strong><ArrowRight :size="14" /></button>
          </div>
        </section>
      </div>
      <footer class="profile-footer">巷里小馆 · 把寻常日子，吃得热气腾腾。</footer>
    </main>

    <div v-if="cart.length && currentPage === 'menu'" class="mobile-cart-bar">
      <button class="mobile-cart-count" type="button" aria-label="查看餐篮" @click="activeModal = 'mobile-cart'"><span><ShoppingBag :size="20" /></span><i>{{ itemCount }}</i></button>
      <div class="mobile-cart-total"><strong>¥{{ total.toFixed(2) }}</strong><small>{{ amountLeft > 0 ? `还差 ¥${amountLeft.toFixed(0)} 起送` : '含配送费' }}</small></div>
      <button class="mobile-checkout" type="button" :disabled="amountLeft > 0" @click="beginCheckout">{{ amountLeft > 0 ? '再选一些' : '去结算' }} <ArrowRight :size="16" /></button>
    </div>

    <nav class="mobile-tabbar" aria-label="底部导航">
      <button type="button" :class="{ active: currentPage === 'menu' && activeModal !== 'orders' }" @click="continueShopping"><Utensils :size="20" /><span>点餐</span></button>
      <button type="button" :class="{ active: activeModal === 'orders' }" @click="showOrders()"><ClipboardList :size="20" /><span>订单</span><i v-if="orders.length">{{ orders.length }}</i></button>
      <button type="button" :class="{ active: currentPage === 'profile' }" @click="showProfile"><UserRound :size="20" /><span>我的</span></button>
    </nav>

    <Transition name="toast"><div v-if="toastVisible" class="toast-message"><Check :size="16" /> {{ toastMessage }}</div></Transition>

    <Transition name="modal">
      <div v-if="activeModal" class="modal-backdrop" @click.self="activeModal = ''">
        <section v-if="activeModal === 'stores'" class="dialog store-dialog" role="dialog" aria-modal="true" aria-labelledby="stores-title">
          <div class="dialog-header"><div><span class="eyebrow">NEAR YOUR ADDRESS</span><h2 id="stores-title">附近好店</h2></div><button class="icon-close" type="button" aria-label="关闭" @click="activeModal = ''"><X :size="20" /></button></div>
          <p class="dialog-subtitle"><MapPin :size="15" /> {{ currentStore.address }} <button type="button" @click="showToast('当前为演示配送地址')">修改</button></p>
          <div class="store-list">
            <button v-for="store in stores" :key="store.id" class="store-option" :class="{ chosen: activeStoreId === store.id }" type="button" @click="switchStore(store)">
              <img :src="store.heroImage" :alt="store.name" />
              <span class="store-option-copy"><strong>{{ store.name }}<i v-if="activeStoreId === store.id"><Check :size="12" /> 正在点</i></strong><small>{{ store.style }} · {{ store.distance }}</small><span><Sparkles :size="13" fill="currentColor" /> {{ store.rating }} <em>· {{ store.eta }} 分钟</em></span></span>
              <b>¥{{ store.delivery.toFixed(1) }}<small>配送费</small></b>
            </button>
          </div>
        </section>

        <section v-else-if="activeModal === 'dish' && detailDish" class="dialog dish-dialog" role="dialog" aria-modal="true" :aria-labelledby="`detail-${detailDish.id}`">
          <button class="icon-close floating-close" type="button" aria-label="关闭" @click="activeModal = ''"><X :size="20" /></button>
          <img class="detail-image" :src="detailDish.image" :alt="detailDish.name" />
          <div class="detail-content"><div class="detail-kicker"><Flame :size="14" /> 巷里现做 <span v-for="tag in detailDish.tags" :key="tag">{{ tag }}</span></div><h2 :id="`detail-${detailDish.id}`">{{ detailDish.name }}</h2><p>{{ detailDish.desc }}</p>
            <div v-if="detailDish.options.length" class="option-group"><div><strong>口味偏好</strong><small>按你的喜好现做</small></div><div class="option-pills"><button v-for="option in detailDish.options" :key="option" type="button" :class="{ selected: detailOption === option }" @click="detailOption = option">{{ option }}<Check v-if="detailOption === option" :size="13" /></button></div></div>
            <div class="detail-add-row"><strong>¥{{ detailDish.price.toFixed(0) }}</strong><button class="checkout-button" type="button" @click="addDish(detailDish, detailOption); activeModal = ''">加入餐篮 <Plus :size="17" /></button></div>
          </div>
        </section>

        <section v-else-if="activeModal === 'checkout'" class="dialog checkout-dialog" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div class="dialog-header"><div><span class="eyebrow">ONE MORE STEP</span><h2 id="checkout-title">确认订单</h2></div><button class="icon-close" type="button" aria-label="关闭" @click="activeModal = ''"><X :size="20" /></button></div>
          <div class="delivery-card"><span class="delivery-card-icon"><MapPin :size="19" /></span><div><small>送到这里</small><strong>{{ checkout.address }}</strong><span>{{ checkout.name }} · {{ checkout.phone }}</span></div><button type="button" aria-label="修改配送信息" @click="editAddress('checkout')"><ArrowRight :size="17" /></button></div>
          <div class="checkout-order-heading"><strong>{{ currentStore.name }}</strong><span>{{ itemCount }} 件商品</span></div>
          <div class="checkout-lines"><div v-for="row in cart" :key="row.key"><span>{{ row.name }}<small v-if="row.option"> · {{ row.option }}</small> × {{ row.quantity }}</span><strong>¥{{ (row.price * row.quantity).toFixed(2) }}</strong></div></div>
          <label class="note-field"><span>给小馆留言 <small>选填</small></span><input v-model="checkout.note" maxlength="60" placeholder="例如：少油少盐，餐具不用放" /></label>
          <div class="checkout-total-line"><span>菜品 ¥{{ subtotal.toFixed(2) }} <i>+</i> 配送 ¥{{ deliveryFee.toFixed(2) }}<template v-if="firstOrderDiscount"><br />新客优惠 −¥{{ firstOrderDiscount.toFixed(2) }}</template></span><strong>实付 ¥{{ total.toFixed(2) }}</strong></div>
          <button class="place-order-button" type="button" @click="placeOrder">确认下单 <span>¥{{ total.toFixed(2) }}</span></button>
          <p class="demo-payment"><Zap :size="13" /> 演示订单，不会产生真实支付</p>
        </section>

        <section v-else-if="activeModal === 'address'" class="dialog address-dialog" role="dialog" aria-modal="true" aria-labelledby="address-title">
          <div class="dialog-header"><div><span class="eyebrow">DELIVERY DETAILS</span><h2 id="address-title">配送信息</h2></div><button class="icon-close" type="button" aria-label="关闭" @click="returnFromAddress"><X :size="20" /></button></div>
          <label class="form-field"><span>收货地址</span><input v-model="checkout.address" maxlength="80" placeholder="街道、楼栋和门牌号" /></label>
          <div class="form-row"><label class="form-field"><span>联系人</span><input v-model="checkout.name" maxlength="20" placeholder="怎么称呼你" /></label><label class="form-field"><span>手机号</span><input v-model="checkout.phone" inputmode="numeric" maxlength="11" placeholder="11 位手机号" /></label></div>
          <button class="place-order-button" type="button" @click="returnFromAddress">保存配送信息 <Check :size="17" /></button>
        </section>

        <section v-else-if="activeModal === 'success' && placedOrder" class="dialog success-dialog" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div class="success-mark"><Check :size="30" stroke-width="2.5" /></div><span class="eyebrow">ORDER RECEIVED</span><h2 id="success-title">小馆收到啦</h2><p>正在为你准备这顿热乎饭，预计 {{ placedOrder.eta }} 分钟送达。</p>
          <div class="success-order-id">订单号 <strong>{{ placedOrder.id }}</strong><button type="button" @click="copyOrderId(placedOrder.id)">复制</button></div>
          <div class="success-actions"><button class="secondary-button" type="button" @click="continueShopping">继续点餐</button><button class="checkout-button" type="button" @click="showOrders()">查看订单 <ArrowRight :size="16" /></button></div>
          <small class="demo-payment"><Zap :size="13" /> 本地演示订单，不会产生真实支付</small>
        </section>

        <section v-else-if="activeModal === 'orders'" class="dialog orders-dialog" role="dialog" aria-modal="true" aria-labelledby="orders-title">
          <div class="dialog-header"><div><span class="eyebrow">YOUR TABLE</span><h2 id="orders-title">我的订单</h2></div><button class="icon-close" type="button" aria-label="关闭" @click="activeModal = ''"><X :size="20" /></button></div>
          <div class="order-tabs" role="tablist" aria-label="订单状态"><button v-for="status in orderStatuses" :key="status" type="button" :class="{ selected: orderFilter === status }" @click="orderFilter = status">{{ status }}<i v-if="status === '备餐中' && orders.filter((order) => order.status === status).length">{{ orders.filter((order) => order.status === status).length }}</i></button></div>
          <div v-if="visibleOrders.length" class="order-list">
            <article v-for="order in visibleOrders" :key="order.id" class="order-card"><div class="order-card-top"><span><Store :size="15" /> {{ order.storeName }}</span><strong :class="`status-${order.status}`">{{ order.status }}</strong></div><div class="order-card-items"><img v-for="row in order.items.slice(0, 3)" :key="row.key" :src="row.image" :alt="row.name" /><span v-if="order.items.length > 3">+{{ order.items.length - 3 }}</span></div><div class="order-card-bottom"><small>{{ order.createdAt }} · {{ order.id }}</small><strong>¥{{ order.total.toFixed(2) }}</strong></div><div class="order-progress"><span class="progress-check"><Check :size="13" /></span><div><strong>{{ order.status === '备餐中' ? '商家正在用心制作' : order.status === '配送中' ? '骑手正在赶来' : '订单已送达' }}</strong><small>{{ order.status === '备餐中' ? `预计 ${order.eta} 分钟送达` : order.address }}</small></div><Truck :size="17" /></div></article>
          </div>
          <div v-else class="orders-empty"><span><ClipboardList :size="25" /></span><strong>还没有这类订单</strong><small>下单后可以在这里查看进度。</small><button type="button" @click="continueShopping">去点餐 <ArrowRight :size="15" /></button></div>
        </section>

        <section v-else-if="activeModal === 'mobile-cart'" class="dialog mobile-cart-dialog" role="dialog" aria-modal="true" aria-labelledby="mobile-cart-title">
          <div class="dialog-header"><div><span class="eyebrow">YOUR BASKET</span><h2 id="mobile-cart-title">你的餐篮</h2></div><button class="icon-close" type="button" aria-label="关闭" @click="activeModal = ''"><X :size="20" /></button></div>
          <div class="mobile-cart-items"><div v-for="row in cart" :key="row.key" class="cart-item"><img :src="row.image" :alt="row.name" /><div class="cart-item-copy"><strong>{{ row.name }}</strong><small v-if="row.option">{{ row.option }}</small><b>¥{{ row.price.toFixed(0) }}</b></div><div class="quantity-control"><button type="button" :aria-label="`减少${row.name}`" @click="changeQuantity(row.key, -1)"><Minus :size="13" /></button><span>{{ row.quantity }}</span><button type="button" :aria-label="`增加${row.name}`" @click="changeQuantity(row.key, 1)"><Plus :size="13" /></button></div></div></div>
          <div class="mobile-cart-footer"><div class="summary-total"><span>含配送费</span><strong>¥{{ total.toFixed(2) }}</strong></div><button class="place-order-button" type="button" :disabled="amountLeft > 0" @click="beginCheckout">{{ amountLeft > 0 ? `再选 ¥${amountLeft.toFixed(0)} 起送` : '去结算' }} <ArrowRight :size="16" /></button></div>
        </section>
      </div>
    </Transition>
  </div>
</template>
