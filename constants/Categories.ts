export interface CategoryChild {
  name: string;
  icon: string;
}
export interface Category {
  name: string;
  color: string;
  icon: string;
  children: CategoryChild[];
}

export const categories: Category[] = [
  {
    name: '飲食', color: '#F5C16C', icon: 'utensils', children: [
      { name: '早餐', icon: 'coffee' },
      { name: '午餐', icon: 'hamburger' },
      { name: '晚餐', icon: 'drumstick' },
      { name: '點心', icon: 'pizza' },
      { name: '飲料', icon: 'cup' },
      { name: '酒類', icon: 'beer' },
      { name: '水果', icon: 'banana' },
    ]
  },
  {
    name: '交通', color: '#4A90E2', icon: 'car', children: [
      { name: '加油費', icon: 'gas-pump' },
      { name: '停車費', icon: 'parking' },
      { name: '汽車', icon: 'car' },
      { name: '計程車', icon: 'taxi' },
      { name: '公車', icon: 'bus' },
      { name: '火車', icon: 'train' },
      { name: '摩托車', icon: 'motorcycle' },
      { name: '單車', icon: 'bicycle' },
      { name: '機票', icon: 'plane' },
      { name: '船票', icon: 'ship' },
      { name: '捷運', icon: 'subway' },
      { name: '高鐵', icon: 'train' },
    ]
  },
  {
    name: '娛樂', color: '#A285D1', icon: 'microphone', children: [
      { name: '電影', icon: 'film' },
      { name: '遊樂園', icon: 'castle' },
      { name: '展覽', icon: 'university' },
      { name: '影音', icon: 'tv' },
      { name: '音樂', icon: 'music' },
      { name: '遊戲', icon: 'gamepad' },
      { name: '運動', icon: 'basketball-ball' },
      { name: '博弈', icon: 'cards' },
      { name: '消遣', icon: 'smile' },
      { name: '健身', icon: 'dumbbell' },
      { name: '夜店', icon: 'record-vinyl' },
    ]
  },
  {
    name: '購物', color: '#E57373', icon: 'shopping-cart', children: [
      { name: '市場', icon: 'store' },
      { name: '衣物', icon: 'tshirt' },
      { name: '鞋子', icon: 'shoe-prints' },
      { name: '配件', icon: 'glasses' },
      { name: '包包', icon: 'briefcase' },
      { name: '美妝保養', icon: 'lipstick' },
      { name: '精品', icon: 'gem' },
      { name: '禮物', icon: 'gift' },
      { name: '電子產品', icon: 'laptop' },
      { name: '書籍', icon: 'book' },
      { name: '應用軟體', icon: 'download' },
      { name: '賽車用品', icon: 'duck' },
    ]
  },
  {
    name: '個人', color: '#BDBDBD', icon: 'user', children: [
      { name: '社交', icon: 'handshake' },
      { name: '通話費', icon: 'mobile-alt' },
      { name: '借款', icon: 'coins' },
      { name: '投資', icon: 'chart-line' },
      { name: '稅金', icon: 'coins' },
      { name: '保險', icon: 'shield-alt' },
      { name: '捐款', icon: 'donate' },
      { name: '寵物', icon: 'dog' },
      { name: '彩券', icon: 'ticket-alt' },
      { name: '手續費', icon: 'dollar-sign' },
    ]
  },
  {
    name: '醫療', color: '#F44336', icon: 'hospital', children: [
      { name: '門診', icon: 'stethoscope' },
      { name: '牙齒保健', icon: 'tooth' },
      { name: '藥品', icon: 'capsules' },
      { name: '醫療用品', icon: 'band-aid' },
      { name: '打針', icon: 'syringe' },
      { name: '住院', icon: 'procedures' },
      { name: '手術', icon: 'scalpel' },
      { name: '健康檢查', icon: 'x-ray' },
    ]
  },
  {
    name: '家居', color: '#607D8B', icon: 'home', children: [
      { name: '日常用品', icon: 'spray-can' },
      { name: '水費', icon: 'tint' },
      { name: '電費', icon: 'bolt' },
      { name: '燃料費', icon: 'gas-pump' },
      { name: '電話費', icon: 'phone' },
      { name: '網路費', icon: 'globe' },
      { name: '房租', icon: 'money-bill' },
      { name: '洗衣費', icon: 'tshirt' },
      { name: '修繕費', icon: 'tools' },
      { name: '家具', icon: 'couch' },
      { name: '訂閱', icon: 'newspaper' },
      { name: '家電', icon: 'tv' },
      { name: '家用', icon: 'duck' },
      { name: '房貸', icon: 'money-check' },
      { name: '裝潢', icon: 'building' },
    ]
  },
  {
    name: '家庭', color: '#E1BEE7', icon: 'child', children: [
      { name: '生活費', icon: 'baby-bottle' },
      { name: '教育', icon: 'graduation-cap' },
      { name: '看護', icon: 'user-nurse' },
      { name: '玩具', icon: 'puzzle-piece' },
      { name: '才藝', icon: 'palette' },
      { name: '孝親', icon: 'users' },
    ]
  },
  {
    name: '生活', color: '#8BC34A', icon: 'spa', children: [
      { name: '美容美髮', icon: 'spa' },
      { name: '泡湯', icon: 'hot-tub' },
      { name: '按摩', icon: 'spa' },
      { name: '住宿', icon: 'hotel' },
      { name: '旅行', icon: 'umbrella-beach' },
      { name: '派對', icon: 'glass-cheers' },
      { name: '剪頭髮', icon: 'cut' },
    ]
  },
  {
    name: '學習', color: '#FFC107', icon: 'book-open', children: [
      { name: '課程', icon: 'chalkboard-teacher' },
      { name: '教材', icon: 'book' },
      { name: '證書', icon: 'id-badge' },
      { name: '探索', icon: 'search' },
      { name: '文具', icon: 'pencil-alt' },
    ]
  },
  {
    name: '其他', color: '#A285D1', icon: 'ellipsis-h', children: [
      { name: '其他', icon: 'ellipsis-h' },
      { name: '代墊', icon: 'exchange-alt' },
      { name: '出帳', icon: 'upload' },
    ]
  },
]; 