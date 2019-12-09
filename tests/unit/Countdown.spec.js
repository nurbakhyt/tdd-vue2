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

  const assertOnNextTick = (callback, done) => {
    wrapper.vm.$nextTick(() => {
      try {
        callback();

        done();
      } catch (e) {
        done(e);
      }
    });
  };

  it('renders a countdown timer', () => {
    see('0 Days');
    see('0 Hours');
    see('0 Minutes');
    see('10 Seconds');
  });

  it('reduces the countdown every second', (done) => {
    see('10 Seconds');

    clock.tick(1000);

    assertOnNextTick(() => {
      see('9 Seconds');
    }, done);
  });

  it('shows an expired message when the countdown has completed', (done) => {
    clock.tick(10000);

    assertOnNextTick(() => {
      see('Now expired');
    }, done);
  });

  it('shows a custom expired message when the countdown has completed', (done) => {
    wrapper.setProps({ expiredText: 'Contest is over.' });

    clock.tick(10000);

    assertOnNextTick(() => {
      see('Contest is over.');
    }, done);
  });

  it('broadcasts when the coundown is finished', (done) => {
    clock.tick(10000);

    assertOnNextTick(() => {
      expect(wrapper.emitted().finished).to.be.ok;
    }, done);
  });

  it('clears the interval once completed', (done) => {
    clock.tick(10000);

    expect(wrapper.vm.now.getSeconds()).to.equal(10);

    assertOnNextTick(() => {
      clock.tick(5000);
      expect(wrapper.vm.now.getSeconds()).to.equal(10);
    }, done);
  });
});
