export const CART_CONFIG = {
  CURRENCY: 'Rp',
  LOCALE: 'id-ID',
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1,
  MESSAGES: {
    EMPTY_CART: 'Keranjang Anda kosong.',
    CHECKOUT_SUCCESS: 'Pesanan berhasil dibuat!',
    CHECKOUT_ERROR: 'Gagal memproses pesanan.',
    ITEM_ADDED: 'Item ditambahkan ke keranjang',
    ITEM_REMOVED: 'Item dihapus dari keranjang',
    DELETE_BUTTON: 'Hapus',
    ADD_TO_CART: 'Tambah ke Keranjang',
    SOLD_OUT: 'Habis Terjual',
    BACK_TO_MENU: 'Kembali ke Menu',
    START_SHOPPING: 'Mulai Belanja',
    EMPTY_CART_BUTTON: 'Kosongkan Keranjang',
    ORDER_SUMMARY: 'Ringkasan Pesanan',
    SHOPPING_CART: 'Keranjang Belanja'
  }
};

export const formatPrice = (price, currency = CART_CONFIG.CURRENCY, locale = CART_CONFIG.LOCALE) => {
  return `${currency} ${price.toLocaleString(locale)}`;
};