import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  it('defaults to a count of 0', () => {
    expect(wrapper.vm.count).to.equal(0);
  });

  it('increments the count when the increment button is clicked', () => {
    expect(wrapper.vm.count).to.equal(0);

    wrapper.find('.increment').trigger('click');

    expect(wrapper.vm.count).to.equal(1);
  });

  it('decrements the count when the decrement button is clicked', () => {
    wrapper.setData({
      count: 5,
    });

    wrapper.find('.decrement').trigger('click');

    expect(wrapper.vm.count).to.equal(4);
  });

  it('never goes below 0', () => {
    expect(wrapper.vm.count).to.equal(0);

    expect(wrapper.find('.decrement').isVisible()).to.equal(false);

    wrapper.setData({ count: 1 });

    expect(wrapper.find('.decrement').isVisible()).to.equal(true);
  });

  it('presents the current count', () => {
    expect(wrapper.find('.count').html()).contains(0);

    wrapper.find('button').trigger('click');

    expect(wrapper.find('.count').html()).contains(1);
  });
});
