import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import CouponCode from '@/components/CouponCode.vue';

describe('CouponCode', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CouponCode);

    wrapper.setData({
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
    });
  });

  function enterCouponCode(code) {
    const couponCode = wrapper.find('.coupon-code');

    couponCode.element.value = code;
    couponCode.trigger('input');
  }

  it('it accepts a coupon code', () => {
    expect(wrapper.contains('input.coupon-code')).to.equal(true);
  });

  it('validates a real user-provided coupon code', () => {
    enterCouponCode('50OFF');

    expect(wrapper.html()).to.have.string('Coupon Redeemed: 50% Off!');
  });

  it('validates a fake user-provided coupon code', () => {
    enterCouponCode('NOTREAL');

    expect(wrapper.html()).to.have.string('Invalid Coupon Code');
  });

  it('broadcasts the percentage discount when a valid coupon code is applied', () => {
    enterCouponCode('50OFF');

    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.emitted().applied).to.be.ok;
    expect(wrapper.emitted().applied[0]).to.have.members([50]);
  });
});
