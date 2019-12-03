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

  it('increments the count when the button is clicked', () => {
    expect(wrapper.vm.count).to.equal(0);

    wrapper.find('button').trigger('click');

    expect(wrapper.vm.count).to.equal(1);
  });

  it('presents the current count', () => {
    expect(wrapper.find('.count').html()).contains(0);

    wrapper.find('button').trigger('click');

    expect(wrapper.find('.count').html()).contains(1);
  });
});
