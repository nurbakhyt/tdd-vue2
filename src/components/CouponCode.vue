<template>
  <div>
    <input
      v-model="code"
      type="text"
      class="coupon-code"
      @input="validate"
    >
    <p v-text="feedback"/>
  </div>
</template>

<script>
export default {
  name: 'CouponCode',
  data() {
    return {
      code: '',
      coupons: [
        {
          code: '50OFF',
          message: '50% Off!',
          discount: 50,
        },
        {
          code: 'FREE',
          message: 'Entirely free',
          discount: 100,
        },
      ],
      valid: false,
    };
  },
  computed: {
    selectedCoupon() {
      return this.coupons.find(c => c.code === this.code);
    },
    message() {
      return this.selectedCoupon.message;
    },
    feedback() {
      if (this.valid) {
        return `Coupon Redeemed: ${this.message}`;
      }

      return 'Invalid Coupon Code';
    },
  },
  methods: {
    validate() {
      this.valid = !!this.selectedCoupon;
      // this.valid = this.coupons.map(coupon => coupon.code).includes(this.code);

      if (this.valid) {
        this.$emit('applied', this.selectedCoupon.discount);
      }
    },
  },
};
</script>

<style>

</style>
