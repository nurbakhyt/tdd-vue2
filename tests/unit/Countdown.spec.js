import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import moment from 'moment';
import lolex from 'lolex';
import Countdown from '@/components/Countdown.vue';

describe('Countdown', () => {
  let wrapper;
  let clock;

  beforeEach(() => {
    clock = lolex.install();

    wrapper = shallowMount(Countdown, {
      propsData: { until: moment().add(10, 'seconds') },
    });
  });

  afterEach(() => clock.uninstall());

  const see = (text, selector) => {
    const wrap = selector ? wrapper.find(selector) : wrapper;

    expect(wrap.html()).to.have.string(text);
  };

  it('renders a countdown timer', () => {
    see('0 Days');
    see('0 Hours');
    see('0 Minutes');
    see('10 Seconds');
  });

  it('reduces the countdown every second', async () => {
    see('10 Seconds');

    clock.tick(1000);

    await wrapper.vm.$nextTick();

    see('9 Seconds');
  });

  it('shows an expired message when the countdown has completed', async () => {
    clock.tick(10000);

    await wrapper.vm.$nextTick();

    see('Now expired');
  });

  it('shows a custom expired message when the countdown has completed', async () => {
    wrapper.setProps({ expiredText: 'Contest is over.' });

    clock.tick(10000);

    await wrapper.vm.$nextTick();

    see('Contest is over.');
  });

  it('broadcasts when the coundown is finished', async () => {
    clock.tick(10000);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().finished).to.be.ok;
  });

  it('clears the interval once completed', async () => {
    clock.tick(10000);

    expect(wrapper.vm.now.getSeconds()).to.equal(10);

    await wrapper.vm.$nextTick();

    clock.tick(5000);
    expect(wrapper.vm.now.getSeconds()).to.equal(10);
  });
});
